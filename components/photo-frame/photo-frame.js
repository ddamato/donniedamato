import html from './photo-frame.html';
import css from './photo-frame.pcss';

export default class PhotoFrame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;

    this._frame = this.shadowRoot.querySelector('.photo-frame');
    this._img = this.shadowRoot.querySelector('.photo-aspect');
    this._headline = this.shadowRoot.querySelector('.headline');
    this._link = this.shadowRoot.querySelector('.link');
    this._closeButton = this.shadowRoot.querySelector('.close-button');

    this._frame.addEventListener('click', () => {
      this.fullscreen(true);
    });

    this._closeButton.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.fullscreen(false);
    });
  }

  fullscreen(boolean) {
    if (boolean) {
      document.body.classList.add('scroll-lock');
      this._setRestingDimension();
      this._frame.classList.add('fixed-focus');
      window.setTimeout(() => this._setFullscreen(), 0);
    } else {
      document.body.classList.remove('scroll-lock');
      this._frame.scrollTop = 0;
      this._setRestingDimension();
      const finalize = () => {
        this.removeAttribute('style');
        this._img.removeAttribute('style');
        this._frame.removeAttribute('style');
        this._frame.classList.remove('fixed-focus');
        this._frame.removeEventListener('transitionend', finalize);
      };
      this._frame.addEventListener('transitionend', finalize);
    }
  }

  _setFullscreen() {
    this._setDimensions(this._frame, {
      height: '100%',
      width: '100%',
      top: 0,
      left: 0
    });
  }

  _setRestingDimension() {
    const bcr = this.getBoundingClientRect();
    
    this._setDimensions(this, {
      height: `${bcr.height}px`,
      width: `${bcr.width}px`,
      top: `${bcr.top}px`,
      left: `${bcr.left}px`,
    });

    this._setDimensions(this._frame, {
      height: `${bcr.height}px`,
      width: `${bcr.width}px`,
      top: `${bcr.top}px`,
      left: `${bcr.left}px`,
    });

    this._img.style.width = this._img.offsetWidth + 'px';
  }

  _setDimensions(elem, styles) {
    Object.entries(styles).forEach(([prop, value]) => {
      elem.style.setProperty(prop, value);
    });
  }

  static get observedAttributes() {
    return ['image', 'headline', 'link'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'image') {
      this._img.src = newVal;
    }

    if (attrName === 'headline') {
      this._headline.textContent = newVal;
    }

    if (attrName === 'link') {
      this._link.href = newVal;
      this._link.textContent = newVal;
    }
  }
}

window.customElements.define('photo-frame', PhotoFrame);