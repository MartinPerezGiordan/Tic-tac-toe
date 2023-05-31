document.addEventListener('DOMContentLoaded', function() {



const htmlBoard = document.querySelector('.gameboard')
const restartBtn = document.querySelector('.restart-btn')
const msg = document.querySelector('.end-message')
let gameOn = true;
const pOneInput = document.querySelector('#pOneName')
const pTwoInput = document.querySelector('#pTwoName')


let turn = 1


const playerFactory = (name, marker, turn)=>{
    return {name, marker, turn}
}

let playerOne = playerFactory('Player One', 'X', true);
let playerTwo = playerFactory('Player Two', 'O', false);

const gameboard = (()=>{
    let board = ['','','','','','','','',''];



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

    restartBtn.addEventListener('click',restart)
    function restart(){
        board = ['','','','','','','','',''];
        renderBoard();
        gameFlow.addMark();
        msg.innerHTML=''
        gameOn=true
        playerOne.name = pOneInput.value
        playerTwo.name = pTwoInput.value
        pOneInput.style.display = 'none';
        pTwoInput.style.display = 'none';

    }
    
    const changeCellValue = (id, marker)=>{
        let i = Number(id.substring(4));
        board[i] = marker 
        console.log(board)
        renderBoard();
    }  

    const getBoard = ()=>board
    
    return{createBoard, changeCellValue, getBoard}
})();
gameboard.createBoard();









const gameFlow = (()=>{
    let activePlayer = {}
    const addMark = ()=>{
        const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.addEventListener('click',()=>{
                        if(playerOne.turn){
                            activePlayer = playerOne

                        }else{
                            activePlayer = playerTwo
                        }
                        if(gameOn){
                            gameboard.changeCellValue(cell.id, activePlayer.marker)
                            checkWin(activePlayer)
                            playerOne.turn=!playerOne.turn;
                        }
                        return
                }, {once:true})
            });
        
    }

    const checkWin = (player)=>{
        let marker = player.marker
        let name = player.name

        let board = gameboard.getBoard()
        console.log(name)
        
        if(board[0]===marker && board[1]===marker && board[2]===marker ||
            board[3]===marker && board[4]===marker && board[5]===marker ||
            board[6]===marker && board[7]===marker && board[8]===marker ||
            board[0]===marker && board[3]===marker && board[6]===marker ||
            board[1]===marker && board[4]===marker && board[7]===marker ||
            board[2]===marker && board[5]===marker && board[8]===marker ||
            board[0]===marker && board[4]===marker && board[8]===marker ||
            board[2]===marker && board[4]===marker && board[6]===marker
            ){
                msg.innerHTML = player.name + ' wins!!!'
                gameOn=false
                console.log(gameOn)
                pOneInput.style.display = 'block';
                pTwoInput.style.display = 'block';
            }

        else if(board[0]!==''&&
            board[1]!==''&&
            board[2]!==''&&
            board[3]!==''&&
            board[4]!==''&&
            board[5]!==''&&
            board[6]!==''&&
            board[7]!==''&&
            board[8]!==''){
            msg.innerHTML ='It`s a tie'
            gameOn=false
            pOneInput.style.display = 'block';
            pTwoInput.style.display = 'block';
            
        }
        

    }



    return{addMark}
})()




});