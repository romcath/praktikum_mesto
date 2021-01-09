/* eslint-disable prefer-promise-reject-errors */
export default class Api {
  constructor(options) {
    this.options = options;
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  changeLikeCard(cardId, like) {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: like ? 'DELETE' : 'PUT',
      headers: this.options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  removeCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  addCard({ name, link }) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
}