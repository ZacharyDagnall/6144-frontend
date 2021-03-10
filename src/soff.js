
const newNums = ["3", "6"]
let tiles;
let blanks;

function startSoff() {  //create HTML items on document
    gameDiv.innerHTML = `<div id="score">
                        </div>
                        <div id="board">
                        </div>`
    gameDiv.classList.remove("hidden")
    let boardDiv = document.querySelector('#board')
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
    tiles = document.querySelectorAll('.tile')
    let quitButton = document.createElement("button")
    gameDiv.append(quitButton)
    quitButton.id = "quit-button"
    quitButton.textContent = "Quit Game"
    fillScores()
    document.removeEventListener("keydown", handleSoffKey)
    document.addEventListener("keydown", handleSoffKey)
    fetchBoard()
}
function fetchBoard() {
    fetch(`http://localhost:3000//users/${welcome.dataset.id}/nextgame/soff`)
        .then(r => r.json())
        .then(game => {
            gameDiv.dataset.id = game.id
            loadBoard(game.board_state)
            loadScore(game.score)
        })
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
    blankZeroes()
    if (blanks.length === 16) {
        newTile()
        newTile()
    }
}
const htmlScore = document.querySelector('#score')
function loadScore(score) {
    htmlScore.textContent = `Your Current Score: ${score}`
}

function fillScores() {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "This Game's Scores:"
    fetch(`http://localhost:3000/games/soff/leaderboard`)
        .then(r => r.json())
        .then(scores => {
            scores.forEach(score => {
                let li = document.createElement("li")
                li.textContent = score
                scoresList.append(li)
            })
        })
}

function handleSoffKey(event) {
    tiles.forEach(tile => {
        tile.classList.remove("smushed")
        tile.classList.remove("new")
    })
    if (event.key.startsWith("Arrow")) {
        event.preventDefault()
    }
    if (event.key === "ArrowUp") {
        swipeUp()
    } else if (event.key === "ArrowDown") {
        swipeDown()
    } else if (event.key === "ArrowLeft") {
        swipeLeft()
    } else if (event.key === "ArrowRight") {
        swipeRight()
    }
}

function swipeUp() {
    console.log("swiped up!")
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            moveUp(i, j)
        }
    }
    newTile()
    save()
}
function swipeDown() {
    console.log("swiped down!")
    for (let j = 0; j < 4; j++) {
        for (let i = 3; i >= 0; i--) {
            moveDown(i, j)
        }
    }
    newTile()
    save()
}
function swipeLeft() {
    console.log("swiped left!")
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            moveLeft(i, j)
        }
    }
    newTile()
    save()
}
function swipeRight() {
    console.log("swiped right!")
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            moveRight(i, j)
        }
    }
    newTile()
    save()
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
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            loadScore(parseInt(htmlScore.textContent) + score)
            htmlTile.textContent = 0
            moveUp(i - 1, j)
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
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            loadScore(parseInt(htmlScore.textContent) + score)
            htmlTile.textContent = 0
            moveDown(i + 1, j)
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
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            loadScore(parseInt(htmlScore.textContent) + score)
            htmlTile.textContent = 0
            moveLeft(i, j - 1)
        }
    }
    blankZeroes()
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
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            loadScore(parseInt(htmlScore.textContent) + score)
            htmlTile.textContent = 0
            moveRight(i, j + 1)
        }
    }
    blankZeroes()
}

function blankZeroes() {
    tiles.forEach(tile => {
        if (tile.textContent === "0") {
            tile.classList.add("blank")
        }
    })
    blanks = document.querySelectorAll('.blank')
}

function newTile() {
    if (blanks.length !== 0) {
        let randBlank = blanks[Math.floor(blanks.length * Math.random())]
        randBlank.textContent = newNums[Math.floor(newNums.length * Math.random())]
        randBlank.classList.remove("blank")
        randBlank.classList.add("new")
    }
    blankZeroes()
}

function save(game_over = checkGameOver()) {
    let id = gameDiv.dataset.id
    let board = [[], [], [], []]
    tiles.forEach(tile => {
        let i = tile.parentNode.getAttribute('row-id')
        let j = tile.getAttribute('col-id')
        board[i][j] = tile.textContent
    })

    fetch(`http://localhost:3000/games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ board_state: board, score: parseInt(htmlScore.textContent), game_over })
    })
        .then(r => r.json())
        .then(console.log)
    //don't need to do anything with saved board because we already updated the dom optimistically
}

function checkGameOver() {
    if (blanks.length === 0 && noNeighbors()) {
        alert("Game Over!")
        return true
    } else {
        return false
    }
}

function noNeighbors() {
    tiles.forEach(tile => {
        let i = parseInt(tile.parentNode.getAttribute('row-id'))
        let j = parseInt(tile.getAttribute('col-id'))
        // odd row, then even colum, or even row and odd column // also - not blank!!
        if ((i % 2 == 1 && j % 2 == 0) || (i % 2 == 0 && j % 2 == 1) && !tile.classList.contains("blank")) {
            if (i >= 1) {
                let upNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)
                if (tile.textContent === upNeighbor.textContent) {
                    return false
                }
            }
            if (i <= 2) {
                let downNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
                if (tile.textContent === downNeighbor.textContent) {
                    return false
                }
            }
            if (j >= 1) {
                let leftNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)
                if (tile.textContent === leftNeighbor.textContent) {
                    return false
                }
            }
            if (j <= 2) {
                let rightNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
                if (tile.textContent === rightNeighbor.textContent) {
                    return false
                }
            }
        }
    })
    return true
}
