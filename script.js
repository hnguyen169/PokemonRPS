let playerScore = 0
let computerScore = 0;
let gameOver = false;

const playerScoreEl = document.getElementById('player-score');
const compScoreEl   = document.getElementById('computer-score');
const resultEl = document.getElementById('result');
const generationSelect = document.getElementById('generation');

function getComputerChoice() {
    return ['Water','Grass','Fire'][Math.floor(Math.random()*3)];
}

function formatType(type) {
    return `<span class="type-${type.toLowerCase()}">${type}</span>`;
}

function playRound(playerChoice, clickedImg) {
    if (gameOver) return;

    const computerChoice = getComputerChoice();
    let outcome = "";
    let gameEnd = "";

    // Shake animation for selected image
    if (clickedImg) {
        clickedImg.classList.remove("shake"); // remove shake if already applied
        void clickedImg.offsetWidth; // force reflow to restart animation
        clickedImg.classList.add("shake");

        setTimeout(() => {
            clickedImg.classList.remove("shake");
        }, 500); // match CSS animation duration
    }

    // Determine outcome
    if (playerChoice === computerChoice) {
        outcome = `It's a tie! You both chose ${formatType(playerChoice)}.`;
    } else if (
        (playerChoice === 'Water' && computerChoice === 'Fire') ||
        (playerChoice === 'Grass' && computerChoice === 'Water') ||
        (playerChoice === 'Fire' && computerChoice === 'Grass')
    ) {
        playerScore++;
        outcome = `<span class="win">You win!</span> ${formatType(playerChoice)} beats ${formatType(computerChoice)}.`;
    } else {
        computerScore++;
        outcome = `<span class="loss">You lose!</span> ${formatType(computerChoice)} beats ${formatType(playerChoice)}.`;
    }

    // Update display
    compScoreEl.textContent   = computerScore;
    playerScoreEl.textContent = playerScore;

    // Check if game over
    if (playerScore === 3 || computerScore === 3) {
        gameOver = true;
        if (playerScore === 3) {
            gameEnd = `<br><br><span class="win">🎉Congrats!🎉</span> You are the Pokémon champion!`;
        } else {
            gameEnd = `<br><br><span class="loss">💀You lost!💀</span> Better luck next time!`;
        }
    }

    resultEl.innerHTML = outcome + gameEnd;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreEl.textContent = '0';
    compScoreEl.textContent = '0';
    resultEl.innerHTML = '';
}

generationSelect.addEventListener('change', () => {
    const selectedGen = generationSelect.value;
    
    document.querySelectorAll('.option.gen1').forEach(el => {
        el.style.display = selectedGen === 'gen1' ? 'flex' : 'none';
    });
    document.querySelectorAll('.option.gen2').forEach(el => {
        el.style.display = selectedGen === 'gen2' ? 'flex' : 'none';
    });
});

document.querySelector('.options').addEventListener('click', (e) => {
    if (e.target.classList.contains('option-img')) {
        const playerChoice = e.target.dataset.type;
        const validTypes = ['Water', 'Grass', 'Fire'];

        if (validTypes.includes(playerChoice)) {
            playRound(playerChoice, e.target);
        }
    }
});

document.getElementById('reset-btn').addEventListener('click', resetGame);