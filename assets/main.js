let username = ''
const forma = document.querySelector(".form")
const stats = document.querySelector(".stats")
const player = document.getElementById("player")
const usernameInput = document.getElementById("inputUsername")
let score = 0
let gameActive = true
let time

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
    document.querySelector('.blur').classList.toggle('blur')
    let usernameDisplay = document.querySelector(".username")
    usernameDisplay.className = 'usernameDisplay'
    usernameDisplay.innerText = username
    stats.classList.toggle('dn')
    player.classList.toggle('dn')

    // ----------------------------------------------------
    // STOPWATCH

    let seconds = 0
    let minutes = 0
    stopwatch()
    function stopwatch () {
        if (!gameActive) return
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
            time = document.querySelector('.stopwatch').innerText
        }, 1000)
    }
    // --------------------------------------------------------
    // PLAYER MOVEMENT

    let positionPlayer = 0

	document.addEventListener('keypress', (key) => {
		if (key.code === 'KeyA' && positionPlayer > -700) {
			positionPlayer -= 20
			player.style.transform = `translateX(${positionPlayer}px)`
		}

		if (key.code === 'KeyD' && positionPlayer < 700) {
			positionPlayer += 20
			player.style.transform = `translateX(${positionPlayer}px)`
		}
	})
    //  ------------------------------------------------
    // random delay of spawning fruits

    function spawnDelay() {
        let min = 1000
        let max = 5000
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // fruits array

    const fruits = [
        {
            name: 'banana',
            src: 'assets/media/banana.png'
        },
        {
            name: 'apple',
            src: 'assets/media/apple.png'
        },
        {
            name: 'orange',
            src: 'assets/media/orange.png'
        },
    ]

    // FRUITS SPAWN
    fruitSpawn()
    function fruitSpawn() {
        if (!gameActive) return
        
        const fruit = fruits[Math.floor(Math.random() * fruits.length)]
        const img = document.createElement('img')
        img.src = fruit.src
        img.alt = fruit.name
        img.style.position = 'absolute'
        img.style.width = '150px'
        img.style.top =  '42px'

        const x = Math.floor(Math.random() * 1700)
        img.style.left = x + 'px'

        document.body.appendChild(img)

        // define speed function

        let fallSpeed = 0
        function defineSpeed () {
            switch (img.alt) {
                case 'banana':
                    fallSpeed = 2
                    break;
                case 'apple':
                    fallSpeed = 3
                    break;
                case 'orange':
                    fallSpeed = 4
                    break;
            }
            return fallSpeed
        }


        // falling function

        let y = 42
        function fallStep() {
            if (img.classList.contains('collected')) return
            
            if (!gameActive) return
            
            y += defineSpeed()
            img.style.top = y + 'px'
            if (y < 950) {
                setTimeout(fallStep, 16)
                fruitCollect()
            } else {
                if (!img.classList.contains('collected')) {
                    img.remove()
                    hearts()
                }
            }
        }

        setTimeout(fallStep, 16)
        if (gameActive) {
            setTimeout(fruitSpawn, spawnDelay())
        }
    }

    // -------------------------------------------------------------------
    // HP FUNCTION

    function hearts () {
        let heartsCount = document.querySelector('.healthStats')
        let heartImages = heartsCount.querySelectorAll('img[alt="health"]')
        
        if (heartImages.length > 1) {
            let lastHeart = heartsCount.lastElementChild
            heartsCount.removeChild(lastHeart)
        } else {
            gameOver()
        }
    }

    // -------------------------------------------------------------------
    // GAME OVER FUNCTION

    function gameOver() {
        gameActive = false
        document.getElementById('parent').classList.toggle('blur')

        const gameOverDiv = document.querySelector('.gameOver')
        gameOverDiv.classList.toggle('dn')
        gameOverDiv.innerHTML = `ВЫ ПРОИГРАЛИ <br>Имя: ${username} <br>Время: ${time} <br>Поймано фруктов: ${score}`
        document.querySelector(".stats").classList.toggle('dn')

        const allFruits = document.querySelectorAll('img[alt="banana"], img[alt="apple"], img[alt="orange"]')
        allFruits.forEach(fruit => fruit.remove())
        player.style.display = 'none'
    }

    // ---------------------------------------------------------------
    // FUNCTION COLLECT

    function fruitCollect() {

        const playerRect = player.getBoundingClientRect()

        const fruits = document.querySelectorAll('img[alt="banana"], img[alt="apple"], img[alt="orange"]')
        
        fruits.forEach(fruit => {
            const fruitRect = fruit.getBoundingClientRect()

            if (fruitRect.left < playerRect.right &&
                fruitRect.right > playerRect.left &&
                fruitRect.top < playerRect.bottom &&
                fruitRect.bottom > playerRect.top) {
                fruit.classList.add('collected')
                fruit.remove()
                score++
                document.querySelector('.score').innerText = `Фруктов собрано: ${score}`
            }
        })
    }

}