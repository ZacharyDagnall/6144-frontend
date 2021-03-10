let fibbutton = document.querySelector('#fib')
const fibnums = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]
const newFibs = [1, 1, 2]
document.addEventListener("click", e => {
    if (e.target == fibbutton) {

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
            blankZeroes()
        }

        function canCombine(tile1, tile2) {
            let a = parseInt(tile1.textContent)
            let b = parseInt(tile2.textContent)
            let n = fibnums.indexOf(a)
            let m = fibnums.indexOf(b)
            return ((Math.abs(n - m) == 1) || (a == 1 && (b == 1 || b == 2)) || (b == 1 && (a == 1 || a == 2)))
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
            tiles.forEach(tile => {
                tile.classList.remove("smushed")
                tile.classList.remove("new")
            })
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

        //different than normal SOFF just because of list pulling from for randoms
        function newTile() {
            if (blanks.length !== 0) {
                let randBlank = blanks[Math.floor(blanks.length * Math.random())]
                randBlank.textContent = newFibs[Math.floor(newFibs.length * Math.random())]
                randBlank.classList.remove("blank")
                randBlank.classList.add("new")
            }
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
                } // don't check if they're the same. check if they are two adjacent numbers from the list. (should work with 5 and 8 as well as 8 and 5) 
                else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
                    let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
                    nextTile.textContent = score
                    nextTile.classList.add("smushed")
                    loadScore(parseInt(htmlScore.textContent) + score)
                    htmlTile.textContent = 0
                    moveRight(i, j + 1)
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
                } // don't check if they're the same. check if they are two adjacent numbers from the list. (should work with 5 and 8 as well as 8 and 5)
                else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
                    let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
                    nextTile.textContent = score
                    nextTile.classList.add("smushed")
                    loadScore(parseInt(htmlScore.textContent) + score)
                    htmlTile.textContent = 0
                    moveLeft(i, j - 1)
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
                } // don't check if they're the same. check if they are two adjacent numbers from the list. (should work with 5 and 8 as well as 8 and 5)
                else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
                    let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
                    nextTile.textContent = score
                    nextTile.classList.add("smushed")
                    loadScore(parseInt(htmlScore.textContent) + score)
                    htmlTile.textContent = 0
                    moveDown(i + 1, j)
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
                } // don't check if they're the same. check if they are two adjacent numbers from the list. (should work with 5 and 8 as well as 8 and 5)
                else if (canCombine(htmlTile, nextTile) && !htmlTile.classList.contains("smushed") && !nextTile.classList.contains("smushed")) {
                    let score = parseInt(htmlTile.textContent) + parseInt(nextTile.textContent)
                    nextTile.textContent = score
                    nextTile.classList.add("smushed")
                    loadScore(parseInt(htmlScore.textContent) + score)
                    htmlTile.textContent = 0
                    moveUp(i - 1, j)
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

        function save() {
            let board = [[], [], [], []]
            tiles.forEach(tile => {
                let i = tile.parentNode.getAttribute('row-id')
                let j = tile.getAttribute('col-id')
                board[i][j] = tile.textContent
            })

            let game_over = checkGameOver()
            //do something about it if true

            fetch(`http://localhost:3000/games/2`, {
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
                return true
            } else {
                return false
            }
        }

        function noNeighbors() {
            tiles.forEach(tile => {
                let i = tile.parentNode.getAttribute('row-id')
                let j = tile.getAttribute('col-id')
                // odd row, then even colum, or even row and odd column
                if ((i % 2 == 1 && j % 2 == 0) || (i % 2 == 0 && j % 2 == 1)) {
                    let upNeighbor = document.querySelector(`[row-id="${i - 1}"]`).querySelector(`[col-id="${j}"]`)
                    let downNeighbor = document.querySelector(`[row-id="${i + 1}"]`).querySelector(`[col-id="${j}"]`)
                    let leftNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j - 1}"]`)
                    let rightNeighbor = document.querySelector(`[row-id="${i}"]`).querySelector(`[col-id="${j + 1}"]`)
                    // this needs to be fixed just like normal SOFF successfully was, but don't forget to use CAN COMBINE instead of ===
                    if (tile.textContent === upNeighbor.textContent || tile.textContent === downNeighbor.textContent || tile.textContent === leftNeighbor.textContent || tile.textContent === rightNeighbor.textContent) {
                        return false
                    }
                }
            })
            return true
        }





        makeBoard()
        fetchBoard() // blank or most recent
        const tiles = document.querySelectorAll('.tile')
        let blanks = document.querySelectorAll('.blank')
    }
})