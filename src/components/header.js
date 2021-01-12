export default class Header {
  constructor({ headerElement, handleHeaderClick }) {
    this._headerElement = headerElement;
    this._handleHeaderClick = handleHeaderClick || (() => {});

    this._handleHeaderClick = this._handleHeaderClick.bind(this);
  }
  // constructor(headerElement) {
  //   this._headerElement = headerElement;
  // }

  render(isLoggedIn, text, email) {
    this._menuButton = this._headerElement.querySelector('.menu__button');
    if (isLoggedIn) {
      this._headerElement.querySelector('.menu__email').textContent = email;
      this._menuButton.textContent = 'Выйти';
    } else {
      this._menuButton.textContent = text;
      this._menuButton.addEventListener('click', this._handleHeaderClick);
    }
  }

  clearListener() {
    this._menuButton.removeEventListener('click', this._handleHeaderClick);
  }
}