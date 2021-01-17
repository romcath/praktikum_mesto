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

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _setEventListeners() {
    this._element.querySelector('.auth__link').addEventListener('click', this._handleLinkClick);

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  clearElement() {
    this._element.remove();
  }
}