let ttt = document.querySelector("#ttt")
let soff = document.querySelector("#soff")
// let script = document.getElementsByTagName("script")[0]

document.addEventListener("click", e => {
    if (e.target == ttt || e.target == soff) {
        console.log("r u there")

        // let div = document.createElement('div')
        // div.textContent = "Your current Score:"
        // let div2 = document.createElement('div')
        // div2.id = "actual-score"
        // div.append(div2)

        // let divboard = document.createElement('div')
        // divboard.id = "board"
        if (e.target == ttt) {
            tictactoestart()
        } else {
            soffstart()
        }
    }
})