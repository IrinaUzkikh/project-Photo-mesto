const card = new Card();
const placesList = new CardList(document.querySelector('.places-list'), card);
const popupContainerPlace = new Popup(document.querySelector('#popup-place'));
const popupContainerProfile = new PopupAnotherButton(document.querySelector('#popup-profile'));
const popupContainerAvatar = new PopupAnotherButton(document.querySelector('#popup-avatar'));
const popupContainerCard = new PopupCard(document.querySelector('#popup-card'));
const formValidator = new FormValidator();
const userInfo = new UserInfo();

const api = new Api({
  baseUrl: URL,
  //baseUrl: 'https://praktikum.tk/cohort9',
  headers: {
    authorization: '444753df-33e6-45f8-9354-4bae456fab7c',
    'Content-Type': 'application/json'
  }
});
const formPlace = document.forms.new;
const formProfile = document.forms.profile;
const formAvatar = document.forms.avatar;

//функция, которая при загрузке меняет текст кнопки на "Загрузка..."
function renderLoading(isLoading, element, text) {
  if (isLoading) {
    element.textContent = "Загрузка...";
  } else {
    element.textContent = text;
  }
}

//загрузка информации о пользователе
api.initialUserInfo.bind(api)()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.updateUserInfo(res);
  })
  .catch((err) => {
    console.log(err);
  })

//загрузка карточек
api.getInitialCards.bind(api)()
  .then((res) => {
      const arr = res.map(object => {
      const { name, link, _id: cardId } = object;
      const userId = object.owner._id;
      const countLike = object.likes.length;
      let signLike = false;
      object.likes.forEach((elem) => {
        if (elem._id === userInfo.getUserId) {
          signLike = true;
        }
      })
      return { name, link, cardId, userId, countLike, signLike };
    });
    placesList.render.bind(placesList)(arr);
  })
  .catch((err) => {
    console.log(err);
  })

//слушатель добавления новой карточки
formPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  renderLoading(true, document.querySelector('#button-place'));
  api.addNewCard.bind(api)(formPlace.elements.name.value, formPlace.elements.link.value)
    .then((result) => {
      const card = {};
      card.name = result.name;
      card.link = result.link;
      card.cardId = result._id;
      card.userId = result.owner._id;
      card.countLikes = result.likes.length;
      placesList.addCard.bind(placesList)(card);
      popupContainerPlace.close();
      renderLoading(false, document.querySelector('#button-place'), '+');
      formPlace.reset();
    })
    .catch((err) => {
      console.log(err);
    })
})
//слушатель кнопки открытия попапа новой карточки
document.querySelector('#add-place').addEventListener('click', (event) => {
  popupContainerPlace.open();
  formValidator.disableButton(document.querySelector('#button-place'));
})

//слушатель кнопки удаления карточки
document.querySelector('.places-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__delete-icon')) {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      let cardId = `${event.target.closest('.place-card').querySelector('.place-card__card-id').textContent}`;
      api.removeCard.bind(api)(event, cardId)
        .then((result) => {
          card.remove.bind(placesList)(event);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
})

//слушатель кнопки постановки и удаления лайка
document.querySelector('.places-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__like-icon')) {
    const cardId = `${event.target.closest('.place-card').querySelector('.place-card__card-id').textContent}`;
    if (event.target.classList.contains('place-card__like-icon_liked')) {
      api.deleteLike.bind(api)(event, cardId)
        .then((result) => {
          card.like.bind(card)(event);
          event.target.closest('.place-card').querySelector('.place-card__count-like').textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.putLike.bind(api)(event, cardId)
        .then((result) => {
          card.like.bind(card)(event);
          event.target.closest('.place-card').querySelector('.place-card__count-like').textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
})

//слушатель кнопки открытия профиля
document.querySelector('#edit-profile').addEventListener('click', (event) => {
  popupContainerProfile.openPopup();
  formValidator.activeButton(document.querySelector('#button-profile'));
  formProfile.elements.name.value = userInfo.getName;
  formProfile.elements.info.value = userInfo.getInfo;
})

//слушатель кнопки сохранения отредактированного профиля
document.querySelector('#button-profile').addEventListener('click', (event) => {
  event.preventDefault();
  renderLoading(true, event.target);
  api.editProfile.bind(api)(formProfile.elements.name.value, formProfile.elements.info.value)
    .then((result) => {
      userInfo.setUserInfo(result);
      userInfo.updateUserInfo(result);
      renderLoading(false, event.target, 'Сохранить');
      popupContainerProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
})
//слушатель кнопки открытия аватара
document.querySelector('#edit-avatar').addEventListener('click', (event) => {
  popupContainerAvatar.openPopup();
  formValidator.disableButton(document.querySelector('#button-avatar'));
})

//слушатель кнопки сохранения нового аватара
document.querySelector('#button-avatar').addEventListener('click', (event) => {
  event.preventDefault();
  api.setNewAvatar.bind(api)(formAvatar.elements.avatar.value)
    .then((result) => {
      document.querySelector('#edit-avatar').style.backgroundImage = `url(${result.avatar})`;
      popupContainerAvatar.close();
      formValidator.disableButton(document.querySelector('#button-avatar'));
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
})
//слушатель открытия попапа карточки
document.querySelector('.places-list').addEventListener('click', (event) => {
  const theTarget = event.target.classList;
  if (theTarget.contains('place-card__image')) {
    popupContainerCard.open();
    popupContainerCard.createImg(event);
}
})
//слушатели закрытия попапов
   document.querySelector('#profile-close').addEventListener('click', popupContainerProfile.close.bind(popupContainerProfile));
   document.querySelector('#place-close').addEventListener('click', popupContainerPlace.close.bind(popupContainerPlace));
   document.querySelector('#avatar-close').addEventListener('click', popupContainerAvatar.close.bind(popupContainerAvatar));
   document.querySelector('#card-close').addEventListener('click', popupContainerCard.closeFormCard.bind(popupContainerCard));

//слушатели валидации полей ввода
document.querySelector('#namePlace').addEventListener('input', formValidator.setEventListeners.bind(formValidator));
document.querySelector('#link').addEventListener('input', formValidator.setEventListeners.bind(formValidator));
document.querySelector('#name').addEventListener('input', formValidator.setEventListeners.bind(formValidator));
document.querySelector('#info').addEventListener('input', formValidator.setEventListeners.bind(formValidator));
document.querySelector('#avatar').addEventListener('input', formValidator.setEventListeners.bind(formValidator));

import "./style.css";
import {Api} from './js/api.js';
import {Card} from './js/card.js';
import {CardList} from './js/cardList.js';
import {FormValidator} from './js/formValidator.js';
import {Popup} from './js/popup.js';
import {PopupAnotherButton} from './js/popupAnotherButton.js';
import {PopupCard} from './js/popupCard.js';
import {UserInfo} from './js/userInfo.js';
export {userInfo};
