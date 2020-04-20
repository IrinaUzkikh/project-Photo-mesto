import {popupAvatar as popupContainer} from './index.js';
import {Popup} from './popup.js';
console.log(popupContainer);

class PopupAnotherButton extends Popup {
  constructor (popupContainer) {
    this.popupContainer = popupContainer;
    //super (popupContainer);
    this.popupContainer.querySelector('#card-close').addEventListener('click', this.closeFormCard.bind(this));
    popupContainer.querySelector('#card-close').addEventListener('click', this.closeFormCard.bind(this));
  }
    openPopup() {
      this.open();
      this.popupContainer.querySelector('.button').style.fontSize = '18px';
      //open();
      //popupContainer.querySelector('.button').style.fontSize = '18px';
    }
}
export {PopupAnotherButton};