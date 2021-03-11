
let tilesLights;

let htmlScoreLights;

function startLight() {  //create HTML items on document
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
    boardDiv.classList.add("board-light")
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div')
        row.classList.add("row")
        row.setAttribute("row-id", i)
        boardDiv.append(row)
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement('div')
            tile.setAttribute("col-id", j)
            tile.classList.add("tile")
            tile.classList.add('tile-light')
            row.append(tile)
        }
    }
    tilesLights = document.querySelectorAll('.tile')
    let quitButton = document.createElement("button")
    gameDiv.append(quitButton)
    quitButton.id = "quit-button"
    quitButton.textContent = "Quit Game"
    quitButton.removeEventListener("click", handleQuitLight)
    quitButton.addEventListener("click", handleQuitLight)
    fillScoresLight()
    document.removeEventListener("click", handleLightPress)
    document.addEventListener("click", handleLightPress)
    fetchBoardLight()
}

function fetchBoardLight() {
    fetch(`http://localhost:3000//users/${welcome.dataset.id}/nextgame/LightsOut`)
        .then(r => r.json())
        .then(game => {
            gameDiv.dataset.id = game.id
            loadBoardLight(game.board_state)
            loadScoreLight(game.score)
        })
}

function loadBoardLight(board) {  //render board (new or updated)
    board.forEach((row, i) => {
        let htmlRow = document.querySelector(`[row-id="${i}"]`)
        row.forEach((col, j) => {
            let htmlCol = htmlRow.querySelector(`[col-id="${j}"]`)
            htmlCol.textContent = col   
        })
    })
    changeColor()
}

function loadScoreLight(score) {
    htmlScoreLights = document.querySelector('#score')
    htmlScoreLights.firstElementChild.textContent = score
}

function fillScoresLight() {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "LightsOut Scores:"
    fetch(`http://localhost:3000/games/LightsOut/leaderboard`)
        .then(r => r.json())
        .then(scores => {
            scores.forEach(score => {
                let li = document.createElement("li")
                li.textContent = score
                scoresList.append(li)
            })
        })
}
function handleLightPress(event){
    if(event.target.matches(".tile")){
        event.stopPropagation()
        let i = parseInt(event.target.parentNode.getAttribute('row-id'))
        let j = parseInt(event.target.getAttribute('col-id'))
        lightChange(i,j)
            }
        }



function lightChange(i,j){
    let selTile = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j}"]`)
    if(i == 0 && j == 0){
        let down = document.querySelector(`[row-id="${i+1}"]`).querySelector(`[col-id="${j}"]`)
        let right = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j+1}"]`)
        switchNum(down)
        switchNum(right)
        switchNum(selTile)
    } else if((i == 1 && j == 0) || (i == 2 && j == 0) || (i == 3 && j == 0)){
        let up = document.querySelector(`[row-id="${i-1}"]`).querySelector(`[col-id="${j}"]`)
        let down = document.querySelector(`[row-id="${i+1}"]`).querySelector(`[col-id="${j}"]`)
        let right = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j+1}"]`)
        switchNum(up)
        switchNum(down)
        switchNum(right)
        switchNum(selTile)
    } else if (i == 4 && j == 0){
        let up = document.querySelector(`[row-id="${i-1}"]`).querySelector(`[col-id="${j}"]`)
        let right = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j+1}"]`)
        switchNum(up)
        switchNum(right)
        switchNum(selTile)
    } else if ((i == 0 && j == 1) || (i == 0 && j == 2) || (i == 0 && j == 3)){
        let left = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j-1}"]`)
        let right = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j+1}"]`)
        let down = document.querySelector(`[row-id="${i+1}"]`).querySelector(`[col-id="${j}"]`)
        switchNum(right)
        switchNum(down)
        switchNum(left)
        switchNum(selTile)
    } else if (i == 0 && j == 4){
        let left = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j-1}"]`)
        let down = document.querySelector(`[row-id="${i+1}"]`).querySelector(`[col-id="${j}"]`)
        switchNum(down)
        switchNum(left)
        switchNum(selTile)
    } else if ((i == 1 && j ==4) || (i == 2 && j ==4) || (i == 3 && j ==4)){
        let down = document.querySelector(`[row-id="${i+1}"]`).querySelector(`[col-id="${j}"]`)
        let left = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j-1}"]`)
        let up = document.querySelector(`[row-id="${i-1}"]`).querySelector(`[col-id="${j}"]`)
        switchNum(down)
        switchNum(left)
        switchNum(up)
        switchNum(selTile)
    } else if ((i == 4 && j == 1) || (i == 4 && j == 2) || (i == 4 && j == 3)){
        let left = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j-1}"]`)
        let right = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j+1}"]`)
        let up = document.querySelector(`[row-id="${i-1}"]`).querySelector(`[col-id="${j}"]`)
        switchNum(left)
        switchNum(right)
        switchNum(up)
        switchNum(selTile)
    } else if(i == 4 && j ==4){
        let left = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j-1}"]`)
        let up = document.querySelector(`[row-id="${i-1}"]`).querySelector(`[col-id="${j}"]`)
        switchNum(up)
        switchNum(left)
        switchNum(selTile)
    } else {
        console.log(i,j)
        let down = document.querySelector(`[row-id="${i+1}"]`).querySelector(`[col-id="${j}"]`)
        let left = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j-1}"]`)
        let up = document.querySelector(`[row-id="${i-1}"]`).querySelector(`[col-id="${j}"]`)
        let right = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j+1}"]`)
        switchNum(left)
        switchNum(right)
        switchNum(up)
        switchNum(down)
        switchNum(selTile)
    }
    changeColor()
    htmlScore = document.querySelector('#score')
    loadScoreLight(parseInt(htmlScore.firstElementChild.textContent) - 25) 
    saveLight()      
}

