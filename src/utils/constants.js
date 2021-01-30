// Константы
const ESC_KEYCODE = 27;

// Обёртки
const HEADER_ELEMENT = document.querySelector('.header');
const MAIN_ELEMENT = document.querySelector('.content');
const PLACES_WRAP = document.querySelector('.places-list');
const ROOT_ELEMENT = document.querySelector('.root');

const SIGNUP_ELEMENT = document.querySelector('.auth_type_signup');
const LOGIN_ELEMENT = document.querySelector('.auth_type_login');

// Попапы
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
const SUBMIT_EDIT_BUTTON = document.querySelector('.form__button_type_edit');
const SUBMIT_CARD_BUTTON = document.querySelector('.form__button_new-card');
const SUBMIT_AVATAR_BUTTON = document.querySelector('.form__button_avatar');

// DOM-узлы профиля
const PROFILE_TITLE = document.querySelector('.user-info__name');
const PROFILE_DESCRIPTION = document.querySelector('.user-info__job');
const PROFILE_AVATAR = document.querySelector('.user-info__photo');

// Поля формы профиля
const TITLE_INPUT_VALUE = document.querySelector('.form__input_type_name');
const DESCRIPTION_INPUT_VALUE = document.querySelector('.form__input_type_about');

// Селекторы шаблонов
const CARD_SELECTOR = '.place-card-template';

// Объект с селекторами формы
const DEFAULT_FORM_CONFIG = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  activeButtonClass: 'form__button_enabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

const DEFAULT_MENU_CONFIG = {
  menuSelector: '.menu',
  openMobileMenuSelector: '.header__menu-icon',
  buttonSelector: '.menu__button',
  emailSelector: '.menu__email',
  mobileMenuClass: 'menu_type_mobile',
  closeMobileMenuClass: 'header__menu-icon_close',
  rootTransformClass: 'root__transform',
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
  SUBMIT_EDIT_BUTTON,
  SUBMIT_CARD_BUTTON,
  SUBMIT_AVATAR_BUTTON,
  DESCRIPTION_INPUT_VALUE,
  REMOVE_MODAL_WINDOW,
  CARD_SELECTOR,
  DEFAULT_FORM_CONFIG,
  ESC_KEYCODE,
  OPEN_AVATAR_FORM_BUTTON,
  AVATAR_MODAL_WINDOW,
  HEADER_ELEMENT,
  SIGNUP_ELEMENT,
  LOGIN_ELEMENT,
  SUCCESS_MODAL_WINDOW,
  FAIL_MODAL_WINDOW,
  MAIN_ELEMENT,
  DEFAULT_MENU_CONFIG,
  ROOT_ELEMENT,
};
