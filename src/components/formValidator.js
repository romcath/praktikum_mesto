export default class FormValidator {
  constructor(config, popupElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._element = popupElement;
  }

  getInputValues() {
    const inputList = this._element.querySelectorAll('.form__input');

    this._formValues = {};
    inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  toggleButtonState(inputList, buttonElement) {
    if (this._getInvalidInput(inputList)) {
      buttonElement.classList.remove(this._activeButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.add(this._activeButtonClass);
      buttonElement.disabled = false;
    }
  }

  _getInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation() {
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    this._buttonElement = this._element.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  resetSpans() {
    this._spanList = Array.from(this._element.querySelectorAll('.form__error'));
    this._inputList.forEach((item) => item.classList.remove('form__input_type_error'));
    this._spanList.forEach((item) => {
      item.classList.remove('form__error_visible');
      item.textContent = '';
    });
  }
}