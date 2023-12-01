const boardContainer = document.getElementById('board1');



const generateBoard = (num) => {
    for(let i = 0; i <= num; i++) {
        boardContainer.innerHTML += `<div class="spaces"></div>`
    }

}

generateBoard(100);