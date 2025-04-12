document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const resetScoreButton = document.getElementById('reset-score');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scores = { X: 0, O: 0 };
    
    // Состояния победы (индексы ячеек)
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
        [0, 4, 8], [2, 4, 6]             // диагонали
    ];
    
    // Инициализация игры
    function initGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusElement.textContent = `Ход крестиков (X)`;
        
        // Очищаем доску
        boardElement.innerHTML = '';
        
        // Создаем ячейки
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
    
    // Обработка клика по ячейке
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // Проверяем, можно ли сделать ход
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Делаем ход
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Проверяем победу
        if (checkWin()) {
            statusElement.textContent = `Победили ${currentPlayer === 'X' ? 'крестики' : 'нолики'} (${currentPlayer})!`;
            gameActive = false;
            
            // Обновляем счет
            scores[currentPlayer]++;
            updateScore();
            
            return;
        }
        
        // Проверяем ничью
        if (!board.includes('')) {
            statusElement.textContent = 'Ничья!';
            gameActive = false;
            return;
        }
        
        // Меняем игрока
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Ход ${currentPlayer === 'X' ? 'крестиков' : 'ноликов'} (${currentPlayer})`;
    }
    
    // Проверка победы
    function checkWin() {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // Подсвечиваем победную комбинацию
                const cells = document.querySelectorAll('.cell');
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                
                return true;
            }
        }
        return false;
    }
    
    // Обновление счета
    function updateScore() {
        scoreXElement.textContent = scores.X;
        scoreOElement.textContent = scores.O;
    }
    
    // Сброс счета
    function resetScore() {
        scores = { X: 0, O: 0 };
        updateScore();
    }
    
    // Назначаем обработчики событий
    restartButton.addEventListener('click', initGame);
    resetScoreButton.addEventListener('click', resetScore);
    
    // Начинаем игру
    initGame();
});