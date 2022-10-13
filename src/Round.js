const Turn = require("./Turn");

class Round {
    constructor(deck) {
        this.deck = deck;
        this.turns = 0;
        this.incorrectGuesses = [];
        this.currentCard = this.deck.cards[0];
        this.percentage = 0
    };

    takeTurn(userGuess) {
        let turn = new Turn(userGuess, this.currentCard);
        this.turns++
        if (!turn.evaluateGuess()) {
            this.incorrectGuesses.push(this.currentCard.id);
        }
        this.currentCard = this.deck.cards[this.turns];
        this.calculatePercentCorrect();
        return turn.giveFeedback();
    };

    returnCurrentCard() {
        return this.currentCard;
    };

    calculatePercentCorrect() {
        this.percentage = Math.round((((this.turns -
            this.incorrectGuesses.length) / this.turns) * 100));
        return this.percentage;
    }

    endRound() {
        const Game = require("./Game");
        let game = new Game();
        let gameStart = game.start();
        const endRoundMessage = `** Round over! ** You answered ${this.percentage}% of the questions correctly!`;
        const morePractice = `** You need more practice!! ** You scored ${this.percentage}%.  Go over the flashcards again!`
        if (this.percentage < 90) {
            console.log(morePractice)
            return gameStart;
        } else {
        console.log(endRoundMessage);
        return endRoundMessage;
        }
    }
};
module.exports = Round;