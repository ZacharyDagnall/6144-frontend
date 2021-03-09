// let tttbutton = document.querySelector('#ttt')
// document.addEventListener("click", e => {
//     if (e.target == tttbutton) {
function tictactoestart() {
    const boardDiv = document.querySelector('#board')
    boardDiv.replaceChildren()
    function makeBoard() {  //create HTML items on document
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div')
            row.classList.add("row")
            row.setAttribute("row-id", i)
            boardDiv.append(row)
            for (let j = 0; j < 3; j++) {
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
                if (col == 0) {
                    htmlCol.classList.add("empty")
                } else {
                    htmlCol.textContent = col
                }
            })
        })
        blankZeroes()
    }

    const htmlScore = document.querySelector('#actual-score')
    function loadScore(score) {
        htmlScore.textContent = score
    }

    function fetchBoard() {
        fetch(`http://localhost:3000/games/3`)
            .then(r => r.json())
            .then(game => {
                loadBoard(game.board_state)
                loadScore(game.score)
            })
    }

    document.addEventListener("click", event => {
        if (event.target.matches('.tile') && !event.target.classList.contains("oh") && !event.target.classList.contains("ex")) {
            event.target.textContent = "EX" //might be a problem if i click on an O ?  // ❌ why can't i use emoji
            event.target.classList.remove("empty")
            event.target.classList.add("ex")
            blanks = document.querySelectorAll('.empty')
            sleep(1200).then(() => { randO() });
            console.log("tile clicked")
            save()
        }
    })
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function randO() {
        if (blanks.length !== 0) {
            let randBlank = blanks[Math.floor(blanks.length * Math.random())]
            randBlank.textContent = "OH" // ⭕ why can't i use emoji
            randBlank.classList.remove("empty")
            randBlank.classList.add("oh")
            blanks = document.querySelectorAll('.empty')
        }
    }

    function blankZeroes() {
        tiles.forEach(tile => {
            if (tile.textContent === "0") {
                tile.classList.add("empty")
            }
        })
        blanks = document.querySelectorAll('.empty')
    }

    function save() {
        let board = [[], [], []]
        tiles.forEach(tile => {
            let i = tile.parentNode.getAttribute('row-id')
            let j = tile.getAttribute('col-id')
            board[i][j] = tile.textContent
        })

        let game_over = checkGameOver()
        //do something about it if true

        fetch(`http://localhost:3000/games/3`, {
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
        if (blanks.length === 0 || tictactoe()) {
            return true
        }
        return false
    }

    function tictactoe() {
        if (threeInARow("ex")) {
            // you win!
            // do some win things
            return true
        }
        else if (threeInARow("oh")) {
            // you lose!
            // do some lose things
            return true
        }
        // else nothing; game continues
        return false
    }

    function threeInARow(symb) {
        let symbs = Array.from(tiles).filter(tile => tile.classList.contains(symb))
        symbs.forEach(tile => {
            let i = tile.parentNode.getAttribute('row-id')
            let j = tile.getAttribute('col-id')
            console.log("indices:", i, j)
            if ((i == 0 || i == 2) && j == 1) {
                //check left and right
                let leftNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)
                let rightNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
                console.log(leftNeighbor, rightNeighbor)
                if (leftNeighbor.classList.contains(symb) && rightNeighbor.classList.contains(symb)) {
                    return true
                }
            } else if ((j == 0 || j == 2) && i == 1) {
                //check up and down
                let upNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)
                let downNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
                console.log(upNeighbor, downNeighbor)
                if (upNeighbor.classList.contains(symb) && downNeighbor.classList.contains(symb)) {
                    return true
                }
            } else if (i == 1 && j == 1) {
                //left and right
                let leftNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)
                let rightNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
                if (leftNeighbor.classList.contains(symb) && rightNeighbor.classList.contains(symb)) {
                    return true
                }
                //up and down
                let upNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)
                let downNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
                if (upNeighbor.classList.contains(symb) && downNeighbor.classList.contains(symb)) {
                    return true
                }
                //major diagonal
                let upLeftNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j - 1}"]`)
                let downRightNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j + 1}"]`)
                if (upLeftNeighbor.classList.contains(symb) && downRightNeighbor.classList.contains(symb)) {
                    return true
                }
                //minor diagonal
                let downLeftNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j - 1}"]`)
                let upRightNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j + 1}"]`)
                if (downLeftNeighbor.classList.contains(symb) && upRightNeighbor.classList.contains(symb)) {
                    return true
                }
            }

        })
        return false
    }




    makeBoard()
    fetchBoard() // blank or most recent
    const tiles = document.querySelectorAll('.tile')
    let blanks = document.querySelectorAll('.empty')
}
//     }
// })