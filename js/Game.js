/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
// Import necessary classes

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createNewPhrase();
      
    this.activePhrase = null;
    
  }
  createNewPhrase(){
    // list is holding array of quoted phrases
    const list = [
        'Hello world',
        'Phrase hunter',
        'How are you',
        'I love JavaScript',
        'Full Stack',
        'Game development'
      ];
     // Filter the phrases to include only letters and spaces
    const filteredPhrases = list.filter(phrase => /^[a-zA-Z\s]+$/.test(phrase));
    // holding the class phrase and storing quote as parameter
    const phrases = filteredPhrases.map(quote => new Phrase(quote));
    return phrases;
}
  // Hide the overlay and start the game
  startGame() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    // Get a random phrase and display it
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();

    document.addEventListener('keydown', this.handlePhysicalKeyboardButton);
}
handlePhysicalKeyboardButton = (event) => {
    const pressedKey = event.key.toLowerCase();
    const keyboardButtons = document.querySelectorAll('.key');
    const matchingButton = [...keyboardButtons].find(
      button => button.textContent === pressedKey && !button.disabled
    );
  
    if (matchingButton) {
      this.handleInteraction(matchingButton);
    }
  };
  

  // Get a random phrase from the phrases array
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  handleInteraction(button) {
    button.disabled = true;

    const selectedLetter = button.textContent;

    if (this.activePhrase.checkLetter(selectedLetter)) {
      button.classList.add('chosen');
      this.activePhrase.showMatchedLetter(selectedLetter);
      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      button.classList.add('wrong');
      this.removeLife();
    }
  }

  removeLife() {
    // Replace a live heart with a lost heart image
    const scoreboard = document.getElementById('scoreboard');
    const tries = scoreboard.querySelectorAll('.tries');
    const heartImage = tries[this.missed].querySelector('img');
    heartImage.src = 'images/lostHeart.png';

    this.missed++;

    if (this.missed === 5) {
      // The player has lost the game
      this.gameOver(false);
    }
  }

  checkForWin() {
    const hiddenLetters = document.getElementsByClassName('hide');
    return hiddenLetters.length === 0;
  }

  gameOver(isWin) {
    // Display the original start screen overlay
    const overlay = document.getElementById('overlay');
    overlay.style.display = '';

    const gameOverMessage = document.getElementById('game-over-message');
    const startButton = document.getElementById('btn__reset');

    if (isWin) {
      // The player has won the game
      gameOverMessage.textContent = 'Congratulations! You won!';
      overlay.classList.remove('start', 'lose');
      overlay.classList.add('win');
      overlay.style.backgroundColor = 'var(--color-win)'; // Apply the green background color
      startButton.textContent = 'Play Again';
    } else {
      // The player has lost the game
      gameOverMessage.textContent = 'Sorry, better luck next time!';
      overlay.classList.remove('start', 'win');
      overlay.classList.add('lose');
      overlay.style.backgroundColor = 'var(--color-lose)'; // Apply the red background color
      startButton.textContent = 'Try Again';
    }

    // Reset the game for a new round
    this.resetGameboard();
    this.resetGame();
  }

resetGameboard() {
    const phraseUl = document.querySelector('#phrase ul');
    phraseUl.innerHTML = '';

    const keyboardButtons = document.querySelectorAll('.key');
    keyboardButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove('chosen', 'wrong');
      button.classList.add('key');
    });

    const hearts = document.querySelectorAll('.tries img');
    hearts.forEach(heart => {
      heart.src = 'images/liveHeart.png';
    });
  }

resetGame() {
    this.missed = 0;
    this.activePhrase = null;
  }
}