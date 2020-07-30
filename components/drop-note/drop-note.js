import css from './drop-note.pcss';

export default class DropNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>`;
  }

  add(note) {
    this.shadowRoot.appendChild(note);
    note.classList.add('hidden');
    note.addEventListener('animationend', () => {
      note.remove();
      this.remove();
    });
    setTimeout(() => note.classList.remove('hidden'), 0);
  }

  _createClone(target) {
    const elem = target.cloneNode(true);
    const rect = target.getBoundingClientRect();
    const style = window.getComputedStyle(target);
    ['--backgroundColor', '--foregroundColor', '--rotatez', 'height', 'width'].forEach((prop) => {
      elem.style.setProperty(prop, style.getPropertyValue(prop));
    });

    this._cloneNote = {
      elem,
      elemX: rect.left,
      elemY: rect.top,
      cursorX: ev.pageX,
      cursorY: ev.pageY,
    };

    this._moveClone(this._cloneNote.elemX, this._cloneNote.elemY);
    this.add(this._cloneNote.elem);
  }

  _onMousemove(ev) {
    if (this._cloneNote) {
      const deltaX = ev.pageX - this._cloneNote.cursorX;
      const deltaY = ev.pageY - this._cloneNote.cursorY;
      this._moveClone(this._cloneNote.elemX + deltaX, this._cloneNote.elemY + deltaY);
    }
  }

  _moveClone(x, y) {
    if (this._cloneNote) {
      this._cloneNote.elem.style.setProperty('--note-left', `${x}px`);
      this._cloneNote.elem.style.setProperty('--note-top', `${y}px`);
    }
  }

  _onMousedown(ev) {
    ev.preventDefault();
    this._createClone(ev);
    this._mousemove = this._onMousemove.bind(this);
    document.documentElement.addEventListener('mousemove', this._mousemove);
    this._mouseup = this._onMouseup.bind(this);
    document.documentElement.addEventListener('mouseup', this._mouseup);
  }

  _onMouseup() {
    if (this._cloneNote) {
      this._cloneNote.elem.classList.add('drop');
      this._cloneNote = null;
    }

    if (this._mousemove) {
      document.documentElement.removeEventListener('mousemove', this._mousemove);
    }
    document.documentElement.removeEventListener('mouseup', this._mouseup);
  }

  remove() {
    const clones = this.shadowRoot.querySelectorAll('sticky-note');
    [...clones].forEach((clone) => clone.remove());
  }
}

window.customElements.define('drop-note', DropNote);