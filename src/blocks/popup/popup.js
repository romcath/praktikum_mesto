export default class Popup {
  constructor(popupContainer) {
    this.popupContainer = popupContainer;
  }

  open() {
    this.popupContainer.classList.add('popup_is-opened');
  }

  close(closeElement) {
    const addButtonCard = document.querySelector('.popup__button_new-card');
    const addButtonProfile = document.querySelector('.popup__button_size_small');
    const addButtonAvatar = document.querySelector('.popup__button_avatar');
    const newCardForm = document.forms.new;
    const editProfileForm = document.forms.edit;
    const avatarForm = document.forms.avatar;

    addButtonCard.classList.remove('popup__button_enabled');
    addButtonProfile.classList.add('popup__button_enabled');
    addButtonAvatar.classList.remove('popup__button_enabled');

    closeElement.classList.remove('popup_is-opened');

    editProfileForm.reset();
    newCardForm.reset();
    avatarForm.reset();

    this.resetSpan();
  }

  resetSpan() {
    const spans = Array.from(document.querySelectorAll('.popup__span'));

    spans.forEach(item => {
      item.textContent = '';
    });
  }
}
