let username = ''
const parent = document.getElementById('parent')
const forma = document.querySelector(".form")
const stats = document.querySelector(".stats")
const player = document.getElementById("player")
const usernameInput = document.getElementById("inputUsername")

usernameInput.addEventListener("input", () => {
    if (usernameInput.value.length < 2) {
        document.querySelector('.submitButton').style.background = 'gray'
    }
    else {
        document.querySelector('.submitButton').style.background = '#ffee60'
        document.querySelector('.submitButton').addEventListener('click',  setUsername)
    }
})

// USERNAME FUNC

function setUsername() {
    username = document.getElementById("inputUsername").value
    if (username.length < 2) return
    startGame()
}

// START GAME FUNC

function startGame() {
    forma.style.display = 'none'
    let usernameDisplay = document.querySelector(".username")
    usernameDisplay.className = 'usernameDisplay'
    usernameDisplay.innerText = username
    stats.classList.toggle('dn')
    player.classList.toggle('dn')

    // STOPWATCH

    let seconds = 0
    let minutes = 0
    stopwatch()
    function stopwatch () {
        setTimeout(() => {
            if (seconds === 60) {
                minutes++
                seconds = 0
            }

            if (seconds < 10) {
                document.querySelector('.stopwatch').innerText = `${minutes}:0${seconds}`
            } else {
                document.querySelector('.stopwatch').innerText = `${minutes}:${seconds}`
            }

            seconds += 1
            stopwatch()
        }, 1000)
    }

    // PLAYER MOVEMENT

    let positionPlayer = 0

	document.addEventListener('keydown', (key) => {
		if (key.code === 'KeyA' && positionPlayer > -700) {
			positionPlayer -= 20
			player.style.transform = `translateX(${positionPlayer}px)`
		}

		if (key.code === 'KeyD' && positionPlayer < 700) {
			positionPlayer += 20
			player.style.transform = `translateX(${positionPlayer}px)`
		}
	})



}


