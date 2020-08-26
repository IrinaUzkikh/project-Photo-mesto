export default class Popup {
  constructor(popupContainer) {
    this.popupContainer = popupContainer;
  }

  open() {
    this.popupContainer.classList.add('popup_is-opened');
  }

  close() {
    this.popupContainer.classList.remove('popup_is-opened');
    for (let i = 0; i < this.popupContainer.querySelectorAll('.error-message').length; i++) {
      this.popupContainer.querySelectorAll('.error-message')[i].textContent = '';
    }
    for (let i = 0; i < this.popupContainer.querySelectorAll('input').length; i++) {   
      this.popupContainer.querySelectorAll('input')[i].value = '';
    }
  }
}

