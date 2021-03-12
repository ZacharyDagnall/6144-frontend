
const body = document.querySelector("body")
const welcome = document.querySelector("#welcome")
const gameDiv = document.querySelector("#game")

const music = new Audio("./music/DuckTalesMoonTheme.mp3")
music.volume = .07
music.loop = true

document.addEventListener("DOMContentLoaded", e => {
    login()
})

function makeLogin() {
    let login = document.createElement("form")
    login.id = "login-form"
    login.classList.add("hello")
    const username = document.createElement('input')
    username.id = "username-input"
    username.name = "name"
    username.placeholder = "Enter Your Name Here!"
    username.required = true
    const loginButton = document.createElement('input')
    loginButton.type = "submit"
    loginButton.textContent = "Login"
    login.append(username, loginButton)
    body.append(login)
    return login
}

function login() {
    let login = makeLogin()
    let buttons = document.querySelector("#game-buttons")
    login.addEventListener("submit", e => {
        e.preventDefault()
        let username = e.target.name.value
        fetch(`http://localhost:3000/users`)
            .then(r => r.json())
            .then(users => {
                let foundUser = users.find(user => user.name == username)
                if (foundUser) {
                    welcomeUser(foundUser)
                }
                else {
                    makeNewUser(username)
                }
                login.classList.add("hidden")
                buttons.classList.remove("hidden")
                let machine = document.querySelector('#machine')
                machine.classList.add('hidden')
            })
    })
}

function myScores(id) {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "My Scores:"
    fetch(`http://localhost:3000/users/${id}/scores`)
        .then(r => r.json())
        .then(gameHashes => {
            gameHashes.forEach(gameHash => {
                let li = document.createElement("li")
                li.textContent = `Game: ${gameHash.name}, Score: ${gameHash.score}`
                li.dataset.id = gameHash.id
                scoresList.append(li)
                let dltbtn = document.createElement('button')
                li.append(dltbtn)
                dltbtn.textContent = "x"
                dltbtn.addEventListener("click", event => deleteScore(gameHash.id))
            })
        })
}
function deleteScore(id) {
    fetch(`http://localhost:3000/games/${id}`, {
        method: "DELETE"
    })
        .then(r => r.json())
        .then(emptyGame => {
            let scoresList = document.querySelector("#scores-list")
            let li = scoresList.querySelector(`[data-id="${id}"]`)
            li.remove()
        })
}

function goodbyeUser() {
    welcome.textContent = `Welcome!`
    welcome.dataset.id = ""

    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = ""

    let buttons = document.querySelector("#game-buttons")
    buttons.classList.add("hidden")

    let logout = document.querySelector("#logout")
    logout.classList.add("hidden")

    let loginEl = document.querySelector("#login-form")
    loginEl.remove()
    let machine = document.querySelector('#machine')
    machine.classList.remove('hidden')
    music.pause()
    music.currentTime = 0
    login()
}

function welcomeUser(user) {
    welcome.textContent = `Welcome ${user.name}!`
    welcome.dataset.id = user.id
    myScores(user.id)
    let logout = document.querySelector("#logout")
    logout.classList.remove("hidden")
    logout.removeEventListener("click", goodbyeUser)
    logout.addEventListener("click", goodbyeUser)
    music.play()
}

function makeNewUser(name) {
    fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ name })
    })
        .then(r => r.json())
        .then(newUser => {
            welcomeUser(newUser)
        })
}

let ttt = document.querySelector("#ttt")
let soff = document.querySelector("#soff")
let fibsoff = document.querySelector("#fibsoff")
let c4 = document.querySelector("#c4")
let lights = document.querySelector("#lights")
let bug = document.querySelector("#bug-soff")

document.addEventListener("click", e => {
    if (e.target == soff) {
        startSOFF()
    } else if (e.target == fibsoff) {
        startFibSOFF()
    } else if (e.target == ttt) {
        startTTT()
    } else if (e.target == c4) {
        startC4()
    } else if (e.target == lights) {
        startLight()
    } else if (e.target == bug) {
        startBugSOFF()
    }
})

