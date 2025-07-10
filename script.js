let playerScore = 0
let computerScore = 0;
let gameOver = false;

const playerScoreEl = document.getElementById('player-score');
const compScoreEl   = document.getElementById('computer-score');
const resultEl = document.getElementById('result');

function getComputerChoice() {
    return ['Water','Grass','Fire'][Math.floor(Math.random()*3)];
}

function playRound(playerChoice) {
    if (gameOver) return;

    const computerChoice = getComputerChoice();
    let outcome = "";
    let gameEnd = "";

    // Shake animation for selected image
    const selectedImg = document.querySelector(`.option-img#${playerChoice.toLowerCase()}`);
    if (selectedImg) {
        selectedImg.classList.remove("shake"); // remove shake if already applied
        void selectedImg.offsetWidth; // force reflow to restart animation
        selectedImg.classList.add("shake");

        setTimeout(() => {
            selectedImg.classList.remove("shake");
        }, 500); // match CSS animation duration
    }

    // Determine outcome
    if (playerChoice === computerChoice) {
        outcome = "It's a tie!";
    } else if (
        (playerChoice === 'Water' && computerChoice === 'Fire') ||
        (playerChoice === 'Grass' && computerChoice === 'Water') ||
        (playerChoice === 'Fire' && computerChoice === 'Grass')
    ) {
        playerScore++;
        outcome = `<span class="win">You win!</span> ${playerChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        outcome = `<span class="loss">You lose!</span> ${computerChoice} beats ${playerChoice}.`;
    }

    // Update display
    compScoreEl.textContent   = computerScore;
    playerScoreEl.textContent = playerScore;

    // Check if game over
    if (playerScore === 3 || computerScore === 3) {
        gameOver = true;
        if (playerScore === 3) {
            gameEnd = `<br><br><span class="win">🎉Congrats!🎉</span> You won the game!`;
        } else {
            gameEnd = `<br><br><span class="loss">💀You lost!💀</span> Try again!`;
        }
    }

    resultEl.innerHTML = outcome + gameEnd;
}

document.getElementById('water').addEventListener('click', () => playRound('Water'));
document.getElementById('grass').addEventListener('click', () => playRound('Grass'));
document.getElementById('fire').addEventListener('click', () => playRound('Fire'));

document.getElementById('reset-btn').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    resultEl.textContent = '';
});