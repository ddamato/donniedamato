import html from './photo-card.html';
import css from './photo-card.pcss';

export default class PhotoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
  }
}

window.customElements.define('photo-card', PhotoCard);