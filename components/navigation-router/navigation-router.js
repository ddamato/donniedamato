import html from './navigation-router.html';
import css from './navigation-router.pcss';

export default class NavigationRouter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    this._navigation = this.shadowRoot.querySelector('.navigation');

    if (document.readyState === 'complete') {
      this._setNavigationItems();
    } else {
      document.addEventListener('DOMContentLoaded', () => this._setNavigationItems());
    }
  }

  _setNavigationItems() {
    this._initObserver();
    const elements = document.querySelectorAll('[id]');
    this._pageElements = [...elements].filter((el) => el.tagName.toLowerCase() !== 'photo-frame');
    this._galleryElements = [...elements].filter((el) => el.tagName.toLowerCase() === 'photo-frame');

    this._items = this._pageElements.reduce((items, el, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${el.id}" class="navigation-link">${el.id}</a>`;
      this._navigation.appendChild(li);
      return { ...items, [el.id]: li };
    }, {});

    this._pageElements.forEach((el) => this._observer.observe(el));

    this._onHashchange();
    window.addEventListener('hashchange', () => this._onHashchange());
  }

  _onHashchange() {
    const galleryElement = this._galleryElements.find((el) => this._checkAgainstHash(el.id));
    if (galleryElement) {
      const currentFocus = this._pageElements.find((el) => el.contains(galleryElement));
      this._focusById(currentFocus.id);
      galleryElement.fullscreen(true);
    }
  }

  _initObserver() {
    this._currentViewport = [];
    this._observer = new IntersectionObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!entries && !entries.length) {
          return;
        }

        entries
          .forEach(({ target, isIntersecting }) => {
            const index = this._currentViewport.indexOf(target);
            if (isIntersecting) {
              !~index && this._currentViewport.push(target);
            } else if (~index){
              this._currentViewport.splice(index, 1);
            }
          });

        const [ target ] = entries
          .filter(({ intersectionRatio }) => intersectionRatio === 1)
          .map(({ target }) => target)
          .concat(this._currentViewport);
        this._focusById(target.id);
      });
    }, { threshold: [0, 1] });
  }

  _checkAgainstHash(id) {
    return `#${id}` === window.location.hash;
  }

  _focusById(targetId) {
    Object.entries(this._items).forEach(([id, li], i) => {
      if (id === targetId) this.style.setProperty('--navigation-offset', i);
      li.classList.toggle('focused', id === targetId);
    });    
  }
}

window.customElements.define('navigation-router', NavigationRouter);