const body = document.querySelector('body')
const box = document.querySelector('.box')
const blockNumber = 25
let blockSize = 20
let isOver = false
let snakeBody = []
let moveSnakeId
// box size : 500x500
// blockNumber : 25
// blockSize : 500/25=20

class Snake {
  constructor(position) {
    this.visual = document.createElement('div')
    this.left = position[0]
    this.bottom = position[1]

    const visual = this.visual
    visual.classList.add('snake')
    visual.style.left = (this.left * blockSize) + 'px'
    visual.style.bottom = (this.bottom * blockSize) + 'px'

    box.appendChild(this.visual)
  }
}

class Apple {
  constructor(position) {
    this.visual = document.createElement('div')
    this.left = position[0]
    this.bottom = position[1]

    const visual = this.visual
    visual.classList.add('apple')
    visual.style.left = this.left + 'px'
    visual.style.bottom = this.bottom + 'px'

    box.appendChild(visual)
  }
}

function randomPosition() {
  let position = Math.floor(Math.random() * blockNumber) * 20
  return position
}

const crossingBlock = () => {
  for (let i = 0; i < blockNumber; i++) {
    new Snake([i, i])
  }
}

const initialSnake = () => {
  for (let i = 1; i < 4; i++) {
    let newSnake = new Snake([1, i])
    snakeBody.push(newSnake)
  }
}

const initialApple = () => {
  let applePosition = [randomPosition(), randomPosition()]
  new Apple(applePosition)
}

const gameOver = () => {
  setTimeout(() => {
    clearInterval(moveSnakeId)
    let msg = 'Game Over'

    while (box.lastChild) {
      box.removeChild(box.lastChild)
    }

    let gameOverMsg = document.createElement('p')
    gameOverMsg.textContent = msg
    gameOverMsg.classList.add('gameOver')

    box.appendChild(gameOverMsg)
    console.log(msg);
  }, 100)

}

const checkGameOver = () => {
  const isWallHit = checkWall()
  const isBodyHit = checkBody()

  isWallHit ? gameOver() : null
  isBodyHit ? gameOver() : null
}

const checkWall = () => {
  const snakeHead = snakeBody[0]
  const check9 = (snakeHead.left < 0)
  const check3 = (snakeHead.left > 24)
  const check6 = (snakeHead.bottom < 0)
  const check12 = (snakeHead.bottom > 24)
  // const check = [check9, check3, check6, check12]

  const isWallHit = (check9 || check3 || check6 || check12)
  return isWallHit
}

const checkBody = () => {
  const snakeHead = snakeBody[0]

  const isBodyHit = snakeBody.forEach(part => {
    const checkLeft = snakeHead.left === part.left
    const checkBottom = snakeHead.bottom === part.bottom
    const isBodyHit = checkLeft || checkBottom
    isBodyHit ? isBodyHit : null
  })
  return isBodyHit
}

const moveSnake = () => {
  let copyBody = [...snakeBody]
  copyBody.forEach(part => {
    let snakeLeft = part.left
    let snakeBottom = part.bottom

    let newSnake = new Snake([1, snakeBottom + 1])
    snakeBody.shift()
    snakeBody.push(newSnake)

    part.visual.classList.remove('snake')
  })
  checkGameOver()
}

let count = 0
function start() {
  initialApple()
  initialSnake()
  moveSnakeId = setInterval(() => {
    // let snakeHead = new Snake([23, 0])
    // snakeBody.push(snakeHead)
    moveSnake()
    checkGameOver()
  }, 1000)

}
start()