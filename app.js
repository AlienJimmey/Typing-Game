
//global variables
let time = 0;
let score = 0;
let isPlaying;
let difficultly = 5;

//elements
const difficultlyText = document.querySelector('#seconds');
const textInput = document.querySelector('#textinput');
const currentWord = document.querySelector('#current-word');
const displayTime = document.querySelector('#time');
const displayScore = document.querySelector('#score');
const message = document.querySelector('#message');


window.addEventListener("load", init);


function init() {
    //set difficulty
    difficultlyText.innerHTML = difficultly;
    time = difficultly;

    loadNewWord();

    //start game when player starts typing
    textInput.addEventListener('input', startGame);

    setInterval(countDown, 1000);
    
    setInterval(checkStatus, 50);

}



function startGame() {
    
    if (wordsMatch()) {
        score ++;
        time = difficultly + 1;
        isPlaying = true;
       
        textInput.value = '';
        message.innerHTML = 'Keep going!!!';
        loadNewWord();
    } else {
        
        
    }
    
    if (score == 0 || score == -1) {
        displayScore.innerHTML = 0;
    } else {
        displayScore.innerHTML = score;

    }
   
}

function wordsMatch() {
    if (currentWord.innerHTML === textInput.value) {
        return true;
    } else {
        return false;
    }

}

async function loadNewWord() {
    let res = await fetch('./res/dictionary.json');
    let wordsList = await res.json();

    randomIndex = Math.floor(Math.random() * wordsList.length);
    currentWord.innerHTML = wordsList[randomIndex];  
}

function countDown() {
    if (time > 0) {
        time--;

    } else if (time <=0 ) {
        isPlaying = false
    }

    displayTime.innerHTML = time;
}

function checkStatus() {
    if (time <= 0 && isPlaying === false) {
        message.innerHTML = 'Game Over'
        score = -1;

    }

}

