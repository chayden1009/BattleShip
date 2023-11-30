
// state variables
const playerBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

// cached elements
const playerContainer = document.querySelector('#board1') 
const enemyContainer = document.querySelector('#board2')


// functions

const generateBoards = (playerBoard, enemyBoard) => {
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
            }
        })
    })
}

generateBoards(playerBoard, enemyBoard)