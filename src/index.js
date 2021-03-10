
const body = document.querySelector("body")
const welcome = document.querySelector("#welcome")
const gameDiv = document.querySelector("#game")
document.addEventListener("DOMContentLoaded", e => {
    login()
})

function makeLogin() {
    let login = document.createElement("form")
    login.id = "login-form"
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
            })
    })
}

function myScores(id) {
    let scoresList = document.querySelector("#scores-list")
    scoresList.replaceChildren()
    scoresList.textContent = "My Scores:"
    fetch(`http://localhost:3000/users/${id}/scores`)
        .then(r => r.json())
        .then(scores => {
            scores.forEach(score => {
                console.log(score)
                let li = document.createElement("li")
                li.textContent = score
                scoresList.append(li)
            })
        })
}

function welcomeUser(user) {
    welcome.textContent = `Welcome ${user.name}`
    welcome.dataset.id = user.id
    myScores(user.id)
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
// let script = document.getElementsByTagName("script")[0]

document.addEventListener("click", e => {
    if (e.target == soff) {
        startSoff()
    }
})