import html from './sticker-text.html';
import css from './sticker-text.pcss';

export default class StickerText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._textContainer = this.shadowRoot.querySelector('.sticker-text');
    this._slot = this.shadowRoot.querySelector('slot');
    this._slot.addEventListener('slotchange', () => {
      const [...nodes] = this._slot.assignedNodes();
      this._textContainer.dataset.text = nodes.map((node) => node.nodeValue.trim()).join(' ');
    });
  }
}

window.customElements.define('sticker-text', StickerText);