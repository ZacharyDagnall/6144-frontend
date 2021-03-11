function startC4() {  //create HTML items on document
    gameDiv.innerHTML = `<div id="score"> Your Current Score:
                                <div id="actual score"></div>
                        </div>
                        <div id="board">
                        </div>`
    gameDiv.classList.remove("hidden")
    let buttons = document.querySelector("#game-buttons")
    buttons.classList.add("hidden")
    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.add("hidden")
    let boardDiv = document.querySelector('#board')
    for (let i = 0; i < 7; i++) {
        const row = document.createElement('div')
        row.classList.add("row")
        row.setAttribute("row-id", i)
        boardDiv.append(row)
        for (let j = 0; j < 7; j++) {
            let tile = document.createElement('div')
            tile.setAttribute("col-id", j)
            tile.classList.add("tile")
            tile.classList.add("connect")
            row.append(tile)
        }
    }
    tiles = document.querySelectorAll('.tile')
    let quitButton = document.createElement("button")
    gameDiv.append(quitButton)
    quitButton.id = "quit-button"
    quitButton.textContent = "Quit Game"
    quitButton.removeEventListener("click", handleQuitC4)
    quitButton.addEventListener("click", handleQuitC4)
    fillScoresC4()
    document.removeEventListener("click", handleC4Click)
    document.addEventListener("click", handleC4Click)
    fetchBoardC4()
}
function fetchBoardC4() {
    fetch(`http://localhost:3000//users/${welcome.dataset.id}/nextgame/Connect4`)
        .then(r => r.json())
        .then(game => {
            gameDiv.dataset.id = game.id
            loadBoardC4(game.board_state)
            loadScoreC4(game.score)
        })
}
function loadBoardC4(board) {  //render board (new or updated)
    board.forEach((row, i) => {
        let htmlRow = document.querySelector(`[row-id="${i}"]`)
        row.forEach((col, j) => {
            let htmlCol = htmlRow.querySelector(`[col-id="${j}"]`)
            htmlCol.textContent = col
            if (col === 0) {
                htmlCol.classList.add("empty")
            }
        })
    })
    blankZeroesC4()
}
function loadScoreC4(score) {
    htmlScore = document.querySelector('#score')
    htmlScore.firstElementChild.textContent = score
}
function incrementScoreC4(score) {
    htmlScore = document.querySelector('#score')
    loadScoreC4(parseInt(htmlScore.firstElementChild.textContent) + score)
}

function fillScoresC4() {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "Connect4 Scores:"
    fetch(`http://localhost:3000/games/Connect4/leaderboard`)
        .then(r => r.json())
        .then(scores => {
            scores.forEach(score => {
                let li = document.createElement("li")
                li.textContent = score
                scoresList.append(li)
            })
        })
}

function handleC4Click(event) {
    if (event.target.matches('.tile') && !event.target.classList.contains("ocupado")) {
        let tile = event.target
        dropTokenC4(String.fromCodePoint(10060), tile)          // ❌  
        sleepC4(1100).then(() => { randOC4() });
        blankZeroesC4()
        incrementScoreC4(-20)
        saveC4()
    }
}

function handleQuitC4() {
    saveC4(true)
    document.removeEventListener("click", handleC4Click)

    alert("Game Ended! (You quitter)")
    gameDiv.classList.add("hidden")

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.remove("hidden")

    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.remove("hidden")
    myScores(welcome.dataset.id)
}
function handleGameOverC4() {
    document.removeEventListener("click", handleC4Click)

    gameDiv.classList.add("hidden")

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.remove("hidden")

    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.remove("hidden")
    myScores(welcome.dataset.id)
}

