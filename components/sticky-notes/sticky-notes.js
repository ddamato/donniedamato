import html from './sticky-notes.html';
import css from './sticky-notes.pcss';

export default class StickyNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._noteContainer = this.shadowRoot.querySelector('.sticky-notes');
    this._template = document.createElement('template');
    this._slot = this.shadowRoot.querySelector('slot:not([name])');
  }

  connectedCallback() {
    this._createNotes(8);
    this._slot.addEventListener('slotchange', () => {
      this._template.content.innerHTML = this._slot.assignedNodes()[0].outerHTML;
      window.setTimeout(() => this._contentAppend());
    });
    this._initObserver();
  }

  _initObserver() {
    this._observer = new IntersectionObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!entries && !entries.length) return;
        entries.every(({ isIntersecting }) => !isIntersecting) && this._notes.forEach((note) => note.stick(true));
      })
    }, { threshold: 0 });
    this._observer.observe(this._noteContainer);
  }

  _createNotes(amount) {
    this._noteContainer.innerHTML = '';
    this._notes = Array(amount).fill(0).map(() => {
      const note = document.createElement('sticky-note');
      note.classList.add('sticky-note');
      this._noteContainer.appendChild(note);
      note.addEventListener('release', () => note.drop());
      // note.addEventListener('dropped', () => note.stick(true));
      note.stick();
      return note;
    });
    window.setTimeout(() => this._reflow(), 0);
  }

  _contentAppend() {
    if (this._template.content.innerHTML && this._notes) {
      this._notes.forEach((note) => { 
        note.innerHTML = this._template.content.innerHTML;
      });
    } else {
      console.error(this._template.content.innerHTML, this._notes);
    }
  }

  _reflow() {
    this._notes.forEach((note) => note.reflow());
    this._contentAppend();
  }
}

const stickyNote = window.customElements.whenDefined('sticky-note');
const stickyContent = window.customElements.whenDefined('sticky-content');
Promise.all([stickyNote, stickyContent]).then(() => {
  window.customElements.define('sticky-notes', StickyNotes);
});
