


const newBugSOFFNums = ["3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6", "3", "6"]
const bugs = [String.fromCodePoint(128027), String.fromCodePoint(128028), String.fromCodePoint(128029), String.fromCodePoint(128030), String.fromCodePoint(129439), String.fromCodePoint(129410), String.fromCodePoint(128375), String.fromCodePoint(128375), String.fromCodePoint(128375), String.fromCodePoint(128012), String.fromCodePoint(129431)]
let numsNBugs = []
numsNBugs.push.apply(numsNBugs, bugs)
numsNBugs.push.apply(numsNBugs, newBugSOFFNums)
numsNBugs.push.apply(numsNBugs, newBugSOFFNums)

function startBugSOFF() {  //create HTML items on document
    gameDiv.innerHTML = `<div id="score"> Your Current Score:
                                <div id="actual score"></div>
                        </div>
                        <div id="board">
                        </div>`
    gameDiv.classList.remove("hidden")
    gameDiv.setAttribute('mirror-mode', "off")
    let buttons = document.querySelector("#game-buttons")
    buttons.classList.add("hidden")
    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.add("hidden")
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
    quitButton.removeEventListener("click", handleQuitBugSOFF)
    quitButton.addEventListener("click", handleQuitBugSOFF)
    fillScoresBugSOFF()
    document.removeEventListener("keydown", handleBugSOFFKey)
    document.addEventListener("keydown", handleBugSOFFKey)
    fetchBoardBugSOFF()
}
function fetchBoardBugSOFF() {
    fetch(`http://localhost:3000//users/${welcome.dataset.id}/nextgame/6144BugMode`)
        .then(r => r.json())
        .then(game => {
            gameDiv.dataset.id = game.id
            loadBoardBugSOFF(game.board_state)
            loadScoreBugSOFF(game.score)
        })
}
function loadBoardBugSOFF(board) {  //render board (new or updated)
    board.forEach((row, i) => {
        let htmlRow = document.querySelector(`[row-id="${i}"]`)
        row.forEach((col, j) => {
            let htmlCol = htmlRow.querySelector(`[col-id="${j}"]`)
            htmlCol.textContent = col
            if (col === 0) {
                htmlCol.classList.add("blank")
            }
            if (bugs.indexOf(col) >= 0) {
                htmlCol.classList.add("bug")
            }
        })
    })
    blankZeroesBugSOFF()
    if (blanks.length === 16) {
        newTileBugSOFF()
        newTileBugSOFF()
    }
}
function loadScoreBugSOFF(score) {
    htmlScore = document.querySelector('#score')
    htmlScore.firstElementChild.textContent = score
}

function fillScoresBugSOFF() {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "6144 Bug Mode Scores:"
    fetch(`http://localhost:3000/games/6144BugMode/leaderboard`)
        .then(r => r.json())
        .then(scores => {
            scores.forEach(score => {
                let li = document.createElement("li")
                li.textContent = score
                scoresList.append(li)
            })
        })
}

function handleBugSOFFKey(event) {  //the event listener for this will need to be removed and re-added when toggling mirror-mode, i think.
    tiles.forEach(tile => {
        tile.classList.remove("smushed")
    })
    if (event.key.startsWith("Arrow")) {
        event.preventDefault()
    }
    if (gameDiv.getAttribute('mirror-mode') === "off") {
        if (event.key === "ArrowUp") {
            swipeUpBugSOFF()
        } else if (event.key === "ArrowDown") {
            swipeDownBugSOFF()
        } else if (event.key === "ArrowLeft") {
            swipeLeftBugSOFF()
        } else if (event.key === "ArrowRight") {
            swipeRightBugSOFF()
        }
    } else {
        if (event.key === "ArrowUp") {
            swipeDownBugSOFF()
        } else if (event.key === "ArrowDown") {
            swipeUpBugSOFF()
        } else if (event.key === "ArrowLeft") {
            swipeRightBugSOFF()
        } else if (event.key === "ArrowRight") {
            swipeLeftBugSOFF()
        }
    }
}
function handleQuitBugSOFF() {
    saveBugSOFF(true)
    document.removeEventListener("keydown", handleBugSOFFKey)

    alert("Game Ended! (You quitter)")
    gameDiv.classList.add("hidden")

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.remove("hidden")

    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.remove("hidden")
    myScores(welcome.dataset.id)
}

