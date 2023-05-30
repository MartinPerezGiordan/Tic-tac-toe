document.addEventListener('DOMContentLoaded', function() {



const htmlBoard = document.querySelector('.gameboard')
let turn = 1


const gameboard = (()=>{
    let board = ['','','O','','','','','O','O'];

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


const playerFactory = (name, marker, turn)=>{
    return {name, marker, turn}
}

let playerOne = playerFactory('Player One', 'X', true);
let playerTwo = playerFactory('Player Two', 'O', false);




const gameFlow = (()=>{
    let activePlayer = {}
    const addMark = ()=>{
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click',()=>{
                    if(playerOne.turn){
                        activePlayer.marker = playerOne.marker
                    }else{
                        activePlayer.marker = playerTwo.marker
                    }
                    gameboard.changeCellValue(cell.id, activePlayer.marker)
                    playerOne.turn=!playerOne.turn;
                    return
            })
        });
    }
    return{addMark}
})()

gameFlow.addMark();




});