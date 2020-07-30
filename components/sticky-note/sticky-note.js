import html from './sticky-note.html';
import css from './sticky-note.pcss';

export default class StickyNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._originalNote = this.shadowRoot.querySelector('.note');
    this._clickThresholdMs = 300;
    this.addEventListener('mousedown', (ev) => this._onMousedown(ev));
  }

  connectedCallback() {
    if (!this.style.getPropertyValue('--rotatez')) {
      const randomRotation = (max, min) => Math.random() * (max - min) + min;
      this.style.setProperty('--rotatez', `${randomRotation(-10, 10)}deg`);
    }
  }

  _onMousedown(ev) {
    ev.preventDefault();

    if (!this._dropzone) {
      this._dropzone = document.querySelector('drop-note');
    }

    this._timeout = window.setTimeout(() => {
      this._createClone(ev);

      this._mousemove = this._onMousemove.bind(this);
      document.documentElement.addEventListener('mousemove', this._mousemove);
    }, this._clickThresholdMs);

    this._mouseup = this._onMouseup.bind(this);
    document.documentElement.addEventListener('mouseup', this._mouseup);
  }

  _onMousemove(ev) {
    if (this._cloneNote) {
      const deltaX = ev.pageX - this._cloneNote.cursorX;
      const deltaY = ev.pageY - this._cloneNote.cursorY;
      
      this._moveClone(this._cloneNote.elemX + deltaX, this._cloneNote.elemY + deltaY);
    }
  }

  _createClone(ev) {
    const elem = this.cloneNode(true);
    const boundingClientRect = this.getBoundingClientRect();
    const style = window.getComputedStyle(this);
    ['--backgroundColor', '--foregroundColor', '--rotatez', 'height', 'width'].forEach((prop) => {
      elem.style.setProperty(prop, style.getPropertyValue(prop));
    });

    this._cloneNote = {
      elem,
      elemX: boundingClientRect.left,
      elemY: boundingClientRect.top,
      cursorX: ev.pageX,
      cursorY: ev.pageY,
    };

    this._moveClone(this._cloneNote.elemX, this._cloneNote.elemY);

    if (this._dropzone) {
      this._dropzone.add(this._cloneNote.elem);
    }
  }

  _moveClone(x, y) {
    if (this._cloneNote) {
      this._cloneNote.elem.style.setProperty('--note-left', `${x}px`);
      this._cloneNote.elem.style.setProperty('--note-top', `${y}px`);
    }
  }

  _onMouseup() {
    clearTimeout(this._timeout);
    if (!this._cloneNote) {
      this.dispatchEvent(new CustomEvent('click'));
    } else {
      this._cloneNote.elem.classList.add('drop');
      this._cloneNote = null;
    }

    if (this._mousemove) {
      document.documentElement.removeEventListener('mousemove', this._mousemove);
    }
    document.documentElement.removeEventListener('mouseup', this._mouseup);
  }
}

window.customElements.define('sticky-note', StickyNote);