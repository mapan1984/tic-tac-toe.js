// 是否在[cx, cy]方向的这一行取得胜利
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
    if (cnt >= 3) {
        return true;
    } else {
        return false;
    }
}

// 判断chessBoard中位置在place位置的color棋是否取得胜利
function isVictory(chessBoard, place, color) {
    // 四个方向的连子数，初始为1
    let row = victoryInLine(chessBoard, place, color, 1, 0);
    let col = victoryInLine(chessBoard, place, color, 0, 1);
    let left = victoryInLine(chessBoard, place, color, 1, 1);
    let right = victoryInLine(chessBoard, place, color, -1, 1);
    if (row || col || left || right) {
        return true;
    } else {
        return false;
    }
}

export {isVictory};
