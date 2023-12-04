// cached elements
const playerContainer = document.querySelector('#board1') 
const enemyContainer = document.querySelector('#board2')   
const messageEl = document.querySelector('#statusMessage')
const buttonEl = document.querySelector('button')


class Player {
    constructor(turnId, enemyBoard){
        this.board = [
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], //row 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 1
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0], //row 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        this.turnId = turnId;
        }
    
}

class CPU extends Player {
    constructor(turnId, board) {
        super(board);
        this.turnId = turnId;
    }
}

// state variables

const player1 = new Player(1);
const player2 = new CPU(-1);


let winner;
let turn; // 1 or -1



// event listeners



// functions

const playerAttack = (enemy) => {
    messageEl.innerText = 'SELECT A TARGET';
    buttonEl.style.visibility = 'hidden';
    enemyContainer.addEventListener('click', function(e){
        messageEl.innerText = 'FIRE WHEN READY'
        buttonEl.style.visibility = 'visible';
        buttonEl.innerText = 'FIRE'
        
        let target = e.target;
        target.innerHTML = '<div class="miss"></div>';
        
        buttonEl.addEventListener('click', function(e){
            const targetRow = target.id[1];
            const targetCol = target.id[3];
            
            if (enemy[targetRow][targetCol] === 0) {
                document.querySelector(`#board2 > #r${targetRow}c${targetCol}`).innerHTML = '<div class="miss"></div>';
                messageEl.innerText = 'MISS';
                
            } else if (enemy[targetRow][targetCol] === 1) {
                document.querySelector(`#board2 > #r${targetRow}c${targetCol}`).innerHTML = '<div class="hit"></div>';
                messageEl.innerText = 'HIT';
            }
            gameStart();
        }, {once: true})  
    }, {once: true})
}

const cpuAttack = (enemy) => {
    enemy = player1.board;
    buttonEl.style.visibility = 'hidden';
    
    let targetRow = Math.floor(Math.random() * 9) + 1;
    let targetCol = Math.floor(Math.random() * 9) + 1;
    let targetCell = document.querySelector(`#board1 > #r${targetRow}c${targetCol}`);

    if (enemy[targetRow][targetCol] === 0 && turn === -1) {
        messageEl.innerText = 'MISS';
        targetCell.innerHTML = '<div class="miss"></div>';
    } else if (enemy[targetRow][targetCol] === 1 && turn === -1) {
        targetCell.style.background = 'red';
        enemy[targetRow][targetCell] = -1;
        console.log(enemy[targetRow][targetCol])
    } 
    gameStart();
}

const getWinner = (playerBoard, enemyBoard) => {

}

const generateBoards = (playerBoard, enemyBoard) => {
    playerContainer.innerHTML = '';
    enemyContainer.innerHTML = '';
    playerBoard.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const board1CellId = `r${rowIdx}c${colIdx}`;
            const board1Cell = document.querySelector(`#${board1CellId}`);
            playerContainer.innerHTML += `<div class="spaces" id=${board1CellId}></div>`
            
        })
    })
    enemyBoard.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const board2CellId = `r${rowIdx}c${colIdx}`;
            enemyContainer.innerHTML += `<div class="spaces" id=${board2CellId}></div>`;
        })
    })
}

const gamePrep = () => {
    messageEl.innerText = "ASSEMBLE YOUR FLEET";
    buttonEl.innerText = "READY";
    player1.board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const board1El = document.getElementById(`r${rowIdx}c${colIdx}`);
            if (cellVal === 1) {
                board1El.style.background = '#09c900';
            }
        })
    })
    buttonEl.addEventListener('click', gameStart, {once: true})
}

const gameStart = () => {
    turn = turn === -1 ? 1: -1;
    console.log(turn);
    if (!player1.board.includes(1)) {
        winner = -1;
    } else if (!player2.includes(-1)) {
        console.log('Player 1 wins!')
        winner = 1;
    }

    if (turn === 1) {
        messageEl.innerHTML = 'SELECT A TARGET';
        playerAttack(player2.board);
    
    } else if (turn === -1) {
        messageEl.innerHTML = 'ENEMY ATTACKING';
        setTimeout(cpuAttack, 3000);
    } 
}


const init = () => {
    turn = -1;
    winner = null;

    generateBoards(player1.board, player2.board);
    gamePrep();
} 



init()
