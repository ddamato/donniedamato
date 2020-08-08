import html from './logo-mark.html';
import css from './logo-mark.pcss';

export default class LogoMark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
  }
}

window.customElements.define('logo-mark', LogoMark);