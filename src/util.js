const inquirer = require('inquirer');

const genList = (round) => {
  let card = round.returnCurrentCard();
  
  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

    if(!round.returnCurrentCard()) {
      round.endRound();
    } else {
      main(round);
    }
}

//-----------------------------------------
// const genGameChoice = () => {
//   return {
//     type: 'rawlist',
//     message: 'Which game would you like to play? Select game and press ENTER',
//     name: 'answers',
//     choices: ['original game', 'extra game']
//   };
// }

// const getGameChoice = () => {
//   return Promise.resolve('pizza');
// }

// async function gameType() {
//   // inquirer
//   // .prompt([
//   //   {
//   //     name: "user_name",
//   //     type: "input",
//   //     message: "What is your name?",
//   //   },
//   // ])
//   // .then((answer) => {
//   //   console.log("Hello " + answer.user_name);
//   //   return answer.user_name

//   //   //have bread and butter here but need need to cook my way to the full course on Game.js
//   // });
//   // const gameChoice = await getGameChoice();
//   // const getAnswer = await inquirer.prompt(genGameChoice());
//   // const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

//     // if(!round.returnCurrentCard()) {
//     //   round.endRound();
//     // } else {
//     //   main(round);
//     // }
// }

module.exports.main = main;
// module.exports.gameType = gameType;