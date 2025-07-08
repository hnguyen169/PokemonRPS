let playerScore = 0
let computerScore = 0;

const playerScoreEl = document.getElementById('player-score');
const compScoreEl   = document.getElementById('computer-score');
const resultEl = document.getElementById('result');

function getComputerChoice() {
    return ['Water','Grass','Fire'][Math.floor(Math.random()*3)];
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    let outcome;

    // Add shake animation to selected image
    const selectedImg = document.querySelector(`.option-img.${playerChoice.toLowerCase()}`);
    if (selectedImg) {
        selectedImg.classList.remove("shake"); // remove if already applied
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
        outcome = `You win! ${playerChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        outcome = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    // Update display
    resultEl.textContent = outcome;
    playerScoreEl.textContent = playerScore;
    compScoreEl.textContent   = computerScore;
}

document.getElementById('water').addEventListener('click', () => playRound('Water'));
document.getElementById('grass').addEventListener('click', () => playRound('Grass'));
document.getElementById('fire').addEventListener('click', () => playRound('Fire'));