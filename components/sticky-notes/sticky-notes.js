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
    note.addEventListener('mousedown', (ev) => this._onMousedown(ev));
    note.addEventListener('animationend', (ev) => this._onDropEnd(ev));
    note.addEventListener('transitionend', (ev) => this._onStickEnd(ev));
    return note;
  }

  _onDropEnd(ev) {
    if (ev.animationName === 'drop') {
      ev.target.classList.remove('dropped');
      ev.target.classList.add('stick');
      this._move(0, 0);
      this._target = null;
    }
  }

  _onStickEnd(ev) {
    if (ev.target.classList.contains('stick')) {
      ev.target.classList.remove('stick');
    }
    this.removeAttribute('disabled');
  }

  _onMousedown(ev) {
    this._target = ev.target;
    this._target.classList.add('grabbed');
    this._mousemove = this._onMousemove.bind(this);
    this._mouseup = this._onMouseup.bind(this);
    this._cursor = { x: ev.pageX, y: ev.pageY };
    this._move(0, 0);
    document.documentElement.addEventListener('mousemove', this._mousemove);
    document.documentElement.addEventListener('mouseup', this._mouseup);
  }

  _onMousemove(ev) {
    this._move(ev.pageX - this._cursor.x, ev.pageY - this._cursor.y);
  }

  _onMouseup() {
    this._target.classList.remove('grabbed');
    this._target.classList.add('dropped');
    this.setAttribute('disabled', '');
    document.documentElement.removeEventListener('mousemove', this._mousemove);
    document.documentElement.removeEventListener('mouseup', this._mouseup);
  }

  _move(x, y) {
    if (!this._position) {
      this._position = { x: 0, y: 0};
    }
    this._position.x = x;
    this._position.y = y;
    if (this._target) {
      this._target.style.setProperty('--offset-left', `${this._position.x}px`);
      this._target.style.setProperty('--offset-top', `${this._position.y}px`);
    }
  }

  _placeImages() {
    const colAmount = Math.floor(this._noteContainer.offsetWidth / this._notes[0].offsetWidth);
    const rowAmount = Math.ceil(this._notes.length / colAmount);
    
    const xPercent = 100 / colAmount;
    const yPercent = 100 / rowAmount;

    this._notes.forEach((note, i) => {
      const x = i % colAmount;
      const y = Math.floor(i / colAmount);
      const randSeconds = Math.random() * 3;
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
      note.style.setProperty('--origin-delay', randSeconds + 's');
    });
  }
}

window.customElements.define('sticky-notes', StickyNotes);