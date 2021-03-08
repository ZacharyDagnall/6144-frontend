
const boardDiv = document.querySelector('#board')
function makeBoard() {  //create HTML items on document
    for (let i = 0; i < 4; i++) {
        const row = document.createElement('div')
        row.classList.add("row")
        row.setAttribute("row-id", i)
        boardDiv.append(row)
        for (let j = 0; j < 4; j++) {
            let tile = document.createElement('div')
            tile.setAttribute("col-id", j)
            tile.classList.add("tile")
            row.append(tile)
        }
    }
}
function loadBoard(board) {  //render board (new or updated)
    board.forEach((row, i) => {
        let htmlRow = document.querySelector(`[row-id="${i}"]`)
        row.forEach((col, j) => {
            let htmlCol = htmlRow.querySelector(`[col-id="${j}"]`)
            htmlCol.textContent = col
        })
    })
}
const htmlScore = document.querySelector('#actual-score')
function loadScore(score) {
    htmlScore.textContent = score
}

function fetchBoard() {
    fetch(`http://localhost:3000/games/1`)
        .then(r => r.json())
        .then(game => {
            loadBoard(game.board_state)
            loadScore(game.score)
        })
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        swipeUp()
    } else if (event.key === "ArrowDown") {
        swipeDown()
    } else if (event.key === "ArrowLeft") {
        swipeLeft()
    } else if (event.key === "ArrowRight") {
        swipeRight()
    }
})

function swipeUp() {
    console.log("swiped up!")
}
function swipeDown() {
    console.log("swiped down!")
}
function swipeLeft() {
    console.log("swiped left!")
}
function swipeRight() {
    console.log("swiped righ!")
}


makeBoard()
fetchBoard() // blank or most recent