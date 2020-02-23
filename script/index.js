import ChessBoard from './chess-board.js'
import {isVictory} from './estimate.js'
import nextPlace from './minimax.js'


// 棋盘
let chessBoard = new ChessBoard()
chessBoard.init()
chessBoard.draw()

// 棋子颜色
const BLACK = chessBoard.black
const WHITE = chessBoard.white

// 游戏是否结束
let isOver = false
// 双方棋子颜色
let [my, enemy] = [null, null]


let selectDiv = document.getElementById('select')
let whiteBtn = document.getElementById('white')
let blackBtn = document.getElementById('black')

let resetBtn = document.getElementById('reset')
resetBtn.style.display = 'none'


whiteBtn.onclick = function() {
    my = WHITE
    enemy = BLACK
    selectDiv.style.display = 'none'
    resetBtn.style.display = 'block'
    start()
}

blackBtn.onclick = function() {
    my = BLACK
    enemy = WHITE
    selectDiv.style.display = 'none'
    resetBtn.style.display = 'block'
    start()
}

function start() {
    // 让 BLACK 先走第一步
    if (my === WHITE) {
        chessBoard.oneStep(1, 1, BLACK)
    }

    chessBoard.chess.onclick = function(e) {
        if (isOver) {
            return
        }

        let i = Math.floor(e.offsetX / chessBoard.gridSize)
        let j = Math.floor(e.offsetY / chessBoard.gridSize)
        if (chessBoard.isEmpty(i, j)) {

            // 我方走
            chessBoard.oneStep(i, j, my)

            if (isVictory(chessBoard, [i, j], my)) {
                isOver = true
                setTimeout("alert('my win')", 0)
                return
            }

            if (chessBoard.possiblePlaces().length == 0) {
                isOver = true
                setTimeout("alert('tie')", 0)
                return
            }

            // 敌方走
            [i, j] = nextPlace(chessBoard, enemy)
            chessBoard.oneStep(i, j, enemy)
            if (isVictory(chessBoard, [i, j], enemy)) {
                isOver = true
                setTimeout("alert('enemy win')", 0)
            }

            if (chessBoard.possiblePlaces().length == 0) {
                isOver = true
                setTimeout("alert('tie')", 0)
                return
            }

        }
    }
}

// 重新开始
resetBtn.onclick = function() {
    isOver = false
    ;[my, enemy] = [null, null]
    chessBoard.chess.onclick = null
    selectDiv.style.display = 'block'
    resetBtn.style.display = 'none'
    chessBoard.init()
    chessBoard.reDraw()
}
