import html from './photo-frame.html';
import css from './photo-frame.pcss';

export default class PhotoFrame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;

    this._img = this.shadowRoot.querySelector('.photo');
  }

  static get observedAttributes() {
    return ['image'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'image') {
      this._img.src = newVal;
    }
  }
}

window.customElements.define('photo-frame', PhotoFrame);