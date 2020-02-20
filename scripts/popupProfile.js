class PopupProfile extends Popup {
  constructor(validation) {
    super(document.querySelector('.popup_type_edit-profile'));
    document.forms.edit.addEventListener('input', function() {
      validation.checkInputValidity(validation);
    });
    document.forms.edit.addEventListener('input', function() {
      validation.setSubmitButtonState(document.forms.edit.elements.name,
        document.forms.edit.elements.about,
        document.querySelector('.popup__button_size_small'));
    });
  }

  open() {
    super.open();
    this.render();
  }

  render() {
    const inputName = document.querySelector('.popup__input_type_name');
    const inputAbout = document.querySelector('.popup__input_type_about');
    const userName = document.querySelector('.user-info__name');
    const userJob = document.querySelector('.user-info__job');

    inputName.setAttribute('value', userName.textContent);
    inputAbout.setAttribute('value', userJob.textContent);
  }
}