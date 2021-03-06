
const newSOFFNums = ["3", "6"]
let tiles;
let blanks;
let htmlScore;

function startSOFF() {  //create HTML items on document
    gameDiv.innerHTML = `<div id="score"> Your Current Score:
                                <div id="actual score"></div>
                        </div>
                        <div id="board">
                        </div>`
    gameDiv.classList.remove("hidden")
    music.pause()
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
            tile.classList.add("soff")
            row.append(tile)
        }
    }
    tiles = document.querySelectorAll('.tile')
    let quitButton = document.createElement("button")
    gameDiv.append(quitButton)
    quitButton.id = "quit-button"
    quitButton.textContent = "Quit Game"
    quitButton.removeEventListener("click", handleQuitSOFF)
    quitButton.addEventListener("click", handleQuitSOFF)
    fillScoresSOFF()
    fillRulesSOFF()
    document.removeEventListener("keydown", handleSOFFKey)
    document.addEventListener("keydown", handleSOFFKey)
    fetchBoardSOFF()
    mobileConSOFF()
}
function fetchBoardSOFF() {
    fetch(`https://gameboyzarcade.herokuapp.com/users/${welcome.dataset.id}/nextgame/6144`)
        .then(r => r.json())
        .then(game => {
            gameDiv.dataset.id = game.id
            loadBoardSOFF(game.board_state)
            loadScoreSOFF(game.score)
        })
}
function loadBoardSOFF(board) {  //render board (new or updated)
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
    blankZeroesSOFF()
    if (blanks.length === 16) {
        newTileSOFF()
        newTileSOFF()
    }
}
function loadScoreSOFF(score) {
    htmlScore = document.querySelector('#score')
    htmlScore.firstElementChild.textContent = score
}

function fillScoresSOFF() {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "6144 Scores:"
    fetch(`https://gameboyzarcade.herokuapp.com/games/6144/leaderboard`)
        .then(r => r.json())
        .then(scores => {
            scores.forEach(score => {
                let li = document.createElement("li")
                li.textContent = score
                scoresList.append(li)
            })
        })
}

function fillRulesSOFF() {
    fetch("https://gameboyzarcade.herokuapp.com/games/rules/6144")
        .then(r => r.text())
        .then(rule => {
            rules.textContent = rule
        })
}

function clearRulesSOFF() {
    rules.textContent = ""
}

function handleSOFFKey(event) {
    tiles.forEach(tile => {
        tile.classList.remove("smushed")
    })
    if (event.key.startsWith("Arrow")) {
        event.preventDefault()
    }
    if (event.key === "ArrowUp") {
        swipeUpSOFF()
    } else if (event.key === "ArrowDown") {
        swipeDownSOFF()
    } else if (event.key === "ArrowLeft") {
        swipeLeftSOFF()
    } else if (event.key === "ArrowRight") {
        swipeRightSOFF()
    }
}
function handleQuitSOFF() {
    saveSOFF(true)
    document.removeEventListener("keydown", handleSOFFKey)

    alert("Game Ended! (You quitter)")
    gameDiv.classList.add("hidden")
    music.play()
    clearRulesSOFF()

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.remove("hidden")

    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.remove("hidden")
    myScores(welcome.dataset.id)
}

function swipeUpSOFF() {
    console.log("swiped up!")
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            sleep(150).then(() => { moveUpSOFF(i, j) })
        }
    }
    sleep(500).then(() => { newTileSOFF() })
    saveSOFF()
}
function swipeDownSOFF() {
    console.log("swiped down!")
    for (let j = 0; j < 4; j++) {
        for (let i = 3; i >= 0; i--) {
            sleep(150).then(() => { moveDownSOFF(i, j) })
        }
    }
    sleep(500).then(() => { newTileSOFF() })
    saveSOFF()
}
function swipeLeftSOFF() {
    console.log("swiped left!")
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            sleep(150).then(() => { moveLeftSOFF(i, j) })
        }
    }
    sleep(500).then(() => { newTileSOFF() })
    saveSOFF()
}
function swipeRightSOFF() {
    console.log("swiped right!")
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            sleep(150).then(() => { moveRightSOFF(i, j) })
        }
    }
    sleep(500).then(() => { newTileSOFF() })
    saveSOFF()
}

