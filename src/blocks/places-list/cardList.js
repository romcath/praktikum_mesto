export default class CardList {
  constructor(card) {
    this.card = card;
  }
  
  addCard(container) {
    container.appendChild(this.card.cardElement); 
    this.card.renderDeleteIcon(this.card.cardElement);
  }

  render(container, cards) {
    const owner = document.querySelector('.user-info__name');
    
    cards.forEach((item) => {
      this.card.create(item);
      container.appendChild(this.card.cardElement);
      this.card.renderLikeCounter(item, this.card.cardElement);

      if (item.owner._id === owner.id) {
        this.card.renderDeleteIcon(this.card.cardElement);
      }
      item.likes.forEach(like => {
        if (like._id === owner.id) {
          this.card.renderLikeIcon(this.card.cardElement);
        }
      });
    });
  }
}