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

  //получение информации о пользователе
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  //получение карточек
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  //изменение данных о пользователе
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameUser,
        about: data.jobUser
      })
    })
  }

  //изменение аватара
  setUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.userAvatar
      })
    })
  }

  //добавление карточки
  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  //удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  };

  //отправка лайка
  putLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  };

  //снятие лайка
  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
  };
}
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
      authorization: 'ab8a5103-cafe-4d34-aecd-dfeba40f1516',
      'Content-Type': 'application/json'
    }
  });
  
  export default api;