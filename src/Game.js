const data = require('./data.js');
const photoData = require('./photoData.js')
const prototypeQuestions = data.prototypeData;
const photographyQuestions = photoData.photographyData;

const util = require('./util');

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round')


class Game {
  constructor() {
    this.cards;
    this.deck = [];
    this.round = {};
  };

  start() {
    const questions = prototypeQuestions
    this.cards = questions.map(({id, question, answers, correctAnswer}) => {
      return new Card(id, question, answers, correctAnswer);
    })

    this.deck = new Deck(this.cards);
    this.round = new Round(this.deck);
    this.printMessage(this.deck, this.round);
    this.printQuestion(this.round);
  };

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  };

  printQuestion(round) {
      util.main(round);
  };
};

module.exports = Game;