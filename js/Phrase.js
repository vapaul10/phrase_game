/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App Valeri Paul
 * Phrase.js */
 
class Phrase {
    constructor(phrase) {
        // takes in the phrase input and converts the letters to lowercase
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Splits the phrase into an array of char and creates li element for each letter with their appropriate class name
     */
    addPhraseToDisplay() {
        const phraseDiv = document.querySelector('#phrase');
        // clears the content in the div element for restarting a second game
        phraseDiv.textContent = '';

        // create a new ul element and append it to the div element
        let phraseUl = document.createElement('ul');
        phraseDiv.appendChild(phraseUl);

        
        const charArr = this.phrase.split("");
        charArr.forEach(char => {
            const li = document.createElement('li');
            if (/[a-z]/.test(char)) {
                li.className = `hide letter ${char}`;
                li.textContent = char;
            } else {
                /* 
                    when there is a space, start a new ul element 
                    so that when the display size is adjusted the entire word would wrap to the next line and not just single letters
                    this will make it easier to identify how many letters are in a word.
                */
                phraseUl = document.createElement('ul');
                phraseDiv.appendChild(phraseUl);
                li.className = 'space';
                li.textContent = char;
            }
            phraseUl.appendChild(li);
        });
    }

    /**
     * Searches for a character in the phrase
     * @param {string} letter - character to search for in the string
     * @returns {boolean} - true if the character is in the string, false if not
     */
    checkLetter(letter) {
      return this.phrase.includes(letter);
    }

    /**
     * Changes the class of matched letter to show and removes hide class to display on screen
     * @param {*} letter - character to unhide in the phrase
     */
    showMatchedLetter(letter) {
        const matchLetter = document.querySelectorAll(`.${letter}`);
        matchLetter.forEach(letter => letter.classList.replace('hide','show'));
    }
}