/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


const game = new Game();

// Start Game button event listener
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', () => {
  game.startGame();
});

// Add event listener to the onscreen keyboard buttons
const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    console.log('Keyboard button clicked');
    game.handleInteraction(event.target);
  }
});