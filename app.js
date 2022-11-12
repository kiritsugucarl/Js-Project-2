const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerId
let xDirection = 3
let yDirection = 3
let score = 0

const initPlayerPos = [230, 10]
let currentPlayerPos = initPlayerPos

const initBallPos = [270, 40]
let currentBallPos = initBallPos

//class Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw my block
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//add player
const player = document.createElement('div')
player.classList.add('user')
drawPlayer()
grid.appendChild(player)

function drawPlayer() {
    player.style.left = currentPlayerPos[0] + 'px'
    player.style.bottom = currentPlayerPos[1] + 'px'
}

function drawBall() {
    ball.style.left = currentBallPos[0] + 'px'
    ball.style.bottom = currentBallPos[1] + 'px'
}

//player controls
function movePlayer(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPlayerPos[0] > 0) {
                currentPlayerPos[0] -= 10
                drawPlayer()
                break;
            }
        case 'ArrowRight':
            if (currentPlayerPos[0] < boardWidth - blockWidth) {
                currentPlayerPos[0] += 10
                drawPlayer()
                break;
            }

    }
}

document.addEventListener('keydown', movePlayer)

//create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move the ball
function moveBall() {
    currentBallPos[0] += xDirection
    currentBallPos[1] += yDirection
    drawBall()
    checkForCol()

}

timerId = setInterval(moveBall, 30)

//applying collision
function checkForCol() {
    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            (currentBallPos[0] > blocks[i].bottomLeft[0] && currentBallPos[0] < blocks[i].bottomRight[0]) && ((currentBallPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentBallPos[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeBallDirection()
            score++
            scoreDisplay.innerHTML = score

            //win conditions
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "WP YIYI BOY"
                clearInterval(timerId)
                document.removeEventListener('keydown', movePlayer)
            }
        }
    }


    //check for wall collision
    if (currentBallPos[0] >= (boardWidth - ballDiameter) || currentBallPos[1] >= (boardHeight - ballDiameter) || currentBallPos[0] <= 0) {
        changeBallDirection()
    }

    //check for player collision
    if ((currentBallPos[0] > currentPlayerPos[0] && currentBallPos[0] < currentPlayerPos[0] + blockWidth) && (currentBallPos[1] > currentPlayerPos[1] && currentBallPos[1] < currentPlayerPos[1] + blockHeight)) {
        changeBallDirection()
    }
    //game over
    if (currentBallPos[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'GGWP'
        document.removeEventListener('keydown', movePlayer)
    }
}

function changeBallDirection() {
    if (xDirection === 3 && yDirection === 3) {
        yDirection = -3
        return
    }

    if (xDirection === 3 && yDirection === -3) {
        xDirection = -3
        return
    }
    if (xDirection === -3 && yDirection === -3) {
        yDirection = 3
        return
    }
    if (xDirection === -3 && yDirection === 3) {
        xDirection = 3;
    }
}