import html from './card-carousel.html';
import css from './card-carousel.pcss';

export default class CardCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
  }
}

window.customElements.define('card-carousel', CardCarousel);
