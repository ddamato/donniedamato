import html from './speak-button.html';
import css from './speak-button.pcss';

export default class SpeakButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    const synth = window.speechSynthesis;
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => {
      const [...nodes] = slot.assignedNodes();
      this._text = nodes.map((node) => node.nodeValue.trim()).join(' ');
    });

    const button = this.shadowRoot.querySelector('.speak-button');
    button.addEventListener('click', () => {
      if (synth.speaking) {
        return;
      }
      const utterThis = new SpeechSynthesisUtterance(this._text);
      synth.speak(utterThis);
    });
  }
}

window.customElements.define('speak-button', SpeakButton);