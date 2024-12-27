const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

let currentPlayer = 'white'; // Turno actual: 'white' o 'black'
let selectedPiece = null;
let selectedSquare = null;
let chessBoard = [];

// Mapear piezas a sus símbolos Unicode
const piecesSymbols = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟', // Negras
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'  // Blancas
};

// Configuración inicial del tablero
const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// Inicializar el tablero
function initializeBoard() {
  chessBoard = JSON.parse(JSON.stringify(initialBoard));
  boardElement.innerHTML = '';

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement('div');
      square.dataset.row = i;
      square.dataset.col = j;
      square.classList.add((i + j) % 2 === 0 ? 'light' : 'dark');
      square.addEventListener('click', () => handleSquareClick(i, j, square));
      boardElement.appendChild(square);
      updateSquareDisplay(square, chessBoard[i][j]);
    }
  }
}

// Actualizar visualmente una casilla
function updateSquareDisplay(square, piece) {
  square.textContent = piece ? piecesSymbols[piece] : '';
}

// Manejar clic en una casilla
function handleSquareClick(row, col, square) {
  const piece = chessBoard[row][col];

  if (selectedPiece === null) {
    if (piece && isCurrentPlayerPiece(piece)) {
      selectedPiece = piece;
      selectedSquare = { row, col, square };
      square.classList.add('selected');
    }
  } else {
    if (movePiece(row, col)) {
      switchPlayer();
      checkGameState();
    }
    clearSelection();
  }
}

// Mover pieza si es un movimiento válido
function movePiece(row, col) {
  if (isLegalMove(selectedSquare.row, selectedSquare.col, row, col, selectedPiece)) {
    chessBoard[row][col] = selectedPiece;
    chessBoard[selectedSquare.row][selectedSquare.col] = null;
    updateSquareDisplay(selectedSquare.square, null);
    updateSquareDisplay(boardElement.children[row * 8 + col], selectedPiece);
    return true;
  }
  return false;
}

// Verificar si el movimiento es legal (simplificado)
function isLegalMove(startRow, startCol, endRow, endCol, piece) {
  // Aquí puedes expandir las reglas de cada pieza
  const isSameColor = chessBoard[endRow][endCol] && isCurrentPlayerPiece(chessBoard[endRow][endCol]);
  return !isSameColor;
}

// Cambiar turno
function switchPlayer() {
  currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
}

// Verificar estado del juego
function checkGameState() {
  // Detección de jaque, jaque mate o rey ahogado (simplificado)
  displayMessage('orange', 'Jaque'); // Ejemplo temporal
}

// Mostrar mensaje
function displayMessage(color, text) {
  messageElement.textContent = text;
  messageElement.className = '';
  messageElement.classList.add(color);
  messageElement.style.display = 'block';
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 3000);
}

// Comprobar si la pieza pertenece al jugador actual
function isCurrentPlayerPiece(piece) {
  return (currentPlayer === 'white' && piece === piece.toUpperCase()) || (currentPlayer === 'black' && piece === piece.toLowerCase());
}

// Limpiar selección
function clearSelection() {
  if (selectedSquare) selectedSquare.square.classList.remove('selected');
  selectedPiece = null;
  selectedSquare = null;
}

// Inicializar el juego
initializeBoard();
