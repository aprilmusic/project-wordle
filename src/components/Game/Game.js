import React from 'react';

import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function GuessResults({ guesses }) {
  return <div class="guess-results">
    {range(NUM_OF_GUESSES_ALLOWED).map((rowIndex) =>  
     {const guessStatus = guesses[rowIndex] ? checkGuess(guesses[rowIndex], answer) : null;
      return <p class="guess" key={rowIndex}>
        {guesses[rowIndex] ? 
        guesses[rowIndex].split('').map((letter, index) => <span class={`cell ${guessStatus[index].status}`} key={index}>{letter}</span>) : 
        range(5).map((index) => <span class="cell" key={index}></span>)}
      </p>}
    )}
  </div>;
}

function GuessBox({ guesses, setGuesses, hasWon, hasLost, setHasWon, setHasLost }) {
  const [guess, setGuess] = React.useState('');
  return <div><form class="guess-input-wrapper" 
    onSubmit={(e) => {
      e.preventDefault();
      setGuesses([...guesses, guess]);
      setHasWon(guess === answer);
      setHasLost(guess !== answer && guesses.length === NUM_OF_GUESSES_ALLOWED);
      setGuess('');
    }}>
  <label for="guess-input">Enter guess:</label>
  <input id="guess-input" type="text" value={guess} onChange={(e) => setGuess(e.target.value.toUpperCase())} required pattern="[A-Z]{5}" disabled={hasWon || hasLost} />
  </form>
  {hasWon && <div class="happy banner">
    <p>
      <strong>Congratulations!</strong> Got it in{' '}
      <strong>{guesses.length} guesses</strong>.
    </p>
  </div>}
  {hasLost && <div class="sad banner">
    <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
  </div>}
</div>
}

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [hasWon, setHasWon] = React.useState(false);
  const [hasLost, setHasLost] = React.useState(false);

  return <div>
    <GuessResults guesses={guesses} />
    <GuessBox guesses={guesses} setGuesses={setGuesses} hasWon={hasWon} hasLost={hasLost} setHasWon={setHasWon} setHasLost={setHasLost} />
    </div>;
}

export default Game;
