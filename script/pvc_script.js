let score = {
    playerScore : 0,
    computerScore : 0,
    ties : 0,
}

let round = {
    round : 1
}

const prevResult = JSON.parse(localStorage.getItem('matchHistoryDisplay')) || [];
const navigationContainer = document.querySelector('.prev-result');

// HANDS
const playerMoveResult = document.querySelector('.player');
const computerMoveResult = document.querySelector('.computer');

let convertToJson = JSON.parse(localStorage.getItem('convertToString')) || score;
let roundToJson = JSON.parse(localStorage.getItem('roundString')) || round;
const savedHistory = JSON.parse(localStorage.getItem('matchHistoryDisplay')) || [];



document.getElementById('player-score').innerHTML = `${convertToJson.playerScore}`;
document.getElementById('computer-score').innerHTML = `${convertToJson.computerScore}`;
document.getElementById('round').innerHTML = `ROUND ${roundToJson.round}`;
savedHistory.forEach(item => {
    navigationContainer.insertAdjacentHTML("afterbegin", item);
});



// RANDOMIZED NUMBER TO DECIDE EITHER ROCK, PAPER, OR SCISSORS
const randomComputerSelection = () => {
    let computerMove = Math.random();
    let container = "";

    if (computerMove >= 0 && computerMove < 1/3){
        container = "rock";
    } else if (computerMove >= 1/3 && computerMove < 2/3){
        container = "paper";
    } else if (computerMove >= 2/3 && computerMove < 1){
        container = "scissors";
    }

    console.log(computerMove);

    return container;
}

