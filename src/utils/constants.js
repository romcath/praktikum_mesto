// Константы
const ESC_KEYCODE = 27;

// Попапы
const PLACES_WRAP = document.querySelector('.places-list');
const EDIT_FORM_MODAL_WINDOW = document.querySelector('.popup_type_edit-profile');
const CARD_FORM_MODAL_WINDOW = document.querySelector('.popup_type_new-card');
const IMAGE_MODAL_WINDOW = document.querySelector('.popup_type_image');
const AVATAR_MODAL_WINDOW = document.querySelector('.popup_type_avatar');
const REMOVE_MODAL_WINDOW = document.querySelector('.popup_type_remove-card');

// Кнопки
const OPEN_EDIT_FORM_BUTTON = document.querySelector('.user-info__button-edit');
const OPEN_CARD_FORM_BUTTON = document.querySelector('.user-info__button-add');
const OPEN_AVATAR_FORM_BUTTON = document.querySelector('.user-info__photo');

// DOM-узлы профиля
const PROFILE_TITLE = document.querySelector('.user-info__name');
const PROFILE_DESCRIPTION = document.querySelector('.user-info__job');
const PROFILE_AVATAR = document.querySelector('.user-info__photo');

// Данные форм и элементы форм
const TITLE_INPUT_VALUE = EDIT_FORM_MODAL_WINDOW.querySelector('.popup__input_type_name');
const DESCRIPTION_INPUT_VALUE = EDIT_FORM_MODAL_WINDOW.querySelector('.popup__input_type_about');

const INPUT_LIST_CARD = Array.from(CARD_FORM_MODAL_WINDOW.querySelectorAll('.popup__input'));
const BUTTON_SUBMIT_CARD = CARD_FORM_MODAL_WINDOW.querySelector('.popup__button');

const INPUT_LIST_EDIT = Array.from(EDIT_FORM_MODAL_WINDOW.querySelectorAll('.popup__input'));
const BUTTON_SUBMIT_EDIT = EDIT_FORM_MODAL_WINDOW.querySelector('.popup__button');

const INPUT_LIST_AVATAR = Array.from(AVATAR_MODAL_WINDOW.querySelectorAll('.popup__input'));
const BUTTON_SUBMIT_AVATAR = AVATAR_MODAL_WINDOW.querySelector('.popup__button');

const CARD_SELECTOR = '.place-card-template';
const DEFAULT_FORM_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  activeButtonClass: 'popup__button_enabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_visible',
};

export {
  PLACES_WRAP,
  EDIT_FORM_MODAL_WINDOW,
  CARD_FORM_MODAL_WINDOW,
  IMAGE_MODAL_WINDOW,
  OPEN_EDIT_FORM_BUTTON,
  OPEN_CARD_FORM_BUTTON,
  PROFILE_TITLE,
  PROFILE_DESCRIPTION,
  PROFILE_AVATAR,
  TITLE_INPUT_VALUE,
  DESCRIPTION_INPUT_VALUE,
  REMOVE_MODAL_WINDOW,
  CARD_SELECTOR,
  DEFAULT_FORM_CONFIG,
  ESC_KEYCODE,
  INPUT_LIST_CARD,
  BUTTON_SUBMIT_CARD,
  INPUT_LIST_EDIT,
  BUTTON_SUBMIT_EDIT,
  OPEN_AVATAR_FORM_BUTTON,
  AVATAR_MODAL_WINDOW,
  INPUT_LIST_AVATAR,
  BUTTON_SUBMIT_AVATAR,
};
