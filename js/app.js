/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App Valeri Paul
 * app.js */
 
// declares the game variable to be called in all event listeners
let game;

// listens for when the start game button is clicked
document.querySelector('#btn__reset').addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

// listens for when the qwerty buttons are selected and calls handleInteraction method only if the event that triggered the event listener was a button
document.querySelector('#qwerty').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e);
    }
});

// listens for when the user selects a letter using the keyboard
document.addEventListener('keydown',(e) => game.handleInteraction(e));