function swipeUpBugSOFF() {
    console.log("swiped up!")
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            moveUpBugSOFF(i, j)
        }
    }
    newTileBugSOFF()
    saveBugSOFF()
}
function swipeDownBugSOFF() {
    console.log("swiped down!")
    for (let j = 0; j < 4; j++) {
        for (let i = 3; i >= 0; i--) {
            moveDownBugSOFF(i, j)
        }
    }
    newTileBugSOFF()
    saveBugSOFF()
}
function swipeLeftBugSOFF() {
    console.log("swiped left!")
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            moveLeftBugSOFF(i, j)
        }
    }
    newTileBugSOFF()
    saveBugSOFF()
}
function swipeRightBugSOFF() {
    console.log("swiped right!")
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            moveRightBugSOFF(i, j)
        }
    }
    newTileBugSOFF()
    saveBugSOFF()
}

function moveUpBugSOFF(i, j) {
    if (i !== 0) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveUpBugSOFF(i - 1, j)
        } else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreBugSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            moveUpBugSOFF(i - 1, j)
        }
    }
    blankZeroesBugSOFF()
}
function moveDownBugSOFF(i, j) {
    if (i !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveDownBugSOFF(i + 1, j)
        } else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreBugSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            moveDownBugSOFF(i + 1, j)
        }
    }
    blankZeroesBugSOFF()
}
function moveLeftBugSOFF(i, j) {
    if (j !== 0) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveLeftBugSOFF(i, j - 1)
        } else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreBugSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            moveLeftBugSOFF(i, j - 1)
        }
    }
    blankZeroesBugSOFF()
}
function moveRightBugSOFF(i, j) {
    if (j !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            moveRightBugSOFF(i, j + 1)
        } else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreBugSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            moveRightBugSOFF(i, j + 1)
        }
    }
    blankZeroesBugSOFF()
}
function canCombine(tile1, tile2) {

    if (bugs.indexOf(tile1.textContent) >= 0 || bugs.indexOf(tile1.textContent) >= 0) {
        return false
    }
    return tile1.textContent === tile2.textContent
    // let a = parseInt(tile1.textContent)
    // let b = parseInt(tile2.textContent)
    // let m; //.indexOf(a)
    // let n; //.indexOf(b)

    // if (((Math.abs(m - n) == 1) || (a == 1 && b == 1)) && a !== 0 && b !== 0) {
    //     console.log(`I can combine (${tile1}, ${a}, ${m}) and (${tile2}, ${b}, ${n})`)
    // } else console.log((`(${tile1}, ${a}, ${m}) and (${tile2}, ${b}, ${n}) cannot be combined`))

    // return (((Math.abs(m - n) == 1) || (a == 1 && b == 1)) && a !== 0 && b !== 0)
}

function squashBug() {
    //nothing yet

    //turn off mirror mode? here or somewhere else.
    //oh check to make sure that there are no other bugs even though you squashed this one
}

function blankZeroesBugSOFF() {
    tiles.forEach(tile => {
        if (tile.textContent === "0") {
            tile.classList.add("blank")
        } else {
            tile.style.backgroundColor = getColorBugSOFF(parseInt(tile.textContent))
        }
        if (bugs.indexOf(tile.textContent) >= 0) {
            tile.classList.add("bug")
        } else {
            tile.classList.remove("bug")
        }
    })
    blanks = document.querySelectorAll('.blank')
}

