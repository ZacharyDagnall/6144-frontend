
const body = document.querySelector("body")
const welcome = document.querySelector("#welcome")
document.addEventListener("DOMContentLoaded", e => {
    login()
})

function makeLogin() {
    let login = document.createElement("form")
    login.id = "login-form"
    const username = document.createElement('input')
    username.id = "username-input"
    username.name = "username"
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
    login.addEventListener("submit", e => {
        e.preventDefault()
        let username = e.target.username
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
            })
    })
}

function welcomeUser(user) {
    welcome.textContent = `Welcome ${user.name}`
    welcome.dataset.id = user.id
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
    if (e.target == ttt || e.target == soff) {
        // let div = document.createElement('div')
        // div.textContent = "Your current Score:"
        // let div2 = document.createElement('div')
        // div2.id = "actual-score"
        // div.append(div2)
        //
        // let divboard = document.createElement('div')
        // divboard.id = "board"
        //
        // body.append(div,divboard)
        if (e.target == ttt) {
            tictactoestart()
        } else {
            soffstart()
        }
    }
})