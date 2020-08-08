import html from './sticky-note.html';
import css from './sticky-note.pcss';

export default class StickyNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._note = this.shadowRoot.querySelector('.sticky-note');
    this._setTilt();
  }

  reflow() {
    const parent = this.parentNode;
    const siblings = parent.children;
    const index = [...siblings].indexOf(this);

    const colAmount = Math.floor(parent.offsetWidth / this.offsetWidth);
    const rowAmount = Math.ceil(siblings.length / colAmount);
    const col = colAmount % index;
    const row = Math.floor(index / colAmount);

    const widthPercent = 100 / colAmount;
    const heightPercent = 100 / rowAmount;
    const overflowWidthPercent = 100 * colAmount;
    const overflowHeightPercent = 100 * rowAmount;

    const topPercent = row * heightPercent;
    const bottomPercent = 100 - (topPercent + heightPercent);
    const leftPercent = col * widthPercent;
    const rightPercent = 100 - (leftPercent + widthPercent);
    const zIndex = rowAmount - row;

    this._setCssProperties({
      topPercent,
      leftPercent,
      bottomPercent,
      rightPercent,
      widthPercent,
      heightPercent,
      overflowWidthPercent,
      overflowHeightPercent,
      zIndex,
    });
  }

  stick(retilt) {
    this._move(0, 0);
    this.addEventListener('animationend', this._onStickEnd);
    if (retilt) {
      this._setTilt();
    }
    this.show();
    this.classList.add('stick');
  }

  drop(hide) {
    this.addEventListener('animationend', this._onDropEnd);
    this.classList.add('dropped');
    this._endHide = hide;
  }

  hide() {
    this.setAttribute('hidden', '');
  }

  show() {
    this.removeAttribute('hidden');
  }

  _setTilt() {
    const tiltMax = 5;
    const tiltMin = -5;
    const tilt = Math.floor(Math.random() * (tiltMax - tiltMin + 1) + tiltMin);
    this._setCssProperties({ tiltRotation: tilt + 'deg' });
  }

  _move(x, y) {
    if (!this._position) {
      this._position = { x: 0, y: 0 };
    }
    this._position.x = x;
    this._position.y = y;
    this._setCssProperties({
      offsetLeftPixels: this._position.x,
      offsetTopPixels: this._position.y,
    });
  }

  _onDropEnd(ev) {
    if (ev.animationName === 'drop') {
      this.dispatchEvent(new CustomEvent('dropped'));
      this.removeEventListener('animationend', this._onDropEnd);
      this.classList.remove('dropped');
      if (this._endHide) {
        this.hide();
        this._endHide = null;
      }
    }
  }

  _onMousedown(ev) {
    this.classList.add('grabbed');
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
    this.classList.remove('grabbed');
    document.documentElement.removeEventListener('mousemove', this._mousemove);
    document.documentElement.removeEventListener('mouseup', this._mouseup);
    this.dispatchEvent(new CustomEvent('release'));
  }

  _onStickEnd(ev) {
    if (ev.animationName === 'stick') {
      this.dispatchEvent(new CustomEvent('stick'));
      this.removeEventListener('animationend', this._onDropEnd);
      this.classList.remove('stick');
    }
  }

  _setCssProperties(properties) {
    Object.entries(properties).forEach(([prop, val]) => {

      let value = val;
      if (prop.endsWith('Percent')) {
        value += '%';
      }

      if (prop.endsWith('Pixels')) {
        value += 'px';
      }
      
      this.style.setProperty(`--${prop}`, value);
    });
  }
}

window.customElements.define('sticky-note', StickyNote);