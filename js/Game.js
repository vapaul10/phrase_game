/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App Valeri Paul
 * Game.js */
 
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('Life is to be lived'),
                        new Phrase('The future belongs to believers'),
                        new Phrase('Even miracles take a little time'),
                        new Phrase('To see a rainbow you must tolerate rain'),
                        new Phrase('The secret to success is getting started'),
                        new Phrase('Do the right thing when nobody is looking'),
                        new Phrase('Safety First'),
                        new Phrase('Life is not a spectator sport'),
                        new Phrase('This is my project four'),
                        new Phrase('Courage is being scared and saddling up anyway'),
                        new Phrase('Just keep swimming'),
                        new Phrase('Live your life as a model for others')
        ];
        this.activePhrase = null;
        // added this property so the keydown eventlistener wont trigger when gameover screen is shown
        this.active = false;
    }

    /**
     * Starts the game off by hiding the overlay screen and getting a random pharase and setting it to the activephrase property
     */
    startGame() {
        // hides the startgame overlay
        document.querySelector('#overlay').style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        // sets the board active so it will handle interaction
        this.active = true;
    }

    /**
     * Pick a random number from 0 - length of phrases array and returns that random phrase in the array
     * @returns {object} - random object phrase in the phrase array
     */
    getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[randomNum];
    }
    
    /**
     * Checks the letter button selected is in the phase and calls respected methods 
     * @param {element} e - button element that triggered the event listener
     */
    handleInteraction(e) {
        // will only handle interaction when the game is active
        if (this.active) {
            let button;
            //if the event triggered was click/button then set the button equal to event target
            if (e.type === 'click') {
                button = e.target;
            } else {
                // if the event triggered was a keydown/input from the key board then we get all the button elements and filter out the letters that dont match the key selected on the keyboard
                const unusedButtons = document.querySelectorAll('.key');
                button = [...unusedButtons].filter(button => button.textContent === e.key).pop();
                if (!button) {
                    // if the user keys a letter that has been used nothing happens
                    return
                }
            }
    
            const letter = button.textContent;
            // disables the button so the user can no longer click the button
            button.disabled = 'true';
            if (this.activePhrase.checkLetter(letter)) {
                button.className = 'chosen';
                // the matched letter will appear on the webpage
                this.activePhrase.showMatchedLetter(letter);
                if(this.checkForWin()) {
                    this.gameOver();
                }
            } else {
                button.className = 'wrong';
                this.removeLife();
            }
        }
    }

    /**
     * Changes the heart image, add to missed counter and checks if out of lives
     */
    removeLife() {
        const life = document.querySelectorAll('[src="images/liveHeart.png"]');
        // changes the last heart image to lost heart
        life[life.length-1].src = "images/lostHeart.png";
        this.missed += 1;
        //if they have reached 5 guesses they lost the game
        if(this.missed > 4) {
            this.gameOver();
        }
    }

    /**
     * Checks to see if there are any letters with the hidden class
     * @returns {boolean} - true if no letters are hidden, false if there are still hidden letters
     */
    checkForWin() {
        const phraseDiv = document.querySelector('#phrase');
        const lettersLeft = phraseDiv.querySelector('.hide');
        if (lettersLeft) {
            // if there are any letters left return false
            return false;
        } else {
            return true;
        }
    }

    /**
     * Depending on if the user lost or won the start screen is displayed and h1 text is updated
     */
    gameOver() {
        // makes the game unactive so users cant trigger the keyup event listener
        this.active = false;
        const overlay = document.querySelector('#overlay');
        /* 
            set the class of the start screen back to start
            This is important when playing a second game
        */
        overlay.className = 'start';
        overlay.style.display = "";
        // if the gameOver method is called because the user won show you won setup
        if (this.missed < 5) {
            document.querySelector('#game-over-message').textContent = `YOU WON! The Phrase was: ${this.activePhrase.phrase}`;
            overlay.classList.replace('start','win');
        } else {
            document.querySelector('#game-over-message').textContent = `PLEASE TRY AGAIN. The Phrase was: ${this.activePhrase.phrase}`;
            overlay.classList.replace('start','lose');
        }
        // calls the restart board method
        this.restartBoard();
    }

    /**
     * Resets the qwerty buttons to original class and changes all hearts back to live hearts
     */
    restartBoard() {
        const qwertyButton = document.querySelectorAll(':disabled');
        qwertyButton.forEach(button => {
            button.disabled = false;
            button.className = 'key';
        });

        const tries = document.querySelectorAll('[src="images/lostHeart.png"]');
        tries.forEach(img => {
            img.src = "images/liveHeart.png";
        });
        this.missed = 0;
    }
}