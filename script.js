//finding elements
const cells = document.querySelectorAll(".cell");
const scoreX = document.querySelector("#scoreX");
const scoreO = document.querySelector("#scoreO");
//const draws = document.querySelector("#draws");
const resetBtn = document.querySelector(".resetBtn");
const toastDiv = document.querySelector(".toastDiv");

const playerX = "X";
const playerO = "O";
let playerXScore = 0;
let playerOScore = 0;
//let drawScore = 0;
let currentRound = 1;
let flag = true;
let currentPlayer = playerX;

const winResult = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
}

function cellClicked(e) {
    if (flag) {
        if (e.target.innerHTML === "") {
            e.target.appendChild(addImg(currentPlayer));
            checkWinner();
            checkDraw();
            if (currentPlayer === playerX)
                currentPlayer = playerO;
            else
                currentPlayer = playerX;
        }
    }
}

function addImg(type) {
    const img = document.createElement("img");
    img.src = `img/${type}.png`;
    return img;
}

function checkWinner(){
    for (let i = 0; i < winResult.length; i++) {
        const winner = winResult[i];
        const cell1 = cells[winner[0]];
        const cell2 = cells[winner[1]];
        const cell3 = cells[winner[2]];
        if (cell1.innerHTML !== "" &&
            cell1.innerHTML === cell2.innerHTML &&
            cell1.innerHTML === cell3.innerHTML) {
            toast(`Player ${currentPlayer} wins!`)
            updateScore();
            flag = false;
            currentRound++;
            setTimeout(() => {
                reset();
                toast(`Round ${currentRound}`);
            },2000);
        }
    }
}

function checkDraw() {
    if ([...cells].every((cell) => cell.innerHTML !== "")) {
        toast("It's a Draw!");
        //updateScore();
        flag = false;
        currentRound++;
        setTimeout(() => {
            reset();
            toast(`Round ${currentRound}`);
        }, 2000);
        
    }
}

function toast(msg) {
    toastDiv.classList.add("show");
    toastDiv.textContent = msg;
    setTimeout(() => {
        toastDiv.classList.remove("show");
    }, 1000)
}

function updateScore() {
    if (currentPlayer === playerX) {
        playerXScore++;
        scoreX.textContent = playerXScore;
    }
    else if (currentPlayer === playerO) {
        playerOScore++;
        scoreO.textContent = playerOScore;
    }
    /*else {
        drawScore++;
        draws.textContent = drawScore;
    }*/
}

function reset() {
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });
    flag = true;
}

resetBtn.addEventListener("click", () => {
    flag = false;
    reset();
    currentRound = 1;
    playerXScore = 0;
    playerOScore = 0;
    //drawScore = 0;
    scoreX.textContent = playerXScore;
    scoreO.textContent = playerOScore;
    //draws.textContent = drawScore;
    toast(`game reset!`);
    setTimeout(() => {
        toast(`Round ${currentRound}`);
        flag = true;
    }, 2000);
});