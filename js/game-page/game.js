let Carrier = {
    size: 5,
}

// state variables

const playerBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 0
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const enemyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let turn; // 1 or -1
let winner = null;

// cached elements
const playerContainer = document.querySelector('#board1') 
const enemyContainer = document.querySelector('#board2')   
const messageEl = document.querySelector('#statusMessage')

// event listeners



// functions



const generateBoards = (playerBoard, enemyBoard) => {
    playerContainer.innerHTML = '';
    enemyContainer.innerHTML = '';
    playerBoard.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const board1CellId = `r${rowIdx}c${colIdx}`;
            playerContainer.innerHTML += `<div class="spaces" id=${board1CellId}></div>`
        })
    })
    enemyBoard.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const board2CellId = `r${rowIdx}c${colIdx}`;
            enemyContainer.innerHTML += `<div class="spaces" id=${board2CellId}></div>`;
            const spaceEl = document.querySelector(`#board2 > #${board2CellId}`)
            if(cellVal === 1) {
                spaceEl.innerHTML = '<div class="hit"></div>'
            } else if(cellVal === -1) {
                spaceEl.innerHTML = '<div class="miss"></div>'
            }
        })
    })
}

const renderMessage = () => {}

const playerAttack = (target) => {
    target.innerHTML = '<div class="hit"></div>';
}

const game_start = (turn) => {
    if (turn === 1) {
        enemyContainer.addEventListener('click', (e) => {playerAttack(e.target)})
    }
}


const init = () => {
    turn = 1;
    generateBoards(playerBoard, enemyBoard);
    game_start(turn);
} 



init()
