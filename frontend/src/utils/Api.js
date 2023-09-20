class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  //проверка ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //метод получения информации о пользователе
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    })
  }

  //метод получения карточек
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include'
    })
  }

  //метод изменения данных о пользователе
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameUser,
        about: data.jobUser
      }),
      credentials: 'include'
    })
  }

  //метод изменения аватара
  setUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.userAvatar
      }),
      credentials: 'include'
    })
  }

  //метод добавления карточки
  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      credentials: 'include'
    })
  }

  //метод удаления карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
  };

  //метод отправки лайка
  putLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include'
    })
  };

  //метод снятия лайка
  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include'
    })
  };
}

const api = new Api({
  baseUrl: 'https://api.mrn1009.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
