import {Popup} from './popup.js';

export class PopupCard extends Popup {
     createImg(event) {
      const cardImage = document.createElement('img');
      cardImage.setAttribute('id', 'img-popup');
      cardImage.classList.add("popup-card__image");
      const imageString = event.target.style.backgroundImage;
      cardImage.src = imageString.substr(5, (imageString.length - 7));
      cardImage.alt = "card";
      this.popupContainer.firstElementChild.appendChild(cardImage);
    }
     closeFormCard() {
      this.close();
      this.popupContainer.querySelector('#img-popup').remove();
    }
}

  