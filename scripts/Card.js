export { initialCards, Card }

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Челябинск',
      link: 'https://www.alltime.ru/obj/article/image-blog/Chelyabinsk/Chelyabinsk_1.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

class Card {
    constructor(initialCards) {
      this.name = initialCards.name;
      this.link = initialCards.link;
    }
  
    _getTemplate() {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  
    return cardElement;
    }
  
    generateCard() {
    this._element = this._getTemplate(); 
    this._setEventListeners()
  
    this._element.querySelector('.elements__title').textContent = this.name; 
    this._element.querySelector('.elements__mask-group').src = this.link;
  
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
        this._handleClickImg();
      })

    }
  
    _handleLikeClick() {
      this._element.querySelector('.elements__group')
      .classList.toggle('elements__group-like');
    }
  
    _handleTrashClick(evt) {
      this._element.querySelector('.elements__trash')
      .closest('.elements__element').remove()
    }
    _handleClickImg() {
      const popupImgOpen = document.querySelector('.popup-img')
      const imgPopup = popupImgOpen.querySelector('.popup-img__img-img')
      const popupImgText = document.querySelector('.popup-img__text');
      popupImgOpen.classList.add('popup_opened');
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            popupImgOpen.classList.remove('popup_opened');
          }
      })
      imgPopup.src = this.link;
      popupImgText.textContent = this.name
      imgPopup.alt = this.name;
    }
  }