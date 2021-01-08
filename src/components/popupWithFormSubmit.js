import Popup from './popup.js';

export default class PopupWithFormSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });

    super.setEventListeners();
  }
}
