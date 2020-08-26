export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.headers.authorization;
    this.contentType = options.headers['Content-Type'];
  }
  
  requestToServer(url, method, bodyObject) {
    return fetch(url, {
      method: method,
      headers: {
        authorization: this.authorization,
        'Content-Type': this.contentType
      },
      body: JSON.stringify(bodyObject)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        alert('Что-то пошло не так...');
        console.log(err);
        throw err;
      })
  }

  initialUserInfo() {
    return this.requestToServer(`${this.baseUrl}/users/me`, 'GET');
  }

  getInitialCards() {
    return this.requestToServer(`${this.baseUrl}/cards`, 'GET');
  }

  editProfile(nameProfile, infoProfile) {
    return this.requestToServer(`${this.baseUrl}/users/me`, 'PATCH', { name: nameProfile, about: infoProfile });
  }

  addNewCard(namePlace, linkPlace) {
    return this.requestToServer(`${this.baseUrl}/cards`, 'POST', { name: namePlace, link: linkPlace });
  }

  removeCard(event, cardId) {
    return this.requestToServer(`${this.baseUrl}/cards/${cardId}`, 'DELETE');
  }

  putLike(event, cardId) {
    return this.requestToServer(`${this.baseUrl}/cards/like/${cardId}`, 'PUT');
  }

  deleteLike(event, cardId) {
    return this.requestToServer(`${this.baseUrl}/cards/like/${cardId}`, 'DELETE');
  }

  setNewAvatar(newAvatar) {
    return this.requestToServer(`${this.baseUrl}/users/me/avatar`, 'PATCH', { avatar: newAvatar });
  }
}

