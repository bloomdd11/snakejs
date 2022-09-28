const body = document.querySelector('body')
const box = document.querySelector('.box')
const blockNumber = 25
let blockSize = 20
let isGameOver = false
let snakeBody = []
let moveSnakeId
let applePosition = []
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
    visual.style.left = (this.left * blockSize) + 'px'
    visual.style.bottom = (this.bottom * blockSize) + 'px'

    box.appendChild(visual)
  }
}

function randomPosition() {
  let position = Math.floor(Math.random() * blockNumber)
  return position
}

function control(e) {
  if (e.key === 'ArrowUp') {
    moveUp()
  }
  if (e.key === 'ArrowDown') {
    moveDown()
  }
  if (e.key === 'ArrowLeft') {
    moveLeft()
  }
  if (e.key === 'ArrowRight') {
    moveRight()
  }
}

const crossingBlock = () => {
  for (let i = 0; i < blockNumber; i++) {
    new Snake([i, i])
  }
}

const initialSnake = () => {
  for (let i = 21; i < 23; i++) {
    console.log(i);
    let newSnake = new Snake([1, i])
    snakeBody.push(newSnake)
  }
}

const initialApple = () => {
  // let position = [randomPosition(), randomPosition()]
  let position = [1, 23]
  let newApple = new Apple(position)
  applePosition.push(newApple)
}

const gameOver = () => {
  setTimeout(() => {
    clearInterval(moveSnakeId)
    let msg = 'Game Over'
    isGameOver = true

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
  const { left: snakeHeadLeft, bottom: snakeHeadBottom } = snakeBody[0]
  const check9 = (snakeHeadLeft < 0)
  const check3 = (snakeHeadLeft >= 24)
  const check6 = (snakeHeadBottom < 0)
  const check12 = (snakeHeadBottom > 24)
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
  snakeBody = []

  // console.log(count);
  // count++

  copyBody.forEach(part => {
    let { left: snakeLeft, bottom: snakeBottom } = part

    let newSnake = new Snake([1, snakeBottom + 1])
    snakeBody.push(newSnake)

    part.visual.classList.remove('snake')
  })

  checkGameOver()
}

const hitApple = () => {
  let { left: appleLeft, bottom: appleBottom } = applePosition[0]
  let { left: headLeft, bottom: headBottom } = snakeBody[0]

  const isHit = (appleLeft === headLeft) && (appleBottom === headBottom)
  // console.log(isHit);
}

const moveUp = () => {
  console.log('move up');
}
const moveDown = () => {
  console.log('move down');
}
const moveLeft = () => {
  console.log('move Left');
}
const moveRight = () => {
  console.log('move Right');
}

let count = 1
function start() {
  if (!isGameOver) {
    // initialApple()
    initialSnake()
    moveSnakeId = setInterval(() => {
      moveSnake()
      // hitApple()
    }, 1000)
    addEventListener('keyup', control)
  }


}
start()