class ChessBoard extends Array {
    constructor(...args) {
        super(...args)

        // 棋盘大小为 3 * 3 行列
        this.boardSize = 3
        // 棋盘格大小为30*30的方格
        this.gridSize = 150

        // 棋子颜色
        this.empty = 0
        this.black = 1
        this.white = -1

        this.chess = document.querySelector('#chess')
        this.context = this.chess.getContext('2d')
    }

    // 初始棋盘数据
    init() {
        for (let i = 0; i < this.boardSize; i++) {
            this[i] = new Array(this.boardSize)
            for (let j = 0; j < this.boardSize; j++) {
                this[i][j] = this.empty
            }
        }
    }

    show() {
        console.table(this)
    }

    // 绘制棋盘
    draw() {
        this.context.strokeStyle = "BFBFBF"
        for (let i = 1; i < this.boardSize; i++) {
            this.context.moveTo(i * this.gridSize, 0)   // 起点
            this.context.lineTo(i * this.gridSize, this.boardSize * this.gridSize)  // 终点
            this.context.stroke()
            this.context.moveTo(0, i * this.gridSize)
            this.context.lineTo(this.boardSize * this.gridSize, i * this.gridSize)
            this.context.stroke()
        }
    }

    // 重新绘制棋盘
    reDraw() {
        this.chess.setAttribute('height', `${this.boardSize * this.gridSize}px`)
        this.draw()
    }

    // 在i, j位置落color棋子
    oneStep(i, j, color) {
        this.context.font = `${this.gridSize}px serif`
        if (color == this.black) {
            this.context.fillText('X', i * this.gridSize, (j + 1) * this.gridSize, this.gridSize)
            this[i][j] = this.black
        } else if (color == this.white) {
            this.context.fillText('O', i * this.gridSize, (j + 1) * this.gridSize, this.gridSize)
            this[i][j] = this.white
        }
    }

    is(i, j, color) {
        return this[i] && this[i][j] === color
    }

    isEmpty(i, j) {
        return this.is(i, j, this.empty)
    }

    isBlack(i, j) {
        return this.is(i, j, this.black)
    }

    isWhite(i, j) {
        return this.is(i, j, this.white)
    }

    // 根据棋盘情况
    // 返回可以落子的位置
    possiblePlaces() {
        let places = []
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.isEmpty(i, j)) {
                    places.push([i, j])
                }
            }
        }
        return places
    }
}

export default ChessBoard;