// PLAYER SELECT ROCK, PAPER, OR SCISSORS AND COMPARE IT TO THE COMPUTER
const userSelection = (playerMove) => {
    const computerMove = randomComputerSelection();

    document.getElementById('track3').play();

    let result = "";

    playerMoveResult.innerHTML =`<img class="animate-bounce" src="../images/player/${playerMove}-emoji.png" width="250" height="250">
                                    <p class="You font-bold justify-end text-center rounded-md bg-[#003049] py-1">You</p>`;
    computerMoveResult.innerHTML = `<img class="animate-bounce" src="../images/computer/${computerMove}-emoji.png" width="250" height="250">
                                    <p class="Computer font-bold text-center rounded-md bg-[#003049] py-1">Computer</p>`;

                                    
    const winnerHistory =  `<!-- WINNER RESULT -->
                            <li class="p-2 rounded-md bg-[#078c00]">
                                <div class="block flex flex-col-3">
                                    <div class="prev-you w-1/3">
                                        <img src="../images/player/${playerMove}-emoji.png" width="50px" height="40px" alt="">
                                        <p class="text-xs text-center pt-1 font-bold">You</p>
                                    </div>
                                    
                                    <div class="vs-result w-1/3 flex flex-col justify-center items-center h-full sm:w-full">
                                        <p class="mt-1 text-sm">ROUND ${roundToJson.round}</p>
                                        <p class="text-sm">vs</p>
                                        <p class="text-center">WIN</p>
                                    </div>
                                    
                                    <div class="prev-comp w-1/3">
                                        <img src="../images/computer/${computerMove}-emoji.png" width="50px" height="40px" alt="">
                                        <p class="text-xs text-center -ml-2">Computer</p>
                                    </div>
                                </div>
                            </li>`;

    const loserHistory = `
                        <!-- LOSER RESULT -->
                        <li class="p-2 rounded-md bg-[#e00202]">
                            <div class="block flex flex-col-3">
                                <div class="prev-you w-1/3">
                                    <img src="../images/player/${playerMove}-emoji.png" width="50px" height="40px" alt="">
                                    <p class="text-xs text-center pt-1 font-bold">You</p>
                                </div>
                                
                                <div class="vs-result w-1/3 flex flex-col justify-center items-center h-full sm:w-full">
                                    <p class="mt-1 text-sm">ROUND ${roundToJson.round}</p>
                                    <p class="text-sm">vs</p>
                                    <p class="text-center">LOSE</p>
                                </div>
                                
                                <div class="prev-comp w-1/3">
                                    <img src="../images/computer/${computerMove}-emoji.png" width="50px" height="40px" alt="">
                                    <p class="text-xs text-center -ml-2">Computer</p>
                                </div>
                            </div>
                        </li>`;


    const tieHistory = `
                        <!-- TIE RESULT -->
                        <li class="p-2 rounded-md bg-[#015d8c]">
                            <div class="block flex flex-col-3">
                                <div class="prev-you w-1/3">
                                    <img src="../images/player/${playerMove}-emoji.png" width="50px" height="40px" alt="">
                                    <p class="text-xs text-center pt-1 font-bold">You</p>
                                </div>
                                
                                <div class="vs-result w-1/3 flex flex-col justify-center items-center h-full sm:w-full">
                                    <p class="mt-1 text-sm">ROUND ${roundToJson.round}</p>
                                    <p class="text-sm">vs</p>
                                    <p class="text-center">TIE</p>
                                </div>
                                
                                <div class="prev-comp w-1/3">
                                    <img src="../images/computer/${computerMove}-emoji.png" width="50px" height="40px" alt="">
                                    <p class="text-xs text-center -ml-2">Computer</p>
                                </div>
                            </div>
                        </li>`;

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = "It's a tie";
            prevResult.push(tieHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", tieHistory);
        } else if (computerMove === "paper") {
            result = "You lose";
            prevResult.push(loserHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", loserHistory);
        } else if (computerMove === "scissors") {
            result = "You win";
            prevResult.push(winnerHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", winnerHistory);
        }

        highlightWinner(result);
    }

    if (playerMove === 'paper'){
        if (computerMove === 'rock'){
            result = "You win";
            prevResult.push(winnerHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", winnerHistory);
        } else if (computerMove === "paper"){
            result = "It's a tie";
            prevResult.push(tieHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", tieHistory);
        } else if (computerMove === "scissors"){
            result = "You lose";
            prevResult.push(loserHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", loserHistory);
        }

        highlightWinner(result);
    }

    if (playerMove === 'scissors'){
        if (computerMove === 'rock'){
            result = "You lose";
            prevResult.push(loserHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", loserHistory);
        } else if (computerMove === "paper"){
            result = "You win";
            prevResult.push(winnerHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", winnerHistory);
        } else if (computerMove === "scissors"){
            result = "It's a tie";
            prevResult.push(tieHistory);
            navigationContainer.insertAdjacentHTML("afterbegin", tieHistory);
        }

        highlightWinner(result);
    }

    localStorage.setItem('matchHistoryDisplay', JSON.stringify(prevResult));
}






// WINNER GETS INCREMENT
// COLOR THE TEXT (GREEN FOR WINNER AND RED FOR LOSER)
const highlightWinner = (result) => {
    const youHighlight = document.querySelector('.You');
    const computerHighlight = document.querySelector('.Computer');

    const playerScoreElement = document.querySelector('#player-score');
    const computerScoreElement = document.querySelector('#computer-score');
    const writtenResult = document.querySelector('#written-result');

    if (result === 'You win'){
        convertToJson.playerScore += 1;
        roundToJson.round += 1;
        playerScoreElement.innerText = convertToJson.playerScore;
        document.getElementById('round').innerHTML = `ROUND ${roundToJson.round}`;

        youHighlight.classList.add('winner');
        computerHighlight.classList.add('loser');

        youHighlight.classList.remove('loser');
        computerHighlight.classList.remove('winner');

        writtenResult.innerHTML = `WIN`;
        writtenResult.classList.add('winner');
        writtenResult.classList.remove('loser');
        writtenResult.classList.remove('tie');

    } else if (result === 'You lose'){
        convertToJson.computerScore += 1;
        roundToJson.round += 1;
        computerScoreElement.innerText = convertToJson.computerScore;
        document.getElementById('round').innerHTML = `ROUND ${roundToJson.round}`;

        computerHighlight.classList.add('winner');
        youHighlight.classList.add('loser');

        computerHighlight.classList.remove('loser');
        youHighlight.classList.remove('winner');

        writtenResult.innerHTML = `LOSE`;
        writtenResult.classList.add('loser');
        writtenResult.classList.remove('winner');
        writtenResult.classList.remove('tie');


    } else if (result === "It's a tie"){
        convertToJson.ties += 1;
        roundToJson.round += 1;
        document.getElementById('round').innerHTML = `ROUND ${roundToJson.round}`;

        writtenResult.innerHTML = `TIE`;
        writtenResult.classList.add('tie');

        writtenResult.classList.remove('winner');
        writtenResult.classList.remove('loser');

        youHighlight.classList.remove('winner');
        youHighlight.classList.remove('loser');

        computerHighlight.classList.remove('winner');
        computerHighlight.classList.remove('loser');
    }

    localStorage.setItem('convertToString', JSON.stringify(convertToJson));
    localStorage.setItem('roundString', JSON.stringify(roundToJson));
    

    return result;
}



// RESET THE SCORES BACK TO ZERO
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
    convertToJson = score = {
        playerScore : 0,
        computerScore : 0,
        ties : 0
    }

    roundToJson = round = {
        round : 1
    }

    // SCORES
    document.querySelector('#player-score').innerHTML = `${convertToJson.playerScore}`;
    document.querySelector('#computer-score').innerHTML = `${convertToJson.computerScore}`;
    document.querySelector('#round').innerHTML = `ROUND ${roundToJson.round}`;
    document.querySelector('#written-result').innerHTML = '';
    navigationContainer.innerHTML = "";

    prevResult.length = 0;

    // HANDS
    playerMoveResult.innerHTML =`<img class="player-img animate-bounce" src="../images/player/rock-emoji.png" width="250" height="250">
                                    <p class="You font-bold justify-end text-center rounded-md bg-[#003049] py-1">You</p>`;
    computerMoveResult.innerHTML = `<img class="computer-img animate-bounce" src="../images/computer/rock-emoji.png" width="250" height="250">
                                    <p class="Computer font-bold text-center rounded-md bg-[#003049] py-1">Computer</p>`;

    localStorage.removeItem('convertToString');
    localStorage.removeItem('roundString');
    localStorage.removeItem('matchHistoryDisplay');


})






























// ASK USER TO CONFIRM LEAVING
const exitGame = document.querySelector('#exitGame');

exitGame.addEventListener('click', () => {
    const exit = confirm(`You are leaving the game, scores will get back to 0.
Do you want to quit?`);

    if (exit === true){
        window.location.href = "../index.html";

        localStorage.removeItem('convertToString');
        localStorage.removeItem('roundString');
        
    } else {
        return;
    }
})







