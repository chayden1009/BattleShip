// cached elements
const playerContainer = document.querySelector('#board1') 
const enemyContainer = document.querySelector('#board2')   
const messageEl = document.querySelector('#statusMessage')
const buttonEl = document.querySelector('button')

// state variables


class Player {
    constructor(turnId){
        this.board = [
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


const player1 = new Player(1);
const player2 = new CPU(-1);


let winner = null;
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
                
            } else if (enemy[targetRow][targetCol] === 1) {
                enemy[targetRow][targetCol] = -1;
                document.querySelector(`#board2 > #r${targetRow}c${targetCol}`).innerHTML = '<div class="hit"></div>';
            }
            
        getWinner(player1.board, enemy);
        }, {once: true})  
    }, {once: true})
}

const cpuAttack = (enemy) => {
    enemy = player1.board;
    buttonEl.style.visibility = 'hidden';
    
    let targetRow = Math.floor(Math.random() * 9) + 1;
    let targetCol = Math.floor(Math.random() * 9) + 1;
    let targetCell = document.querySelector(`#board1 > #r${targetRow}c${targetCol}`);

    if (enemy[targetRow][targetCol] === 0) {
        messageEl.innerText = 'MISS';
        targetCell.innerHTML = '<div class="miss"></div>';
    } else if (enemy[targetRow][targetCol] === 1) {
        enemy[targetRow][targetCell] = -1;
        targetCell.style.background = 'red';
    } 
    getWinner(player2, enemy);
}

const cpuRandShip = (shipLength) => {
    let orientation = 1;
    let targetRow = Math.floor(Math.random() * 9) + 1;
    let targetCol = Math.floor(Math.random() * 9) + 1;
    let target = player2.board[targetRow][targetCol];

    if (player2.board[targetRow][targetCol] !== 0) {
        cpuRandShip();
    }

    if (orientation === 1 && targetCol <= 5) {
        for (let i = 0; i < shipLength; i++) {
            target = 1;
            targetCol += 1;
        }
    } else if (orientation === 1 && targetCol >= 5) {
        for (let i = 0; i < shipLength; i++) {
            target = 1;
            targetCol -= 1;
        }
    } 
}

const gameWon = () => {
    if (winner === 1) {
        messageEl.innerText = 'Player Wins!'
    } else if (winner === -1) {
        messageEl.innerText = 'Computer Wins!'
    }

    buttonEl.innerText = 'PLAY AGAIN'
    buttonEl.addEventListener('click', function(){
        init();
    }, {once: true})
}

const getWinner = (player, enemyBoard) => {
    if (!enemyBoard.some(row => row.includes(1)) && enemyBoard.some(row => row.includes(-1))) {
        winner = player.turnId;
        gameWon();
    } else gameStart();
}

const generateBoards = (playerBoard, enemyBoard) => {
    playerContainer.innerHTML = '';
    enemyContainer.innerHTML = '';
    playerBoard.forEach((rowArr, rowIdx) => {
        rowArr.forEach((cellVal, colIdx) => {
            const board1CellId = `r${rowIdx}c${colIdx}`;
            playerContainer.innerHTML += `<div class="spaces" id=${board1CellId}></div>`;
            if (playerBoard[rowIdx][colIdx] === 1) {
                document.getElementById(`r${rowIdx}c${colIdx}`).style.background = '#09c900'
            } 
            
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
    cpuRandShip(5);
    cpuRandShip(4);
    cpuRandShip(3);
    cpuRandShip(3);
    cpuRandShip(2);
    
    buttonEl.addEventListener('click', gameStart, {once: true})
}

const gameStart = () => {
    document.querySelector('nav').style.visibility = 'hidden';
    buttonEl.style.visibility = 'hidden';

    turn = turn === -1 ? 1: -1;
    
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
    player1.board = [
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //row 0
        [0, 1, 0, 1, 1, 1, 0, 0, 0, 0], //row 1
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //row 2
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    generateBoards(player1.board, player2.board);
    gamePrep();
} 



init()