function getColorBugSOFF(val) {
    switch (val) {
        case 3: return "#F6CED8"
        case 6: return "#F7BE81"
        case 12: return "#F3F781"
        case 24: return "#58D3F7"
        case 48: return "#A901DB"
        case 96: return "#01DF3A"
        case 192: return "#D7DF01"
        case 384: return "#4287F5"
        case 768: return "#8DF542"
        case 1536: return "#F5427B"
        case 3072: return "#F5A142"
        case 6144: return "#42F5E3"
        default: return "#F8F8FF"
    }
}

function newTileBugSOFF() {
    if (blanks.length !== 0) {
        let randBlank = blanks[Math.floor(blanks.length * Math.random())]
        let newTileText = numsNBugs[Math.floor(numsNBugs.length * Math.random())]
        randBlank.textContent = newTileText
        if (bugs.indexOf(newTileText) >= 0) {
            gameDiv.setAttribute('mirror-mode', 'on')
            randBlank.classList.add("bug")
        }
        randBlank.classList.remove("blank")
    }
    blankZeroesBugSOFF()
}

function saveBugSOFF(game_over = checkGameOverBugSOFF()) {
    let id = gameDiv.dataset.id
    let board = [[], [], [], []]
    tiles.forEach(tile => {
        let i = tile.parentNode.getAttribute('row-id')
        let j = tile.getAttribute('col-id')
        board[i][j] = tile.textContent
    })
    htmlScore = document.querySelector('#score')

    // console.log("Before Save: ")
    // console.log(`Score: ${parseInt(htmlScore.firstElementChild.textContent)}`)
    // console.log(`Board: ${board}`)
    // console.log(`Status: ${game_over}`)


    fetch(`http://localhost:3000/games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ board_state: board, score: parseInt(htmlScore.firstElementChild.textContent), game_over })
    })
        .then(r => r.json())
        .then(game => {
            // console.log("After Save: ")
            // console.log(`Score: ${game.score}`)
            // console.log(`Board: ${game.board_state}`)
            // console.log(`Status: ${game.game_over}`)
        })
    //don't need to do anything with saved board because we already updated the dom optimistically
}

function bugCheck() {
    for (let count = 0; count < tiles.length; count++) {
        let tile = tiles[count]

        console.log("bug checking tile:", tile)
        if (tile.classList.contains("bug")) {
            gameDiv.setAttribute('mirror-mode', 'on')
            return true
        }
    }
    return false
}

function checkGameOverBugSOFF() {
    if (blanks.length === 0 && noNeighborsBugSOFF()) {
        alert("Game Over!")
        return true
    } else {
        return false
    }
}

function noNeighborsBugSOFF() {
    for (let count = 0; count < tiles.length; count++) {
        let tile = tiles[count]

        let i = parseInt(tile.parentNode.getAttribute('row-id'))
        let j = parseInt(tile.getAttribute('col-id'))
        // odd row, then even colum, or even row and odd column // also - not blank!!
        if ((i % 2 == 1 && j % 2 == 0) || (i % 2 == 0 && j % 2 == 1)) {
            if (i >= 1) {
                let upNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)
                if (canCombine(tile, upNeighbor)) {
                    console.log("found a pair!", tile, upNeighbor, tile.classList, !tile.classList.contains("blank"))
                    return false
                }
            }
            if (i <= 2) {
                let downNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
                if (canCombine(tile, downNeighbor)) {
                    console.log("found a pair!", tile, downNeighbor)
                    return false
                }
            }
            if (j >= 1) {
                let leftNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)
                if (canCombine(tile, leftNeighbor)) {
                    console.log("found a pair!", tile, leftNeighbor)
                    return false
                }
            }
            if (j <= 2) {
                let rightNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
                if (canCombine(tile, rightNeighbor)) {
                    console.log("found a pair!", tile, rightNeighbor)
                    return false
                }
            }
        }

    }
    return true
}
