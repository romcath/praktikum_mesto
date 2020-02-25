export default class Api {
  constructor(options) {
    this.options = options;
  }

  getAboutProfile() {
    return fetch(this.options.baseUrl + '/users/me/', {
      headers: this.options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Данные о пользователе не загружены. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  patchAboutProfile(name, about) {
    return fetch(this.options.baseUrl + '/users/me/', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Данные пользователя не сохранены. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  getInitialCards() {
    return fetch(this.options.baseUrl + '/cards/', {
      headers: this.options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Карточки не загружены. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  postNewCard(name, link) {
    return fetch(this.options.baseUrl + '/cards', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Новая карточка не добавлена. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  deleteCard(id) {
    return fetch(this.options.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this.options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Карточка не удалена. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  putLike(id) {
    return fetch(this.options.baseUrl + '/cards/like/' + id, {
      method: 'PUT',
      headers: this.options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось поставить лайк. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  deleteLike(id) {
    return fetch(this.options.baseUrl + '/cards/like/' + id, {
      method: 'DELETE',
      headers: this.options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось снять лайк. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  patchAvatar(avatar) {
    return fetch(this.options.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось обновить аватарку. Ошибка: ${res.status}`);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }
}