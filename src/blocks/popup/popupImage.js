import Popup from '../popup/popup';

export default class PopupImage extends Popup {
  constructor() {
    super();
  }

  openImage() {
    const getBackgroundImage = document.querySelector('.place-card__image:hover').getAttribute('style').split(' ')[1];
    const popupImageCard = document.querySelector('.popup_type_image');
    const popupImage = popupImageCard.querySelector('.popup__image');

    popupImage.setAttribute('src', getBackgroundImage.substr(5, getBackgroundImage.length - 8));
    popupImageCard.classList.add('popup_is-opened');
  }
}