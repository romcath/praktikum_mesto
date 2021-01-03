export default class FormValidator {
  constructor(words) {
    this.words = words;
  }
  checkInputValidity() {
    const input = event.target;
    const span = document.querySelector(`.popup__span_type_${input.getAttribute('name')}`);

    if (input.validity.valueMissing) {
      span.textContent = this.words.validationMissing;
    } else if (input.validity.tooShort || input.validity.tooLong) {
      span.textContent = this.words.validationLength;
    } else if (input.validity.patternMismatch) {
      span.textContent = this.words.validationLink;
    } else {
      span.textContent = '';
    }
  }

  setSubmitButtonState(inputFirst, inputSecond, button) {
    if (inputFirst.validity.valid && inputSecond.validity.valid) {
      button.removeAttribute('disabled');
      button.classList.add('popup__button_enabled');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__button_enabled');
    }
  }
}