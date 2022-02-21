let editButton = document.querySelector('.profile__edit-button'); // Кнопка изменения
let closePopup = document.querySelector('.popup__close-icon') // Кнопка закрытия поп-ап

function showClick() {
  let openPopup = document.querySelector('.popup');
  openPopup.classList.add('popup_opened');
}

editButton.addEventListener('click' , showClick);

function delite() {
  let openPopup = document.querySelector('.popup');
  openPopup.classList.remove('popup_opened');
}

closePopup.addEventListener('click' , delite);


let formElement = document.querySelector('.profile__info') // На изменение профиля

let saveButton = document.querySelector(".popup__container-save") // Кнопка сохранить
let nameInput = document.querySelector('.popup__container-field-1');
let jobInput = document.querySelector('.popup__container-field-2');


function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameTitle = document.querySelector('.profile__info-text-title');
  let jobSubtitle = document.querySelector('.profile__info-text-subtitle');

  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click' , formSubmitHandler);
saveButton.addEventListener('click' , delite);
// Это я пытался сделать лайки, к сожалению вышло только так...
let like = document.querySelector('.elements__group')

function giveLike() {
  like.setAttribute('src' , 'images/union.svg')
}

like.addEventListener('click' , giveLike);
