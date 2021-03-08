
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
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            moveUp(i, j)
        }
    }
    saveBoard()
}
function swipeDown() {
    console.log("swiped down!")
    for (let j = 0; j < 4; j++) {
        for (let i = 3; i >= 0; i--) {
            moveDown(i, j)
        }
    }
    saveBoard()
}
function swipeLeft() {
    console.log("swiped left!")
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            moveLeft(i, j)
        }
    }
    saveBoard()
}
function swipeRight() {
    console.log("swiped right!")
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            moveRight(i, j)
        }
    }
    saveBoard()
}

function moveRight(i, j) {
    if (j !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveRight(i, j + 1)
        } else {
            //smush
        }
    }
    blankZeroes()
}

function moveLeft(i, j) {
    if (j !== 0) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveLeft(i, j - 1)
        } else {
            //smush
        }
    }
    blankZeroes()
}

function moveDown(i, j) {
    if (i !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveDown(i + 1, j)
        } else {
            //smush
        }
    }
    blankZeroes()
}

function moveUp(i, j) {
    if (i !== 0) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveUp(i - 1, j)
        } else {
            //smush
        }
    }
    blankZeroes()
}

function blankZeroes() {
    console.log(tiles)
    tiles.forEach(tile => {
        if (tile.textContent === "0") {
            tile.classList.add("blank")
        }
    })
}

function saveBoard() {
    // make a [[]]
    let board = [[], [], [], []]
    tiles.forEach(tile => {
        let i = tile.parentNode.getAttribute('row-id')
        let j = tile.getAttribute('col-id')
        board[i][j] = tile.textContent
    })
    fetch(`http://localhost:3000/games/2`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ 'board_state': board })
    })
        .then(r => r.json())
    //don't need to do anything with saved board because we already updated the dom optimistically
}


makeBoard()
fetchBoard() // blank or most recent
const tiles = document.querySelectorAll('.tile')