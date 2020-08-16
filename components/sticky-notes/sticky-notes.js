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
    this._slot.addEventListener('slotchange', () => {
      this._template.content.innerHTML = this._slot.assignedNodes()[0].outerHTML;
      window.setTimeout(() => this._createNotes(8));
    });
    this._initObserver();
  }

  _initObserver() {
    this._observer = new IntersectionObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!entries && !entries.length) return;
        entries.every(({ isIntersecting }) => !isIntersecting) && this._reset();
      })
    }, { threshold: 0 });
    this._observer.observe(this._noteContainer);
  }

  _reset() {
    this._setTilts();
    this._notes.forEach((note) => {
      this._moveTo(note, 0, 0);
      note.classList.remove('hidden');
    });
  }

  _createNotes(amount) {
    this._noteContainer.innerHTML = '';
    this._notes = Array(amount).fill(0).map(this._createNote, this);
    window.setTimeout(() => {
      this._variableAssign();
      this._setTilts();
    }, 0);
  }

  _createNote() {
    const li = document.createElement('li');
    li.classList.add('shadow-note');
    const note = document.createElement('div');
    note.classList.add('sticky-note');
    const overflow = document.createElement('div');
    overflow.classList.add('overflow');
    overflow.innerHTML = this._template.content.innerHTML;
    li.appendChild(note);
    note.appendChild(overflow);
    this._noteContainer.appendChild(li);

    li.addEventListener('mousedown', (ev) => this._onMousedown(ev));
    li.addEventListener('animationend', (ev) => {
      if (ev.animationName === 'drop') {
        li.classList.add('hidden');
        li.classList.remove('dropped');
      }
    });
    return li;
  }

  _onMousedown(ev) {
    this._grabbed = ev.target;
    this._grabbed.classList.add('grabbed');
    this._mousemove = this._onMousemove.bind(this);
    this._mouseup = this._onMouseup.bind(this);
    this._cursor = { x: ev.pageX, y: ev.pageY };

    document.documentElement.addEventListener('mousemove', this._mousemove);
    document.documentElement.addEventListener('mouseup', this._mouseup);
  }

  _moveTo(target, x, y) {
    this._setCssProperties(target, {
      offsetLeftPixels: x,
      offsetTopPixels: y,
    });
  }

  _onMousemove(ev) {
    this._moveTo(this._grabbed, ev.pageX - this._cursor.x, ev.pageY - this._cursor.y);
  }

  _onMouseup() {
    this._grabbed.classList.remove('grabbed');
    this._grabbed.classList.add('dropped');
    document.documentElement.removeEventListener('mousemove', this._mousemove);
    document.documentElement.removeEventListener('mouseup', this._mouseup);
    this._mousemove = null;
    this._mouseup = null;
  }

  _setCssProperties(target, properties) {
    Object.entries(properties).forEach(([prop, val]) => {

      let value = val;
      if (prop.endsWith('Percent')) {
        value += '%';
      }

      if (prop.endsWith('Pixels')) {
        value += 'px';
      }
      
      target.style.setProperty(`--${prop}`, value);
    });
  }

  _setTilts() {
    const tiltMax = 5;
    const tiltMin = -5;
    this._notes.forEach((note) => {
      const tilt = Math.floor(Math.random() * (tiltMax - tiltMin + 1) + tiltMin);
      this._setCssProperties(note, { tiltRotation: tilt + 'deg' });
    });
  }

  _variableAssign() {
    this._notes.forEach((note, index) => {
      const parent = note.parentNode;
      const siblings = parent.children;
      const colAmount = Math.floor(parent.offsetWidth / (note.offsetWidth - 1));
      const rowAmount = Math.ceil(siblings.length / colAmount);
      const colPosition = index % colAmount;
      const rowPosition = Math.floor(index / colAmount);

      if (rowAmount === 0) return;

      const widthPercent = 100 / colAmount;
      const heightPercent = 100 / rowAmount;

      const topPercent = rowPosition * -heightPercent;
      const leftPercent = colPosition * -widthPercent;
      const zIndex = rowAmount - rowPosition;

      this._setCssProperties(note, {
        topPercent,
        leftPercent,
        widthPercent,
        heightPercent,
        colPosition,
        rowPosition,
        zIndex,
      });
    });
  }
}

const stickyContent = window.customElements.whenDefined('sticky-content');
Promise.all([stickyContent]).then(() => {
  window.customElements.define('sticky-notes', StickyNotes);
});
