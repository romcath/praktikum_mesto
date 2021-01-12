export default class Register {
  constructor({ signupSelector, handleFormSubmit, handleLinkClick }) {
    this._signupSelector = signupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._handleLinkClick = handleLinkClick || (() => {});

    this._handleLinkClick = this._handleLinkClick.bind(this);
  }

  _getSignupElement() {
    const signupElement = document
      .querySelector(this._signupSelector)
      .content
      .querySelector('.auth')
      .cloneNode(true);

    return signupElement;
  }

  getSignup() {
    this._element = this._getSignupElement();
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.auth__link').addEventListener('click', this._handleLinkClick);

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit('123', '1221');
    });
  }

  clearElement() {
    this._element.remove();
    this._element = null;
  }
}