const player = (playernum, symbol) => {
    return {playernum, symbol};
}

const gameboard = (() => {

    let squares = Array(9).fill('');

    const gameboard = document.querySelector('.gameboard');

    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = i;
        square.style.backgroundColor = 'red';
        square.addEventListener('click', clicked, {once: true});
        gameboard.appendChild(square);
    }

    function clicked() {
        if (!startgame.winner){
            this.textContent = startgame.currPlayer.symbol;
            squares[this.id] = startgame.currPlayer.playernum;
            startgame.check();
            startgame.switchPlayer();
            console.log(squares);
        };
    }

    const resetButton = document.querySelector('#reset-button');

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    function resetGame() {
        document.querySelectorAll('.square').forEach((square) => {
            squares[square.id] = '';
            square.textContent = '';
            square.removeEventListener('click', clicked);
            square.addEventListener('click', clicked, {once: true});
        });

        const result = document.querySelector('.results');
        result.textContent = '';

        startgame.currPlayer = startgame.player1;
        console.log(squares);

        startgame.winner = false;
    }

    return {
        squares
    };
})();

const startgame = (() => {

    const player1 = player(1, 'X');
    const player2 = player(2, 'O');

    let currPlayer = player1;
    let winner = false;

    winningsets = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6], 
        [2, 5, 8],
        [3, 4, 5], 
        [6, 7, 8]
    ];

    function switchPlayer() {
        if (winner === false) {
            if (this.currPlayer === player1) {
                this.currPlayer = player2;
            }
            else {
                this.currPlayer = player1;
            }
        }
    }

    function check() {
        winningsets.forEach((index) => {
            if (winner === false) {
                if (gameboard.squares[index[0]] === this.currPlayer.playernum && gameboard.squares[index[1]] === this.currPlayer.playernum && gameboard.squares[index[2]] === this.currPlayer.playernum) {
                    const result = document.querySelector('.results');
                    result.textContent = 'Player ' + this.currPlayer.playernum + ' wins!!!';
                    this.winner = true;
                }
            }
        })
    }

    return{
        player1,
        player2,
        currPlayer,
        switchPlayer,
        check, 
        winner
    }
})();

