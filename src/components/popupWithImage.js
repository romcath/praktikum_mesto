import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }

  open({src, caption}) {
    super.open();
    this._image = this._popupElement.querySelector('.popup__image');
    this._caption = this._popupElement.querySelector('.popup__caption');

    this._image.src = src;
    this._image.alt = `Изображение ${src}`;
    this._caption.textContent = caption;
  }
}
