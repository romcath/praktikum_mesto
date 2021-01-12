/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import './auth.css';
import {
  SIGNUP_SELECTOR,
  LOGIN_SELECTOR,
  DEFAULT_AUTH_CONFIG,
  MAIN_ELEMENT,
  SUCCESS_MODAL_WINDOW,
  FAIL_MODAL_WINDOW,
  HEADER_ELEMENT,
} from '../utils/constants';

import Register from '../components/register';
import FormValidator from '../components/formValidator';
import Section from '../components/section';
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

const popupSuccess = new Popup(SUCCESS_MODAL_WINDOW);
popupSuccess.setEventListeners();
const popupFail = new Popup(FAIL_MODAL_WINDOW);
popupFail.setEventListeners();

const authList = new Section({
  container: MAIN_ELEMENT,
});

const headerLogin = new Header({
  headerElement: HEADER_ELEMENT,
  handleHeaderClick: () => {
    loginRegister.clearElement();
    headerLogin.clearListener();
    signup();
  },
});

const headerSignup = new Header({
  headerElement: HEADER_ELEMENT,
  handleHeaderClick: () => {
    signupRegister.clearElement();
    headerSignup.clearListener();
    login();
  },
});

const login = () => {
  authList.addItem(loginRegister.getSignup());

  const LOGIN_MODAL_WINDOW = document.querySelector('.auth_type_login');
  const loginFormValidator = new FormValidator(DEFAULT_AUTH_CONFIG, LOGIN_MODAL_WINDOW);
  loginFormValidator.enableValidation();

  headerLogin.render(false, 'Регистрация');
};

const signup = () => {
  authList.addItem(signupRegister.getSignup());

  const SIGNUP_MODAL_WINDOW = document.querySelector('.auth_type_signup');
  const signupFormValidator = new FormValidator(DEFAULT_AUTH_CONFIG, SIGNUP_MODAL_WINDOW);
  signupFormValidator.enableValidation();

  headerSignup.render(false, 'Войти');
};

const signupRegister = new Register({
  signupSelector: SIGNUP_SELECTOR,
  handleFormSubmit: (data) => {
    api.signup(data)
      .then(() => {
        popupSuccess.open();
      })
      .catch((err) => {
        popupFail.open();
        console.log(`Ошибка регистрации пользователя: ${err}`);
      });
  },
  handleLinkClick: () => {
    signupRegister.clearElement();
    login();
  },
});

const loginRegister = new Register({
  signupSelector: LOGIN_SELECTOR,
  handleFormSubmit: (data) => {
    api.signin(data)
      .then(() => {
        popupSuccess.open();
      })
      .catch((err) => {
        popupFail.open();
        console.log(`Ошибка входа пользователя: ${err}`);
      });
  },
  handleLinkClick: () => {
    loginRegister.clearElement();
    signup();
  },
});

signup();