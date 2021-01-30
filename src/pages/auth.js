/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import './auth.css';
import {
  DEFAULT_FORM_CONFIG,
  FAIL_MODAL_WINDOW,
  HEADER_ELEMENT,
  SUCCESS_MODAL_WINDOW,
  DEFAULT_MENU_CONFIG,
  ROOT_ELEMENT,
  SIGNUP_ELEMENT,
  LOGIN_ELEMENT,
} from '../utils/constants';

import Register from '../components/register';
import FormValidator from '../components/formValidator';
import Api from '../components/api';
import Popup from '../components/popup';
import Header from '../components/header';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/cohort7',
  headers: {
    authorization: '5547747b-c129-4e77-93a7-481a2a2f0413',
    'Content-Type': 'application/json',
  },
});

const popupFail = new Popup(FAIL_MODAL_WINDOW);
popupFail.setEventListeners();
const popupSuccess = new Popup(SUCCESS_MODAL_WINDOW);
popupSuccess.setEventListeners();

const loginFormValidator = new FormValidator(DEFAULT_FORM_CONFIG, LOGIN_ELEMENT);
loginFormValidator.enableValidation();

const signupFormValidator = new FormValidator(DEFAULT_FORM_CONFIG, SIGNUP_ELEMENT);
signupFormValidator.enableValidation();

const headerLogin = new Header({
  headerElement: HEADER_ELEMENT,
  rootElement: ROOT_ELEMENT,
  handleHeaderClick: () => {
    loginRegister.close();
    signupRegister.open();
    headerLogin.removeEventListener();
    headerSignup.render(false, 'Войти');
  },
}, DEFAULT_MENU_CONFIG);

const headerSignup = new Header({
  headerElement: HEADER_ELEMENT,
  rootElement: ROOT_ELEMENT,
  handleHeaderClick: () => {
    signupRegister.close();
    loginRegister.open();
    headerSignup.removeEventListener();
    headerLogin.render(false, 'Регистрация');
  },
}, DEFAULT_MENU_CONFIG);
headerSignup.render(false, 'Войти');

const signupRegister = new Register({
  authElement: SIGNUP_ELEMENT,
  handleFormSubmit: () => {
    const data = signupFormValidator.getInputValues();

    api.signup(data)
      .then(() => {
        popupSuccess.open();
        localStorage.setItem('loginState', 'true');
        window.location.replace('./index.html');
      })
      .catch((err) => {
        popupFail.open();
        console.log(`Ошибка регистрации пользователя: ${err}`);
      });
  },
  handleLinkClick: () => {
    signupRegister.close();
    loginRegister.open();
    headerLogin.render(false, 'Регистрация');
  },
});

signupRegister.setEventListeners();

const loginRegister = new Register({
  authElement: LOGIN_ELEMENT,
  handleFormSubmit: () => {
    const data = loginFormValidator.getInputValues();

    api.login(data)
      .then(() => {
        localStorage.setItem('loginState', 'true');
        window.location.replace('./index.html');
      })
      .catch((err) => {
        popupFail.open();
        console.log(`Ошибка входа пользователя: ${err}`);
      });
  },
  handleLinkClick: () => {
    loginRegister.close();
    signupRegister.open();
    headerSignup.render(false, 'Войти');
  },
});
loginRegister.setEventListeners();