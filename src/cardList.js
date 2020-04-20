class CardList {
    constructor(container, cardInstance) {
      this.container = container;
      this.cardInstance = cardInstance;
    }
    addCard(card) {
      const cardElement = this.cardInstance.create(card);
      this.container.appendChild(cardElement);
    }
    render(arr) {
      arr.forEach(element => {
        this.addCard(element);
      });
    }
 
}
