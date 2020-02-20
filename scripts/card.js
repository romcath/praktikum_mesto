class Card {
  constructor() {
    this.cardElement = {};
  }

  like(item, element) {
    this.renderLikeIcon(element);
    this.renderLikeCounter(item, element);
  }

  remove(card) {
    card.remove();
  }

  create(cardData) {
    this.cardElement = document.createElement('div');
    this.cardElement.classList.add('place-card');
    this.cardElement.id = cardData._id;
    this.template(cardData);
    this.cardElement.querySelector('.place-card__name').textContent = cardData.name;
    this.cardElement.querySelector('.place-card__image').style.backgroundImage = `url(${cardData.link})`;
  }

  template() {
    this.cardElement.insertAdjacentHTML('beforeend', `
      <div class='place-card__image'>
        <button class='place-card__delete-icon'></button>
      </div>
      <div class='place-card__description'>
        <h3 class='place-card__name'></h3>
        <div class='place-card__like'>
          <button class='place-card__like-icon'></button>
          <span class='place-card__like-counter'>0</span>
        </div>
      </div>`);
  }

  renderLikeIcon(element) {
    const likeIcon = element.querySelector('.place-card__like-icon');
    likeIcon.classList.toggle('place-card__like-icon_liked');
  }

  renderLikeCounter(item, element) {
    const likeCounter = element.querySelector('.place-card__like-counter');
    likeCounter.textContent = `${item.likes.length}`;
  }

  renderDeleteIcon(element) {
      const deleteIcon = element.querySelector('.place-card__delete-icon');
      deleteIcon.classList.add('place-card__delete-icon_enable');
  }
}