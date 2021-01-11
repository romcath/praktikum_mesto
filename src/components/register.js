export default class Register {
  constructor({ signupSelector, handleFormSubmit }) {
    this._signupSelector = signupSelector;
    this._handleFormSubmit = handleFormSubmit;
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
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit('123', '1221');
    });
  }
}