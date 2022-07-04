const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const conteo=document.getElementById('conteo');
const figureParts = document.querySelectorAll('.part');
const timer=document.querySelector('.timer');
const notes=document.getElementById('notes');
const fail= new Audio('./audios/fail.mp3');
const Ale= new Audio('./audios/Ale.mp3');
const losing= new Audio('./audios/perder.mp3');
for( audio of[fail, Ale,losing]){
  audio.volume=0.5
}

const words = [
  'Titanic',
  'TheSilentOfTheLambs',
  'LeageOfLeagues',
  'Terminator',
  'Bourne',
  'Avatar',
  'CallOfDuty',
  'SuperMan',
  'Batman',
  'Ironman',
  'CaptainAmerica',
  'LeagueOfJustice',
  'Avenger',
  'Allien',
  'TheGoodFather',
  'GrandTheftAuto',
  'NeedForSpeed',
  'GrandTurismo',
  'SplinterCell',
  'MetalGear'
];
const correctLetters = [];
const wrongLetters = [];
wordEl.style.display="flex";
wordEl.style.flexDirection='row';
wordEl.style.justifyContent='center';
wordEl.style.alignItems='center';
let selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Felicitaciones';
    Ale.play();
    popup.style.display = 'flex';
  }
}
// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Erradas</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'grid';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Perdiste. 💩';
    losing.play();
    document.getElementById('centering').classList.add('my-filter');
    popup.style.display = 'flex';
  }
}
// Show notification
function showNotification() {
  notification.classList.add('show');
  fail.play();
  setTimeout(() => {
    notification.classList.remove('show');
  }, 500);
}

// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
        for( let i=0;i<figureParts.length;i++){
          figureParts[i].classList.add('turn')
        }
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  document.getElementById('centering').classList.remove('my-filter');
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});
displayWord();
Timer();