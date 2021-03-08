
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
            if (col === 0) {
                htmlCol.classList.add("blank")
            }
        })
    })
}
const htmlScore = document.querySelector('#actual-score')
function loadScore(score) {
    htmlScore.textContent = score
}

function fetchBoard() {
    fetch(`http://localhost:3000/games/2`)
        .then(r => r.json())
        .then(game => {
            loadBoard(game.board_state)
            loadScore(game.score)
        })
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        event.preventDefault()
        swipeUp()
    } else if (event.key === "ArrowDown") {
        event.preventDefault()
        swipeDown()
    } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        swipeLeft()
    } else if (event.key === "ArrowRight") {
        event.preventDefault()
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
    console.log("swiped right!")
    // find dom board
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            moveRight(i, j)
        }
    }
    // figure out what the new board should be
    // patch (fetch)
    // loadBoard()
}

function moveRight(i, j) {
    if (j !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
        console.log(htmlTile)
        console.log(nextTile)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            // htmlTile.classList.add("blank")
            moveRight(i, j + 1)
        } else {
            //smush
        }
    }
    blankZeroes()
}

function blankZeroes() {
    // tiles = document.querySelectorAll('.tile')
    console.log(tiles)
    tiles.forEach(tile => {
        if (tile.textContent === "0") {
            tile.classList.add("blank")
        }
    })
}

makeBoard()
fetchBoard() // blank or most recent
const tiles = document.querySelectorAll('.tile')