const popupImgOpen = document.querySelector('.popup-img')
const imgPopup = popupImgOpen.querySelector('.popup-img__img-img')
const popupImgText = document.querySelector('.popup-img__text');

function handleEscClose(event) {
  if(event.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened')
    closePopup(popupActive)
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose)
}
// По другому сделать не вышло совсем....

export class Card {
    constructor(cardData, cardSelector, handleImageClick) {
      this.name = cardData.name;
      this.link = cardData.link;
      this.cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
  
    _getTemplate() {
      const cardTemplate = document.querySelector(this.cardSelector).content;
      const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate(); 
      this._setEventListeners()
      
      this._element.querySelector('.elements__title').textContent = this.name; 
      this._element.querySelector('.elements__mask-group').src = this.link;
      this._element.querySelector('.elements__mask-group').alt = this.name
      return this._element;

    }
  
    _setEventListeners() {
      this._element.querySelector('.elements__group')
      .addEventListener('click', () => {
        this._handleLikeClick();
      });
  
      this._element.querySelector('.elements__trash')
      .addEventListener('click', () => {
        this._handleTrashClick();
      })
  
      this._element.querySelector('.elements__mask-group')
      .addEventListener('click', () => {
        this._handleImageClick();
      })      
    }
  
    _handleLikeClick() {
      this._element.querySelector('.elements__group')
      .classList.toggle('elements__group-like');
    }
  
    _handleTrashClick() {
      this._element.querySelector('.elements__trash')
      .closest('.elements__element').remove()
    }

    // _handleClickImg() {
    //   popupImgOpen.classList.add('popup_opened');
    //   document.addEventListener('keydown', handleEscClose)
    //   imgPopup.src = this.link;
    //   popupImgText.textContent = this.name
    //   imgPopup.alt = this.name;
    // }
  }

  
  


  
  


  
  


  
  


  
  


  
  


  
  


  
  


