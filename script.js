const body = document.querySelector('body')
const box = document.querySelector('.box')
const snake = document.createElement('div')
const apple = document.createElement('div')
let applePosition = [0, 0]
let snakePosition = [0, 0]
let grid = 20
let controlTimer;
let snakeMoving = [1, 0, 0, 0]
let validMove = [1, 0]

class Snake {
  constructor(snakePosition) {
    this.snakePosition = snakePosition
    snake.classList.add('snake')
    snake.style.left = `${this.snakePosition[0]}px`
    snake.style.bottom = `${this.snakePosition[1]}px`

    if (
      this.snakePosition[0] < 0 ||
      this.snakePosition[0] > 480 ||
      this.snakePosition[1] < 0 ||
      this.snakePosition[1] > 480
    ) {
      snakePosition = [0, 0]
      gameOver()
    }

    box.appendChild(snake)
  }
}

class Apple {
  constructor() {
    this.applePosition = [randomPlace(480), randomPlace(480)]
    apple.classList.add('apple')
    apple.style.left = `${this.applePosition[0]}px`
    apple.style.bottom = `${this.applePosition[1]}px`
    box.appendChild(apple)
  }
}

const randomPlace = (r) => {
  let randomPlace = Math.floor(Math.random() * r)
  let position = (Math.floor(randomPlace / grid)) * grid
  return position
}

const createSnake = () => {
  s = new Snake(snakePosition)
  console.log(s.snakePosition);
}

const createApple = () => {
  let a = new Apple()
  console.log(a.applePosition);
}

const validSnakeMove = (snakeMoving) => {
  if (
    snakeMoving[0] == 1 ||
    snakeMoving[1] == 1
  ) {
    validMove = [0, 1]
  }
  if (
    snakeMoving[2] == 1 ||
    snakeMoving[3] == 1
  ) {
    validMove = [1, 0]
  }
  console.log(snakeMoving);
  console.log(validMove);
  return validMove
}

const moveUp = () => {
  let validUp = validSnakeMove(snakeMoving)
  if (validUp[0] == 1) {
    snakePosition[1] += grid
  }

  snakeMoving = [1, 0, 0, 0]
  new Snake(snakePosition)
}
const moveDown = () => {
  let validDown = validSnakeMove(snakeMoving)
  if (validDown[0] == 1) {
    snakePosition[1] -= grid
  }
  snakeMoving = [0, 1, 0, 0]
  new Snake(snakePosition)
}
const moveLeft = () => {
  let validleft = validSnakeMove(snakeMoving)
  if (validleft[1] == 1) {
    snakePosition[0] -= grid
  }
  snakeMoving = [0, 0, 1, 0]
  new Snake(snakePosition)
}
const moveRight = () => {
  let validRight = validSnakeMove(snakeMoving)
  if (validRight[1] == 1) {
    snakePosition[0] += grid
  }
  snakeMoving = [0, 0, 0, 1]
  new Snake(snakePosition)
}

const control = (e) => {
  if (e.key === 'w' || e.key === 'ArrowUp') {
    moveUp()
  }
  if (e.key === 's' || e.key === 'ArrowDown') {
    moveDown()
  }
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    moveLeft()
  }
  if (e.key === 'd' || e.key === 'ArrowRight') {
    moveRight()
  }
}

const snakeMove = (snakePosition) => {
  let [up, down, left, right] = snakeMoving
  up === 1 ? snakePosition[1] += grid : null
  down === 1 ? snakePosition[1] -= grid : null
  left === 1 ? snakePosition[0] -= grid : null
  right === 1 ? snakePosition[0] += grid : null

  new Snake(snakePosition)
}

const gameOver = () => {
  clearInterval(controlTimer)
  while (box.firstChild) {
    box.removeChild(box.firstChild)
  }
  console.log('Game Over');
}

function start() {
  createSnake()
  createApple()
  controlTimer = setInterval(() => {
    snakeMove(snakePosition)
    body.addEventListener('keyup', control)
  }, 1000)
}

start()