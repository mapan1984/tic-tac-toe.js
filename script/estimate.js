// 在 place 落 color 颜色棋子后，该棋子是否在[cx, cy]方向的这一行取得胜利
function victoryInLine(chessBoard, place, color, cx, cy) {
    let cnt = 1;

    let [i, j] = place;
    let [x, y] = [i + cx, j + cy];

    for (; chessBoard.is(x, y, color); x += cx, y += cy) {
        cnt++;
    }

    [x, y] = [i - cx, j - cy];
    for (; chessBoard.is(x, y, color); x -= cx, y -= cy) {
        cnt++;
    }

    return cnt >= 3
}

// 判断 chessBoard 中 place 位置的 color 颜色棋子是否取得胜利
function isVictory(chessBoard, place, color) {
    // 依次从四个方向判断是否取得胜利
    return (
        victoryInLine(chessBoard, place, color, 1, 0)      // row
        || victoryInLine(chessBoard, place, color, 0, 1)   // col
        || victoryInLine(chessBoard, place, color, 1, 1)   // left, x+1,y+1 or x-1,y-1
        || victoryInLine(chessBoard, place, color, -1, 1)  // right, x+1,y-1 or x-1,y+1
    )
}

export {isVictory};
