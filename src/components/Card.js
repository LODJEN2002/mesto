export class Card {
    constructor({cardData, handleImageClick, handleTrashClick, handleLikeClick, handleLikeOff }, cardSelector) {
      this.cardData = cardData;
      this.name = cardData.name;
      this.link = cardData.link;
      this.owner = cardData.owner;
      this._id = this.owner._id;
      this.idCard = cardData._id;
      this.likes = cardData.likes
      this.likeLength = this.likes.length // Кол-во лайков.
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleTrashClick = handleTrashClick;
      this._handleLikeClick = handleLikeClick;
      this._handleLikeOff = handleLikeOff
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
      if(this._id !== '297072208aef3e18899373f7'){
        this._element.querySelector('.elements__trash').remove()
      }
      this._numberLike = this._element.querySelector('.element__number-like')
      this._numberLike.textContent = this.likeLength;
      this._like = this._element.querySelector('.elements__group')

      this.likes.some(num => {
        if(num._id === '297072208aef3e18899373f7'){
          this._like.classList.add('elements__group-like')

        }
      })

      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.elements__group')
      .addEventListener('click', () => {
        if(this._element.querySelector('.elements__group-like')){
          this._handleLikeOff()
        }
        else {
          this._handleLikeClick()
        }
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
  
    addLike() {
      this._like.classList.add('elements__group-like');
      this.likeLength += 1;
      this._numberLike.textContent = this.likeLength;
    }
    
    deliteLike() {
      this._like.classList.remove('elements__group-like');
      this.likeLength -= 1;
      this._numberLike.textContent = this.likeLength;
    }

    handleOkClick() {
      this._element.remove()
    }

    returnCardId() {
      return this.idCard
    }
  }


