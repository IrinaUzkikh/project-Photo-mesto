import {userInfo} from './index.js';

export class Card {
    
    create(card) {
      const placeCard = document.createElement("div");
      placeCard.classList.add("place-card");
      placeCard.insertAdjacentHTML('beforeend', `
      <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
          <p class="place-card__card-id"></p>
          <p class="place-card__user-id"></p>

          <h3 class="place-card__name"></h3>
          <div class="place-card__block">
            <button class="place-card__like-icon"></button>
            <p class="place-card__count-like">0</p>
          </div>  
      </div>`);
      
      placeCard.querySelector(".place-card__name").textContent = card.name;
      placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${card.link})`;
      placeCard.querySelector(".place-card__card-id").textContent = card.cardId;
      placeCard.querySelector(".place-card__user-id").textContent = card.userId;
      placeCard.querySelector(".place-card__count-like").textContent = card.countLike;
  
      if (placeCard.querySelector('.place-card__user-id').textContent === userInfo.getUserId) {
        placeCard.querySelector('.place-card__delete-icon').style.display = 'block';
      }
      if (card.signLike) {
        placeCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
      }
      return placeCard;
    }
    
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }  

    remove(event) {
      event.target.closest('.place-card').remove();
    }
}




