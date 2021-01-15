export default class Header {
  constructor({ headerElement, rootElement, handleHeaderClick }, config) {
    this._headerElement = headerElement;
    this._rootElement = rootElement;
    this._buttonSelector = config.buttonSelector;
    this._emailSelector = config.emailSelector;
    this._mobileMenuClass = config.mobileMenuClass;
    this._closeMobileMenuClass = config.closeMobileMenuClass;
    this._rootTransformClass = config.rootTransformClass;

    this._headerMenu = this._headerElement.querySelector(config.menuSelector);
    this._mobileMenuButton = this._headerElement.querySelector(config.openMobileMenuSelector);

    this._handleHeaderClick = handleHeaderClick || (() => {});
    this._handleHeaderClick = this._handleHeaderClick.bind(this);

    this.openMobileMenu = this.openMobileMenu.bind(this);
    this.closeMenuMobile = this.closeMenuMobile.bind(this);

    this._mobileMenuButton.addEventListener('click', this.openMobileMenu);
  }

  render(isLoggedIn, text, email) {
    this._menuButton = this._headerElement.querySelector(this._buttonSelector);
    if (isLoggedIn) {
      this._headerElement.querySelector(this._emailSelector).textContent = email;
      this._menuButton.textContent = text;
      this._setEventListener(this._menuButton, 'click', this._handleHeaderClick);
    } else {
      this._menuButton.textContent = text;
      this._setEventListener(this._menuButton, 'click', this._handleHeaderClick);
    }
  }

  _setEventListener(element, event, handler) {
    element.addEventListener(event, handler);
  }

  removeEventListener(element, event, handler) {
    element.removeEventListener(event, handler);
  }

  openMobileMenu() {
    this._rootElement.classList.add(this._rootTransformClass);
    this._headerMenu.classList.add(this._mobileMenuClass);
    this._mobileMenuButton.classList.add(this._closeMobileMenuClass);

    this.removeEventListener(this._mobileMenuButton, 'click', this.openMobileMenu);
    this._setEventListener(this._mobileMenuButton, 'click', this.closeMenuMobile);
  }

  closeMenuMobile() {
    this._rootElement.classList.remove(this._rootTransformClass);
    this._headerMenu.classList.remove(this._mobileMenuClass);
    this._mobileMenuButton.classList.remove(this._closeMobileMenuClass);

    this.removeEventListener(this._mobileMenuButton, 'click', this.closeMenuMobile);
    this._setEventListener(this._mobileMenuButton, 'click', this.openMobileMenu);
  }
}