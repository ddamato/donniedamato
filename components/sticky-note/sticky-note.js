import html from './sticky-note.html';
import css from './sticky-note.pcss';

export default class StickyNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._position = {};
    this._move = { x: 0, y: 0 };
    this._note = this.shadowRoot.querySelector('.sticky-note');
    this.addEventListener('mousedown', this._onMousedown);
  }

  connectedCallback() {
    this._setTilt();
    this._setDelay();
  }

  reflow() {
    const parent = this.parentNode;
    const siblings = parent.children;
    const index = [...siblings].indexOf(this);

    const colAmount = Math.floor(parent.offsetWidth / (this.offsetWidth - 1));
    const rowAmount = Math.ceil(siblings.length / colAmount);
    const colPosition = index % colAmount;
    const rowPosition = Math.floor(index / colAmount);

    if (rowAmount === 0) return;

    const widthPercent = 100 / colAmount;
    const heightPercent = 100 / rowAmount;
    const overflowWidthPercent = 100 * colAmount;
    const overflowHeightPercent = 100 * rowAmount;

    const topPercent = rowPosition * heightPercent;
    const bottomPercent = 100 - (topPercent + heightPercent);
    const leftPercent = colPosition * widthPercent;
    const rightPercent = 100 - (leftPercent + widthPercent);
    const zIndex = rowAmount - rowPosition;

    this._setCssProperties({
      topPercent,
      leftPercent,
      bottomPercent,
      rightPercent,
      widthPercent,
      heightPercent,
      overflowWidthPercent,
      overflowHeightPercent,
      colPosition,
      rowPosition,
      zIndex,
    });
  }

  stick(retilt) {
    this._moveTo(0, 0);
    this.addEventListener('animationend', this._onStickEnd);
    if (retilt) {
      this._setTilt();
    }
    this.classList.add('stick');
  }

  drop() {
    this.addEventListener('animationend', this._onDropEnd);
    this.classList.add('dropped');
  }

  _setTilt() {
    const tiltMax = 5;
    const tiltMin = -5;
    const tilt = Math.floor(Math.random() * (tiltMax - tiltMin + 1) + tiltMin);
    this._setCssProperties({ tiltRotation: tilt + 'deg' });
  }

  _setDelay() {
    const delaySeconds = (Math.random() * 3).toFixed(2) + 's';
    this._setCssProperties({ delaySeconds });
  }

  _moveTo(x, y) {
    this._move.x = this._position.x + x;
    this._move.y = this._position.y + y;
    this._setCssProperties({
      offsetLeftPixels: this._move.x,
      offsetTopPixels: this._move.y,
    });
  }

  _onDropEnd(ev) {
    if (ev.animationName === 'drop') {
      this.dispatchEvent(new CustomEvent('dropped'));
      this.removeEventListener('animationend', this._onDropEnd);
      this.classList.remove('dropped');
    }
  }

  _onMousedown(ev) {
    this.classList.add('grabbed');
    this._mousemove = this._onMousemove.bind(this);
    this._mouseup = this._onMouseup.bind(this);
    this._cursor = { x: ev.pageX, y: ev.pageY };
    this._position.x = this._move ? this._move.x : 0;
    this._position.y = this._move ? this._move.y : 0;
    this._move = { x: 0, y: 0 };
    document.documentElement.addEventListener('mousemove', this._mousemove);
    document.documentElement.addEventListener('mouseup', this._mouseup);
  }

  _onMousemove(ev) {
    this._moveTo(ev.pageX - this._cursor.x, ev.pageY - this._cursor.y);
  }

  _onMouseup() {
    this.classList.remove('grabbed');
    document.documentElement.removeEventListener('mousemove', this._mousemove);
    document.documentElement.removeEventListener('mouseup', this._mouseup);
    this._mousemove = null;
    this._mouseup = null;
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

const stickyContent = window.customElements.whenDefined('sticky-content');
Promise.all([stickyContent]).then(() => {
  window.customElements.define('sticky-note', StickyNote);
});

