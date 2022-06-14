export { enableValidationObj, FormValidatorTest }

const enableValidationObj = {
  //Форма и инпут
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  //Кнопки)
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  // Ошибки)
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidatorTest {
  constructor(enableValidationObj, formElement) {
    this._formElement = formElement
    this._inputElement = this._formElement.querySelector(enableValidationObj.inputSelector)

    this._inputList = Array.from(this._formElement.querySelectorAll(enableValidationObj.inputSelector))
    this._buttonElement = this._formElement.querySelector(enableValidationObj.submitButtonSelector)

  }
  
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)

        this._toggleButtonState()
      })
    })
  }

  _showInputError(inputElement) {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidationObj.inputErrorClass);
    this._formError.textContent = this._inputElement.validationMessage;
    this._formError.classList.add(enableValidationObj.errorClass);
  }

  _hideInputError(inputElement) {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidationObj.inputErrorClass);
    this._formError.textContent = '';
    this._formError.classList.remove(enableValidationObj.errorClass);
  }

  _isValid(inputElement) {
    if(!inputElement.validity.valid){
      this._showInputError(inputElement)
    }else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

  _toggleButtonState() {
  if(this._hasInvalidInput(this._inputList)) {
    this._buttonElement.setAttribute('disabled', true)
    this._buttonElement.classList.add(enableValidationObj.inactiveButtonClass)
  }else {
    this._buttonElement.removeAttribute('disabled')
    this._buttonElement.classList.remove(enableValidationObj.inactiveButtonClass)
  }
}

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
};
  
}







