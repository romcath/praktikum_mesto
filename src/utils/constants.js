// Константы
const ESC_KEYCODE = 27;

const MAIN_ELEMENT = document.querySelector('.content');

// Шапка
const HEADER_ELEMENT = document.querySelector('.header');

// Попапы
const PLACES_WRAP = document.querySelector('.places-list');
const EDIT_FORM_MODAL_WINDOW = document.querySelector('.popup_type_edit-profile');
const CARD_FORM_MODAL_WINDOW = document.querySelector('.popup_type_new-card');
const IMAGE_MODAL_WINDOW = document.querySelector('.popup_type_image');
const AVATAR_MODAL_WINDOW = document.querySelector('.popup_type_avatar');
const REMOVE_MODAL_WINDOW = document.querySelector('.popup_type_remove-card');
const SUCCESS_MODAL_WINDOW = document.querySelector('.popup_type_success');
const FAIL_MODAL_WINDOW = document.querySelector('.popup_type_fail');

// Кнопки
const OPEN_EDIT_FORM_BUTTON = document.querySelector('.user-info__button-edit');
const OPEN_CARD_FORM_BUTTON = document.querySelector('.user-info__button-add');
const OPEN_AVATAR_FORM_BUTTON = document.querySelector('.user-info__photo');

// DOM-узлы профиля
const PROFILE_TITLE = document.querySelector('.user-info__name');
const PROFILE_DESCRIPTION = document.querySelector('.user-info__job');
const PROFILE_AVATAR = document.querySelector('.user-info__photo');

// Данные форм и элементы форм
const TITLE_INPUT_VALUE = document.querySelector('.form__input_type_name');
const DESCRIPTION_INPUT_VALUE = document.querySelector('.form__input_type_about');
const BUTTON_SUBMIT_EDIT = document.querySelector('.form__button_type_edit');
const BUTTON_SUBMIT_CARD = document.querySelector('.form__button_new-card');
const BUTTON_SUBMIT_AVATAR = document.querySelector('.form__button_avatar');

const CARD_SELECTOR = '.place-card-template';
const SIGNUP_SELECTOR = '.signup-template';
const LOGIN_SELECTOR = '.login-template';

const DEFAULT_FORM_CONFIG = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  activeButtonClass: 'form__button_enabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
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
  BUTTON_SUBMIT_EDIT,
  BUTTON_SUBMIT_CARD,
  BUTTON_SUBMIT_AVATAR,
  DESCRIPTION_INPUT_VALUE,
  REMOVE_MODAL_WINDOW,
  CARD_SELECTOR,
  DEFAULT_FORM_CONFIG,
  ESC_KEYCODE,
  OPEN_AVATAR_FORM_BUTTON,
  AVATAR_MODAL_WINDOW,
  HEADER_ELEMENT,
  SIGNUP_SELECTOR,
  LOGIN_SELECTOR,
  SUCCESS_MODAL_WINDOW,
  FAIL_MODAL_WINDOW,
  MAIN_ELEMENT,
};
