/*    Algorithm

  When Clicking a button:

    1. Computer randomly selects a move.
    2. Compare the moves to get the result.
    3. Display the result in a popup message
*/

//  create object here for the score
//  This value are related to each other
//  We create the variable outside the function and a scope because eveytime we make a move, we need to update the score from last time.
//  In order to save the score from last time, we need to keep the variable outside the function
//  if the variable is inside the function, the function would create a new score everytime.

/* 
  const score = {
    wins: 0,
    losses: 0,
    tie: 0
  };
*/

// we will use the score from localStorage instead of resetting the score everytime like above
//  when we load the page
//  we're going to load the score that we just save from localStorage

//const score = JSON.parse(localStorage.getItem('score'));
//let score = JSON.parse(localStorage.getItem('score')); //reassigning variable so we use let

//  the shortcut
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tie: 0
};

//  we call it outside the function too to display the result even when we reload the page
//  call the function here updateScore
updateScoreElement();


//  if there is no score in the localStorage, we're gonna give it a default value to avoid an error
//  if the score is null or score = null
//  the !score below will flip it to true
/*
  if(!score){
  score = {
    wins: 0,
    losses: 0,
    tie: 0
  };
} 
*/

//  to get the string out of localStorage
//  when we 1st load the page, we're gonna get that value our of localStorage
// getItem() => gets a value out of localStorage
  //console.log(JSON.parse(localStorage.getItem('score')));


function playGame(playerMove){
  const computerMove = pickComputerMove();  // we will call the function here for picking computer's move.

  let result = '';

  // we add another if statement to calculate the result if the player picks scissors
  if(playerMove === 'scissors'){
    if(computerMove === 'rock'){ 
      result = 'Human Lose';
    } else if(computerMove === 'paper'){
      result = 'Human Wins';
    } else if(computerMove === 'scissors'){
      result = 'It is a Tie';
    }
  } else if(playerMove === 'paper'){  // we add another if statement to calculate the result if the player picks paper
    if(computerMove === 'rock'){
      result = 'Human Wins';
    } else if(computerMove === 'paper'){
      result = 'It is a Tie';
    } else if(computerMove === 'scissors'){
      result = 'Human Lose';
    }
  } else if(playerMove === 'rock'){ // we add another if statement to calculate the result if the player picks rock
    if(computerMove === 'rock'){  
      result = 'It is a Tie';
    } else if(computerMove === 'paper'){  
      result = 'Human Lose';
    } else if (computerMove === 'scissors'){  
      result = 'Human Wins';
    }
  }
  
  //  Code for updating the score
  if(result === 'Human Wins'){
    score.wins+=1;
  } else if(result === 'Human Lose'){
    score.losses += 1;
  } else if(result === 'It is a Tie'){
    score.tie += 1;
  }

  //  after we update the score, we're gonne save it to localStorage.
  //  save a value inside a local storage
  //  1st string is name => to access the value we save later
  //  2nd is the value that we want to save in localStorage
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = `${result}`; //  or without template string and ${} like result; lang pwede rin

  document.querySelector('.js-move')
    .innerHTML = `Human Picked 
    <img class="css-move-emoji" src="10-image/${playerMove}-emoji.png" alt="">
    Computer Picked
    <img class="css-move-emoji" src="10-image/${computerMove}-emoji.png" alt="">`;

  //  we call the function here to avoid writing the code multiple times.
  updateScoreElement();

}

/************** UPDATE SCORE ON THE WEBPAGE **************/

