export default class Card {
  constructor({cardData, handleCardClick, handleLikeClick, handleDeleteIconClick, cardSelector}) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._userId = cardData.userId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  getCard() {
    this._element = this._getCardElement();
    this._setEventListeners();
    this._updateLikes();
    
    this._element.querySelector('.place-card__name').textContent =  this._name;
    this._element.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.place-card__delete-icon')
      .classList.add(this._userId === this._ownerId ? 'place-card__delete-icon_enable' : 'place-card__delete-icon');

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place-card')
      .cloneNode(true);

    return cardElement;
  }

  _updateLikes() {
    this._element.querySelector('.place-card__like-counter').textContent = `${this._likes.length}`;
    this._likeButton = this._element.querySelector('.place-card__like-icon');
   
    if (this.isLiked()) {
      this._likeButton.classList.add('place-card__like-icon_liked');
    }
    else {
      this._likeButton.classList.remove('place-card__like-icon_liked');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.place-card__like-icon')
      .addEventListener('click', () => this._handleLikeClick(this));

    this._element.querySelector('.place-card__delete-icon')
      .addEventListener('click', () => this._handleDeleteIconClick(this));

    this._element.querySelector('.place-card__image')
      .addEventListener('click', () => this._handleCardClick({
        caption: this._name,
        src: this._link
      }));
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  setLike(data) {
    this._likes = data.likes;
    this._updateLikes();
  }

  id() {
    return this._cardId;
  }
}