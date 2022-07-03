export class Card {
    constructor(cardData, cardSelector, handleImageClick) {
      this.name = cardData.name;
      this.link = cardData.link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
  
    _getTemplate() {
      const cardTemplate = document.querySelector(this._cardSelector).content;
      const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate(); 
      this._setEventListeners()
      this._maskGroup = this._element.querySelector('.elements__mask-group')
      
      this._element.querySelector('.elements__title').textContent = this.name; 
      this._maskGroup.src = this.link;
      this._maskGroup.alt = this.name
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
      this._element.remove()
    }
  }

  
  


  
  


  
  


  
  


  
  


  
  


  
  


  
  


