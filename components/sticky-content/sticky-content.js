import html from './sticky-content.html';
import css from './sticky-content.pcss';

export default class StickyContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
  }
}

window.customElements.define('sticky-content', StickyContent);