function switchNum(tile){
    if(tile.innerHTML == 1){
        tile.innerHTML = 0
    } else{
        tile.innerHTML = 1
    }
}

function handleQuitLight() {
    saveLight(true)
    document.removeEventListener("click", handleLightPress)

    alert("Game Ended! (You quitter)")
    gameDiv.classList.add("hidden")

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.remove("hidden")

    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.remove("hidden")
    myScores(welcome.dataset.id)
}
function handleGameOverLight() {
    document.removeEventListener("click", handleLightPress)

    gameDiv.classList.add("hidden")

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.remove("hidden")

    let logoutButton = document.querySelector("#logout")
    logoutButton.classList.remove("hidden")
    myScores(welcome.dataset.id)
}


function getColorLight(val) {
    switch (val) {
        case 0: return "#2c2e2d"
        case 1: return "#fffb21"
    }
}

function changeColor(){
    tilesLights.forEach(tile =>{
        tile.style.backgroundColor = getColorLight(parseInt(tile.textContent))
    })
}


function saveLight(game_over = checkGameOverLight()) {
    let id = gameDiv.dataset.id
    let board = [[], [], [], [], []]
    tilesLights.forEach(tile => {
        let i = tile.parentNode.getAttribute('row-id')
        let j = tile.getAttribute('col-id')
        board[i][j] = tile.textContent
    })
    htmlScoreLights = document.querySelector('#score')

    console.log("Before Save: ")
    console.log(`Score: ${parseInt(htmlScoreLights.firstElementChild.textContent)}`)
    console.log(`Board: ${board}`)
    console.log(`Status: ${game_over}`)


    fetch(`http://localhost:3000/games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ board_state: board, score: parseInt(htmlScoreLights.firstElementChild.textContent), game_over })
    })
        .then(r => r.json())
        .then(game => {
            console.log("After Save: ")
            console.log(`Score: ${game.score}`)
            console.log(`Board: ${game.board_state}`)
            console.log(`Status: ${game.game_over}`)
        })
    //don't need to do anything with saved board because we already updated the dom optimistically
}

function checkSums(){
    let numArr = []
    tilesLights.forEach(tile => {
        numArr.push(parseInt(tile.innerHTML))
    })
    let sum =numArr.reduce(function(a, b) {
        return a + b
    }, 0)
    return sum
}

function checkGameOverLight() {
    if(checkSums() == 25 || parseInt(htmlScore.firstElementChild.textContent) <= 0 ){
        alert("Game Over!")
        document.removeEventListener("click", handleLightPress)
        let buttons = document.querySelector("#game-buttons")
        buttons.classList.remove("hidden")
        gameDiv.classList.add("hidden")
        return true
    } else {
        return false
    }
}

