let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.img');
const userScores = document.querySelector(`#userScore`);
const compScores = document.querySelector(`#compScore`);
const msg = document.querySelector(`.msgContainer`);

const userChoices = () => {
  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const userChoice = choice.getAttribute('id');
      const computerChoice = compChoices();

      gamePlay(userChoice, computerChoice);
    });
  });
};

const compChoices = () => {
  const getResponse = [];

  choices.forEach((choice) => {
    getResponse.push(choice.getAttribute('id'));
  });

  const index = Math.floor(Math.random() * getResponse.length);
  const compChoice = getResponse[index];

  return compChoice;
};

const gamePlay = (userChoice, computerChoice) => {

  msg.classList.remove('drawn', 'userWin', 'compWin');

  if (userChoice === computerChoice) {
    msg.innerText = `You: ${userChoice} || Comp: ${computerChoice}\nMatch Drawn`;
    msg.classList.add('drawn', 'msg');
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'rock')
  ) {
    userScore++;
    msg.innerText = `You: ${userChoice} || Comp: ${computerChoice}\nYou win!`;
    msg.classList.add('userWin', 'msg');
  } else {
    compScore++;
    msg.innerText = `You: ${userChoice} || Comp: ${computerChoice}\nComputer wins!`;
    msg.classList.add('compWin', 'msg');
  }

  compScores.innerText = compScore;
  userScores.innerText = userScore;
};

userChoices();
