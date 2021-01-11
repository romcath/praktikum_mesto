/* eslint-disable prefer-promise-reject-errors */
export default class Api {
  constructor(options) {
    this._options = options;
  }

  signup({ email, password }) {
    return fetch(`${this._options.baseUrl}/signup`, {
      redirect: 'follow',
      credentials: 'include',
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._options.baseUrl}/cards`, {
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  changeLikeCard(cardId, like) {
    return fetch(`${this._options.baseUrl}/cards/like/${cardId}`, {
      method: like ? 'DELETE' : 'PUT',
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  removeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  addCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      // redirect: 'follow',
      // credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
}