//  This will update the score on the paragraph
function updateScoreElement(){
  //  this will change the innerHTML of element js-score specified in the paragraph to the actual score
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Tie: ${score.tie}`;
}

/*****************  COMPUTER MOVE **************/

function pickComputerMove(){
  let computerMove = ''; // there will be an error because this variable should be outside the scope. The next thing we could do is to return this variable.

  const randomNum = Math.random();
  
  if(randomNum >= 0 && randomNum < 1/3){
    computerMove = 'rock';
  } else if(randomNum >= 1/3 && randomNum < 2/3){
    computerMove = 'paper';
  } else if(randomNum >= 2/3 && randomNum < 1){
    computerMove = 'scissors';
  }

  return computerMove; // This will take whatever value is saved inside this variable and return it out of the function.
}

/************** RESET BUTTON W EVENT LISTENER **************/

//  Exercise V and W
function resetButtonElement(){
  score.wins = 0;
  score.losses = 0;
  score.tie = 0;

  localStorage.removeItem('score');

  //After we reset the score, we're gonna call the function update score to reset its value
  updateScoreElement();
}
let resetButton = document.querySelector('.js-reset-button');


//  Exercise X
//  If reset button is click, will jump to the Confirmation Function
 resetButton.addEventListener('click',()=>{
  myConfirmation();
 });

/*********************  Add Event Listener *************************/
//  Undefined COde
//document.querySelector('.js-rock-button')
//  .addEventListener('click', playGame('rock'));

//  event listener for Rock
document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('rock');
  });

//  event listener for Paper
document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('paper');
  });

//  event listener for Scissors
document.querySelector('.js-scissors-button')
.addEventListener('click', ()=>{
  playGame('scissors');
});

//  Event Listener using KeyDown
//  -   we will be using the body so that whenever we type anywhere on the page, we can run some code

document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p'){
    playGame('paper');
  } else if(event.key === 's'){
    playGame('scissors');
  } // Exercise U
  else if(event.key === 'a' || event.key === 'A'){
    autoPlay();
  } //  Exercise W
  else if(event.key === 'Backspace'){
    myConfirmation();
      

  }else {
    alert('Invalid Key Pressed!');
  }
});

//  Exercise X
//  Function for Confirmation
function myConfirmation(){
  const confirmButtonElem = document.querySelector('.js-confirm');

    confirmButtonElem.innerHTML = `<br><br>
    Are you sure you want to Reset the Score?
    <button class="confirm-yes-button">Yes</button>
    <button class="confirm-no-button">No</button>`;

    const confirmYesButton = document.querySelector('.confirm-yes-button');
    let confirmNoButton = document.querySelector('.confirm-no-button');
    
    if(confirmYesButton.innerText === 'Yes'){
      confirmYesButton.addEventListener('click', () =>{
        resetButtonElement();
        confirmButtonElem.innerHTML = '';
      
      });
    }
    if(confirmNoButton.innerText === 'No'){
      confirmNoButton.addEventListener('click', () =>{
        confirmButtonElem.innerHTML = '';
      })
    }
}

/**********************  AUTOPLAY THE GAME **************************/

//  variable to keep track if whether or not we are playing
let isAutoPlaying = false;
let intervalId;


//  const autoPlay = ()=>{

//  }
//  no need to switch it to arrow function because
//  -   this is easier to read
//  -   the function syntax enables us to hoist (we can call this function before we create it, no orders) it.
function autoPlay(){
  if(!isAutoPlaying) { // will flip it to true
    intervalId =  setInterval(() =>{  //  switched to Arrow Function
      const playMove = pickComputerMove();
      playGame(playMove);
    }, 2000);

    //  change it to true because now we are autoplaying
    isAutoPlaying = true;

    /*
      if(isAutoPlaying){
        document.querySelector('.js-auto-play')
        .innerText = 'Auto Playing';
      }
    */

   // Exercise T
      document.querySelector('.js-auto-play')
      .innerText = 'Stop Playing';
    
    
  } else {
    //  setInterval
    //  -   returns a number (ID)
    //  - we can use it to stop the interval

    //  clearInterval
    //  -   to stop setInterval
    clearInterval(intervalId);
    isAutoPlaying = false; // we just stop autoplaying so we will set it to false.

    // Exercise T
    document.querySelector('.js-auto-play')
      .innerText = 'Auto Play';

  }
  
}
//  Autoplay Event Listener
document.querySelector('.js-event-auto-button')
  .addEventListener('click', ()=>{
    autoPlay();
  });