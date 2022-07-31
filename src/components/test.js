//Создадим класс

export class Card {
    constructor({ data, userId, deleteCardPopup, handleCardClick}, cardSelector) {
      this._image = data.link;
      this._text = data.name;
      this._id = data.id;
      this._likesNumber = data.likes;
      this._handleCardClick = handleCardClick;
      this._cardSelector = cardSelector;
      this._userId = userId;
      this._deleteCardPopup = deleteCardPopup;
      this._ownerId = data.owner._id;
  
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      // Добавим данные
      this._cardPicture = this._element.querySelector(".card__foto");
      this._cardPicture.src = this._image;
      this._element.querySelector(".card__text").textContent = this._text;
      this._cardPicture.alt = this._text;
      this._element.querySelector(".card__likes-number").textContent = this._likesNumber.length;
  
      this._setEventListeners();
  
      // Вернём элемент наружу
      return this._element; 
    }
  
    // _deleteCard() {
    //   this._element.remove();
    // }
  
    // Обработчик
  
    _setEventListeners() {
  
      this.buttonDelete = this._element.querySelector(".card__button-delete");
  
        if (this._userId === this._ownerId){
          this.buttonDelete.classList.add('card__delete');
         this.buttonDelete.addEventListener("click", () => {
          this._deleteCardPopup(this._element, this._id);
          })
         }
  
  
      this._element
        .querySelector(".card__like")
        .addEventListener("click", function (evt) {
          evt.target.classList.toggle("card__like_active")
  
        });
  
      this._cardPicture.addEventListener("click", () => {
        this._handleCardClick(this._image, this._text);
      });
    }
  }