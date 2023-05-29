document.addEventListener('DOMContentLoaded', function() {



const htmlBoard = document.querySelector('.gameboard')
let turn = 0


const gameboard = (()=>{
    let board = ['','','','','','','','O','O'];

    const createBoard = ()=>{
        for(i=0;i<board.length;i++){
            const cell = document.createElement('div');
            cell.innerHTML = board[i];
            cell.classList.add('cell');
            cell.id = 'cell' + i ;
            htmlBoard.appendChild(cell);
        }
    }

    const renderBoard = ()=>{
        for(i=0;i<board.length;i++){
            let cell = document.querySelector(`#cell${i}`)
            cell.innerHTML = board[i];
        }
    }

    const changeCellValue = (id, marker)=>{
        let i = Number(id.substring(4));
        board[i] = marker 
        console.log(board)
        renderBoard();
    }

    return{createBoard, changeCellValue}
})();
gameboard.createBoard();


const playerFactory = (name, marker, status)=>{
    const addMark = ()=>{
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click',()=>{
                gameboard.changeCellValue(cell.id, marker)
            })
        });
    }
    return {name, marker, status, addMark}
}

const playerOne = playerFactory('Player One', 'X');
const playerTwo = playerFactory('Player Two', 'O');
playerOne.addMark()

});