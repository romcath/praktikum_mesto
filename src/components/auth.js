/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
export default class Auth {
  constructor() {
  }

  // Возвращает состояние зарегистрирован ли пользователь
  getLoginState() {
    return !!localStorage.getItem('loginState');
  }
}