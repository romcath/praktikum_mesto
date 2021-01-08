import { ESC_KEYCODE } from '../utils/constants';

export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }

  _handleClickCloseButton(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleClickCloseButton.bind(this));
  }
}
