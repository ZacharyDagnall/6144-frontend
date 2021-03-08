
document.addEventListener("DOMContentLoaded", event => {
    makeBoard()
    //loadScore()
    fetchBoard() // blank or most recent
})

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
    let tiles = document.querySelectorAll('.tile')
    board.forEach(row => {

        row.forEach(col => {

        })
    })
}
function loadScore() {

}

function fetchBoard() {
    fetch(`http://localhost:3000/games/1`)
        .then(r => r.json())
        .then(game => {
            loadBoard(game.board_state)
            //loadscore
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