function sleepC4(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dropTokenC4(token, tile) {
    let i = parseInt(tile.parentNode.getAttribute('row-id'))
    let j = parseInt(tile.getAttribute('col-id'))
    if (i === 6) {          //if already at the bottom, just placeToken here
        placeTokenC4(token, tile)
    } else {                //not at the bottom, let's check the spot below
        let downNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
        if (downNeighbor.classList.contains('ocupado')) {   //the one below us is full, so placeToken here
            placeTokenC4(token, tile)
        } else {                            //spot below us is empty, so keep falling (recursive call)
            dropTokenC4(token, downNeighbor)
        }
    }
}

function placeTokenC4(token, tile) {
    tile.textContent = token
    tile.classList.remove("empty")
    if (token == String.fromCodePoint(10060)) {
        tile.classList.add("ex")
    } else {
        tile.classList.add("oh")
    }
    tile.classList.add("ocupado")
    blanks = document.querySelectorAll('.empty')
}

function randOC4() {
    if (blanks.length !== 0) {
        let randBlank = blanks[Math.floor(blanks.length * Math.random())]
        dropTokenC4(String.fromCodePoint(11093), randBlank)          // ⭕
        blankZeroesC4()
    }
}

function blankZeroesC4() {
    tiles.forEach(tile => {
        if (tile.textContent === "0") {
            tile.classList.add("empty")
        } else {
            tile.style.backgroundColor = getColorC4(tile.textContent)
        }
    })
    blanks = document.querySelectorAll('.empty')
}

function getColorC4(val) {
    switch (val) {
        case String.fromCodePoint(10060): return "#42F5E3"
        case String.fromCodePoint(11093): return "#F3F781"
    }
}

function saveC4(game_over = checkGameOverC4()) {
    let id = gameDiv.dataset.id
    let board = [[], [], [], [], [], [], []]
    tiles.forEach(tile => {
        let i = parseInt(tile.parentNode.getAttribute('row-id'))
        let j = parseInt(tile.getAttribute('col-id'))
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
            //if it comes back as game_over, invoke handleGameOver()

            if (game.game_over) {
                //handle Game over -> should stop the rest from executing ?
            }

            // console.log("After Save: ")
            // console.log(`Score: ${game.score}`)
            // console.log(`Board: ${game.board_state}`)
            // console.log(`Status: ${game.game_over}`)
        })
    //don't need to do anything with saved board because we already updated the dom optimistically
}

function checkGameOverC4() {
    if (connect4()) {
        //win or lose
        handleGameOverC4()
        return true
    } else if (blanks.length === 0) {
        //stale mate, it's a draw. Do something?
        alert("Stale Mate :/")
        document.removeEventListener("click", handleC4Click)
        let buttons = document.querySelector("#game-buttons")
        buttons.classList.remove("hidden")
        gameDiv.classList.add("hidden")
        handleGameOverC4()
        return true
    }
    return false     //game continues; it's not over
}

function connect4() {
    if (fourInARowC4("ex")) {
        // you win!
        incrementScoreC4(80)
        alert("You Won! :D Your score was: " + htmlScore.firstElementChild.textContent + " Wow!!")
        document.removeEventListener("click", handleC4Click)
        let buttons = document.querySelector("#game-buttons")
        buttons.classList.remove("hidden")
        gameDiv.classList.add("hidden")
        return true
    }
    else if (fourInARowC4("oh")) {
        // you lose!
        incrementScoreC4(-80)
        alert("You Lost! :( Your score was: " + htmlScore.firstElementChild.textContent + " Better Luck Next Time!!")
        document.removeEventListener("click", handleC4Click)
        let buttons = document.querySelector("#game-buttons")
        buttons.classList.remove("hidden")
        gameDiv.classList.add("hidden")
        return true
    }
    // else nothing; game continues
    return false
}

function fourInARowC4(symb) {
    let symbs = Array.from(tiles).filter(tile => tile.classList.contains(symb))
    for (let count = 0; count < symbs.length; count++) {
        tile = symbs[count]

        if (checkRow(symb, tile, 4) || checkCol(symb, tile, 4) || checkMajDiag(symb, tile, 4) || checkMinDiag(symb, tile, 4)) {
            console.log("found a good four!")
            return true
        }
    }
    return false
}

function checkRow(symb, tile, num) {
    let i = parseInt(tile.parentNode.getAttribute('row-id'))
    let j = parseInt(tile.getAttribute('col-id'))
    console.log("indices:", i, j)
    if (num === 1) {
        return (tile.classList.contains(symb))
    } else if (j < 6) {
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
        return (tile.classList.contains(symb) && checkRow(symb, nextTile, num - 1))
    } else if (j === 6) {   //this means you are at the end of the row but looking for more than 1 cell, which can't be done
        return false
    }
}

function checkCol(symb, tile, num) {
    let i = parseInt(tile.parentNode.getAttribute('row-id'))
    let j = parseInt(tile.getAttribute('col-id'))
    console.log("indices:", i, j)
    if (num === 1) {
        return (tile.classList.contains(symb))
    } else if (i < 6) {
        let nextTile = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
        return (tile.classList.contains(symb) && checkCol(symb, nextTile, num - 1))
    } else if (i === 6) {   //this means you are at the end of the col but looking for more than 1 cell, which can't be done
        return false
    }
}
function checkMajDiag(symb, tile, num) {
    let i = parseInt(tile.parentNode.getAttribute('row-id'))
    let j = parseInt(tile.getAttribute('col-id'))
    console.log("indices:", i, j)
    if (num === 1) {
        return (tile.classList.contains(symb))
    } else if (i < 6 && j < 6) {
        let nextTile = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j + 1}"]`)
        return (tile.classList.contains(symb) && checkMajDiag(symb, nextTile, num - 1))
    } else if (i === 6 || j === 6) {   //this means you are at the end of a row or col but looking for more than 1 cell, which can't be done
        return false
    }
}
function checkMinDiag(symb, tile, num) {
    let i = parseInt(tile.parentNode.getAttribute('row-id'))
    let j = parseInt(tile.getAttribute('col-id'))
    console.log("indices:", i, j)
    if (num === 1) {
        return (tile.classList.contains(symb))
    } else if (i < 6 && j > 0) {
        let nextTile = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j - 1}"]`)
        return (tile.classList.contains(symb) && checkMinDiag(symb, nextTile, num - 1))
    } else if (i === 6 || j === 0) {   //this means you are at the end of a row or beginning of a col but looking for more than 1 cell, which can't be done
        return false
    }
}