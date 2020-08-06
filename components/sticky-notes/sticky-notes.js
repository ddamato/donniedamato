import html from './sticky-notes.html';
import css from './sticky-notes.pcss';

export default class StickyNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._noteContainer = this.shadowRoot.querySelector('.sticky-notes');
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this._noteContainer.innerHTML = '';
    this._notes = Array(8).fill(0).map(() => {
      return this._noteContainer.appendChild(this._createNote())
    });
    window.setTimeout(() => {this._placeImages()}, 0);
  }

  _createNote() {
    const note = document.createElement('div');
    note.classList.add('sticky-note');
    const tiltMax = 5;
    const tiltMin = -5;
    const tilt = Math.floor(Math.random() * (tiltMax - tiltMin + 1) + tiltMin);
    note.style.setProperty('--rotatez', tilt + 'deg');
    return note;
  }

  _placeImages() {
    const colAmount = Math.floor(this._noteContainer.offsetWidth / this._notes[0].offsetWidth);
    const rowAmount = Math.ceil(this._notes.length / colAmount);
    
    const xPercent = 100 / colAmount;
    const yPercent = 100 / rowAmount;

    this._notes.forEach((note, i) => {
      const x = i % colAmount;
      const y = Math.floor(i / colAmount);

      const t = y * yPercent;
      const b = 100 - (t + yPercent);
      const l = x * xPercent;
      const r = 100 - (l + xPercent);
      note.style.setProperty('--origin-left', l + '%');
      note.style.setProperty('--origin-top', t + '%');
      note.style.setProperty('--origin-right', r + '%');
      note.style.setProperty('--origin-bottom', b + '%');
      note.style.setProperty('--origin-width', xPercent + '%');
      note.style.setProperty('--origin-height', yPercent + '%');
      note.style.setProperty('--origin-z', rowAmount - y);
    });
  }
}

window.customElements.define('sticky-notes', StickyNotes);