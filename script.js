const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')

const X_CLASS = 'x'
const CIRCL_CLASS = 'circle'
let circleTurn = false
const WINNING_COMBINATION = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]


function startGame() {
    // cellElements.forEach(cell => { cell.addEventListener('click', handleClick, { once: true }) })
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCL_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
startGame()
// restartButton.addEventListener('click', () => location.reload())
restartButton.addEventListener('click', startGame)

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCL_CLASS : X_CLASS

    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O' s" : "X' s"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

const isDraw = () => [...cellElements].every(cell => cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCL_CLASS))
// function isDraw() {
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCL_CLASS)
//     })
// }

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCL_CLASS)
    board.classList.add(circleTurn ? CIRCL_CLASS : X_CLASS)
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

