let username = ''
let parent = document.getElementById('parent')
function setUsername() {
    username = document.getElementById("inputUsername").value
    startGame()
}

function startGame() {
    parent.innerHTML = ''
    let usernameDisplay = parent.appendChild(document.createElement("div"))
    usernameDisplay.className = 'usernameDisplay'
    usernameDisplay.innerText = username
}
