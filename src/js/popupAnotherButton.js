import Popup from './popup.js';

export default class PopupAnotherButton extends Popup {

      openPopup() {
      this.open();
      this.popupContainer.querySelector('.button').style.fontSize = '18px';    
    }
}
