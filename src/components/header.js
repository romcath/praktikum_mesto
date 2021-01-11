export default class Header {
  constructor(headerElement) {
    this._headerElement = headerElement;
  }

  render(isLoggedIn, email) {
    this._menuButton = this._headerElement.querySelector('.menu__button');
    if (isLoggedIn) {
      this._headerElement.querySelector('.menu__email').textContent = email;
      this._menuButton.textContent = 'Выйти';
    } else {
      this._menuButton.textContent = 'Войти';
    }
  }
}