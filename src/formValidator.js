class FormValidator {

  activeButton(element) {
    element.classList.add('popup__button_active');
    element.style.color = 'white';
    element.removeAttribute('disabled');
  }

  disableButton(element) {
    element.classList.remove('popup__button_active');
    element.style.color = 'rgba(0, 0, 0, .2)';
    element.setAttribute('disabled', true);
  }

  checkInputValidity(element, button) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (!element.checkValidity()) {

      if (element.validity.tooShort) {
        errorElement.textContent = 'Должно быть от 2 до 30 символов';
      } else if (element.validity.valueMissing) {
        errorElement.textContent = 'Это обязательное поле';
      } else if (element.validity.typeMismatch) {
        errorElement.textContent = 'Здесь должна быть ссылка';
      }

      element.parentElement.classList.add('input-container__invalid');
      this.disableButton(button);
      return false;
    } else {
      element.parentElement.classList.remove('input-container__invalid');
      errorElement.textContent = '';
      this.activeButton(button);
      return true;
    }
  }

  setSubmitButtonState(element, sign) {
    return sign ? this.activeButton(element) : this.disableButton(element);
  }

  setEventListeners(event) {
    event.preventDefault();
    const inputs = Array.from(event.target.closest('form').elements);
    let isValidForm = true;
    const button = inputs[inputs.length - 1];
    inputs.forEach((elem) => {
      if (elem.id !== button.id) {
        if (!this.checkInputValidity(elem, button)) isValidForm = false;

      }
    })
    this.setSubmitButtonState(button, isValidForm);
  }
}

