/*REVIEW. Отлично, что блок с формой для аватара отнесён к классу Popup */
class PopupAvatar extends Popup {
  constructor(validation) {
    super(document.querySelector('.popup_type_avatar'));
    document.forms.avatar.addEventListener('input', function() {
      validation.checkInputValidity(validation);
    });
    document.forms.avatar.addEventListener('input', function() {
      validation.setSubmitButtonState(document.forms.avatar.elements.avatar,
        document.forms.avatar.elements.avatar,
        document.querySelector('.popup__button_avatar'));
    });
  }
}