import html from './sticky-notes.html';
import css from './sticky-notes.pcss';

export default class StickyNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._noteContainer = this.shadowRoot.querySelector('.sticky-notes');
  }

  static get observedAttributes() {
    return ['amount', 'image'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'amount') {
      this._render();
    }
  }

  get amount() {
    return Number(this.getAttribute('amount'));
  }

  set amount(newVal) {
    this.setAttribute('amount', Number(newVal));
  }

  get image() {
    return this.getAttribute('image');
  }

  set image(newVal) {
    if (newVal) {
      this.setAttribute('image', newVal);
    } else {
      this.removeAttribute('image');
    }
  }

  _render() {
    this._noteContainer.innerHTML = '';
    this._notes = Array(this.amount).fill(0).map(() => {
      return this._noteContainer.appendChild(this._createNote())
    });
  }

  _createNote() {
    const note = document.createElement('div');
    note.classList.add('sticky-note');
    return note;
  }

  connectedCallback() {
    this._observer = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        this._checkAlignment();
      });
    });
    this._observer.observe(this._noteContainer);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _checkAlignment() {
    const topAlignment = this._notes.filter((note) => {
      const offsetMatch = note.offsetTop === this._notes[0].offsetTop;
      const visible = note.classList.contains('hidden');
      return offsetMatch;
    }).length;
    if (!this._topAlignment || this._topAlignment !== topAlignment) {
      this._topAlignment = topAlignment;
      this._placeImages();
    }
  }

  _placeImages() {
    const colAmount = this._topAlignment;

    const rowAmount = Math.ceil(this.amount / colAmount);
    const noteHeight = this._notes[0].offsetHeight;
    const noteWidth = this._notes[0].offsetHeight;
    const threshold = Math.ceil(colAmount / rowAmount * colAmount * noteWidth / noteHeight) * noteHeight;
    console.log(threshold);

    const xPercent = 100 / (colAmount - 1);

    const singleCol = colAmount === 1;

    this._notes.forEach((note, i) => {
      const x = i % colAmount;
      const y = Math.floor(i / colAmount);
      const yOffset = y * noteHeight;
      
      if (yOffset > threshold || (singleCol && i > 0)) {
        note.classList.add('hidden');
        note.style.setProperty('background-image', 'none');
      } else {
        note.classList.remove('hidden');
        note.style.setProperty('background-image', `url(${this.image})`);
        note.style.setProperty('background-position', `${x * xPercent}% -${yOffset}px`);
        note.style.setProperty('background-size', `${colAmount * 100}%`);
      }
    });
  }
}

window.customElements.define('sticky-notes', StickyNotes);