import {isVictory} from './estimate.js'

function nextPlace(chessBoard, color) {
    let bestScore = -Infinity
    let bestPlace = null

    // 遍历 color 方所有可以落子的位置，返回最大估值的位置
    for (let [i, j] of chessBoard.possiblePlaces()) {

        chessBoard[i][j] = color

        let score = minimax(chessBoard, [i, j], color)

        chessBoard[i][j] = chessBoard.empty

        if (score > bestScore) {
            bestScore = score
            bestPlace = [i, j]
        }
    }

    return bestPlace
}

// 这一步走 color 颜色，希望 color 取得最大值
function minimax(chessBoard, place, color) {
    // 落在这步 color 获胜，返回 1
    if (isVictory(chessBoard, place, color)) {
        return 1
    }

    // 落在这步平手，返回 0
    if (chessBoard.possiblePlaces().length == 0) {
        return 0
    }

    // color 的敌方走
    // 敌方同样想要确定他的最好值的位置，
    // 我们取其负值，因为敌方的最好值对我们是最坏的
    let bestScore = -Infinity
    for (let [i, j] of chessBoard.possiblePlaces()) {

        chessBoard[i][j] = -color

        let score = minimax(chessBoard, [i, j], -color)

        chessBoard[i][j] = chessBoard.empty

        if (score > bestScore) {
            bestScore = score
        }
    }
    return -bestScore

}

export default nextPlace