function moveUpSOFF(i, j) {
    if (i !== 0) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            sleep(150).then(() => { moveUpSOFF(i - 1, j) })
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            sleep(150).then(() => { moveUpSOFF(i - 1, j) })
        }
    }
    blankZeroesSOFF()
}
function moveDownSOFF(i, j) {
    if (i !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            sleep(150).then(() => { moveDownSOFF(i + 1, j) })
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            sleep(150).then(() => { moveDownSOFF(i + 1, j) })
        }
    }
    blankZeroesSOFF()
}
function moveLeftSOFF(i, j) {
    if (j !== 0) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            sleep(150).then(() => { moveLeftSOFF(i, j - 1) })
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            sleep(150).then(() => { moveLeftSOFF(i, j - 1) })
        }
    }
    blankZeroesSOFF()
}
function moveRightSOFF(i, j) {
    if (j !== 3) {
        let htmlTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
        let nextTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)

        if (nextTile.textContent === "0") {
            nextTile.textContent = htmlTile.textContent
            nextTile.classList.remove("blank")
            htmlTile.textContent = 0
            sleep(150).then(() => { moveRightSOFF(i, j + 1) })
        } else if (htmlTile.textContent === nextTile.textContent && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
            let score = 2 * parseInt(htmlTile.textContent)
            nextTile.textContent = score
            nextTile.classList.add("smushed")
            htmlScore = document.querySelector('#score')
            loadScoreSOFF(parseInt(htmlScore.firstElementChild.textContent) + score)
            htmlTile.textContent = 0
            sleep(150).then(() => { moveRightSOFF(i, j + 1) })
        }
    }
    blankZeroesSOFF()
}

function blankZeroesSOFF() {
    tiles.forEach(tile => {
        if (tile.textContent === "0") {
            tile.classList.add("blank")
        } else {
            tile.style.backgroundColor = getColorSOFF(parseInt(tile.textContent))
        }
    })
    blanks = document.querySelectorAll('.blank')
}

function getColorSOFF(val) {
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
    }
}

function newTileSOFF() {
    if (blanks.length !== 0) {
        let randBlank = blanks[Math.floor(blanks.length * Math.random())]
        randBlank.textContent = newSOFFNums[Math.floor(newSOFFNums.length * Math.random())]
        randBlank.classList.remove("blank")
    }
    blankZeroesSOFF()
}

function saveSOFF(game_over = checkGameOverSOFF()) {
    let id = gameDiv.dataset.id
    let board = [[], [], [], []]
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


    fetch(`https://gameboyzarcade.herokuapp.com/games/${id}`, {
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

function checkGameOverSOFF() {
    if (blanks.length === 0 && noNeighborsSOFF()) {
        sleep(200).then(() => {
            alert("Game Over! Your score was: " + htmlScore.firstElementChild.textContent + ". Wow!!")
            document.removeEventListener("keydown", handleSOFFKey)
            let buttons = document.querySelector("#game-buttons")
            buttons.classList.remove("hidden")
            gameDiv.classList.add("hidden")
            music.play()
            let logoutButton = document.querySelector("#logout")
            logoutButton.classList.remove("hidden")
            myScores(welcome.dataset.id)
            clearRulesSOFF()
        })
        return true
    } else {
        return false
    }
}

function noNeighborsSOFF() {
    for (let count = 0; count < tiles.length; count++) {
        let tile = tiles[count]

        let i = parseInt(tile.parentNode.getAttribute('row-id'))
        let j = parseInt(tile.getAttribute('col-id'))
        // odd row, then even colum, or even row and odd column // also - not blank!! 
        if ((i % 2 == 1 && j % 2 == 0) || (i % 2 == 0 && j % 2 == 1)) {
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

    }
    return true
}

// This is the start of mobile compatibility

function swipeDetect(el, callback){ 
    var touchsurface = el,
    swipeDir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipeDir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipeDir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for swipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipeDir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipeDir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipeDir)
        e.preventDefault()
    }, false)
}

function mobileConSOFF(){
    if (isMobile){
        console.log(true)
        let bunny = document.querySelector('#board')
        swipeDetect(bunny, function(swipeDir){
            tiles.forEach(tile => {
                tile.classList.remove("smushed")
            })
            if(swipeDir == 'left'){
                swipeLeftSOFF()
            }else if(swipeDir == 'right'){
                swipeRightSOFF()
            }else if(swipeDir == 'up'){
                swipeUpSOFF()
            }else if(swipeDir == 'down'){
                swipeDownSOFF()
            }
        })
    } else {
        return console.log("You are on a desktop")
    }
}