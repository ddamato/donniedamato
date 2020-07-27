import css from './drop-note.pcss';

export default class DropNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>`;
  }

  add(note) {
    this.shadowRoot.appendChild(note);
    setTimeout(() => note.classList.remove('hidden'), 0);
  }

  remove() {
    const clones = this.shadowRoot.querySelectorAll('.note:not(.drop)');
    [...clones].forEach((clone) => clone.remove());
  }
}

window.customElements.define('drop-note', DropNote);