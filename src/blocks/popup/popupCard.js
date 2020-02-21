import Popup from '../popup/popup';

export default class PopupCard extends Popup {
  constructor(validation) {
    super(document.querySelector('.popup_type_new-card'));
    document.forms.new.addEventListener('input', function() {
      validation.checkInputValidity();
    });
    document.forms.new.addEventListener('input', function() {
      validation.setSubmitButtonState(document.forms.new.elements.title,
        document.forms.new.elements.link,
        document.querySelector('.popup__button_new-card'));
    });
  }
}