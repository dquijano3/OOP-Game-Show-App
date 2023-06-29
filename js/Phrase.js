/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }
  
    // Display the phrase on the game board
    addPhraseToDisplay() {
        const phraseContainer = document.querySelector('#phrase ul');
        const phraseCharacters = this.phrase.split('');

       phraseCharacters.forEach(character => {
      const li = document.createElement('li');
      li.textContent = character;

      if (character !== ' ') {
        li.classList.add('hide', 'letter', character);
      } else {
        li.classList.add('space');
      }

      phraseContainer.appendChild(li);
    });
  }
  
  
    checkLetter(letter) {
        return this.phrase.includes(letter);
      }
    
      showMatchedLetter(letter) {
        const phraseLetters = document.getElementsByClassName('letter');
        for (let i = 0; i < phraseLetters.length; i++) {
          if (phraseLetters[i].textContent.toLowerCase() === letter.toLowerCase()) {
            phraseLetters[i].classList.remove('hide');
            phraseLetters[i].classList.add('show');
          }
      }
    }
}