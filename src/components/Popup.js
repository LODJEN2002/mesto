export class Popup {
    constructor(popupSelector) {
      this._popupSelector = document.querySelector(popupSelector);
      this._closeIcon = this._popupSelector.querySelector('.popup__close-icon')
      this._handleEscClose = this._handleEscClose.bind(this)
    }
  
    open() {
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener('keydown' , this._handleEscClose)
    }
  
    close() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown' , this._handleEscClose)
    }
  
    _handleEscClose(event) {
        const ESC_KEYCODE = 27;
      if(event.which === ESC_KEYCODE) {
        this.close()
      }
    }
  
    setEventListeners() {
      this._closeIcon.addEventListener('click', () => {
        this.close()
      })
      
      this._popupSelector.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
          this.close()
        }
      })
    }
  }