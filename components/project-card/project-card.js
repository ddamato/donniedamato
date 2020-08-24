import html from './project-card.html';
import css from './project-card.pcss';

export default class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;

    this._$img = this.shadowRoot.querySelector('.image');
    this._$tags = this.shadowRoot.querySelector('.tags');
    this._$openButton = this.shadowRoot.querySelector('.open-project');
  }

  static get observedAttributes() {
    return ['image', 'tags', 'headline', 'summary'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'image') {
      this._$img.src = newVal;
    }

    if (attrName === 'tags') {
      this._$tags.innerHTML = newVal.split(',').map((tag) => `<li class="tag">${tag.trim()}</li>`).join('');
    }
  }
}

window.customElements.define('project-card', ProjectCard);
