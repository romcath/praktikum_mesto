import Popup from './popup';

export default class PopupWithFormSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._form = this._popupElement.querySelector('.form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
