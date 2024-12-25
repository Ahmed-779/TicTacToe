let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

document.querySelectorAll('td').forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

function makeMove(index) {
    if (board[index] === '' && !isWinner(board, currentPlayer) && !isWinner(board, otherPlayer())) {
        board[index] = currentPlayer;
        const cell = document.querySelectorAll('td')[index];
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer);
        
        if (isWinner(board, currentPlayer)) {
            announceWinner(currentPlayer);
        } else if (board.every(cell => cell !== '')) {
            announceDraw();
        } else {
            currentPlayer = otherPlayer();
        }
    }
}

function otherPlayer() {
    return currentPlayer === 'X' ? 'O' : 'X';
}

function announceWinner(player) {
    const playerName = document.getElementById('player' + player).value || player;
    showModal(playerName + " wins!");
}

function announceDraw() {
    showModal("It's a draw!");
}

function showModal(text) {
    const modal = document.getElementById("modal");
    document.getElementById("announcement").innerText = text;
    modal.style.display = "flex";

    // When the user clicks on <span> (x), close the modal
    document.getElementById("close").onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.querySelectorAll('td').forEach(cell => {
        cell.innerText = '';
        cell.className = '';
    });

    // Close modal if it's open
    document.getElementById("modal").style.display = "none";
}

function isWinner(board, player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => pattern.every(idx => board[idx] === player));
}

// Link reset button to resetBoard function
document.getElementById("reset").addEventListener('click', resetBoard);

