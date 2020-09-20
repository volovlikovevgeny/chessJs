//26

let modal = document.getElementsByClassName('modal')[0]
let modalButton = document.getElementsByTagName('button')[0];

modalButton.addEventListener('click', function () {
    modal.style.display = 'none';
    startGame();
})


modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('playBtn')) {
        modal.style.display = 'none';
        startGame();
    }

})

let map = Array();
let inf = Array();

let moveColor = 'white';

let moveFromX;

let moveFromY;
let pawnAttackX;
let pawnAttackY;
var moveFigure;
let toFigure;



function initMap() {
    map = [
        //y0   y1  y2   y3   y4   y5    y6   y7
        ["R", " ", " ", " ", " ", " ", " ", "r"],//x=0
        ["N", " ", " ", " ", " ", " ", " ", "n"],//x=1
        ["B", " ", " ", " ", " ", " ", " ", "b"],//x=2
        ["Q", " ", " ", " ", " ", " ", " ", "q"],//x=3
        ["K", " ", " ", " ", " ", " ", " ", "k"],//x=4
        ["B", " ", " ", " ", " ", " ", " ", "b"],//x=5
        ["N", " ", " ", " ", " ", " ", " ", "n"],//x=6
        ["R", " ", " ", " ", " ", " ", " ", "r"] //x=7
    ]
}

function initInf() {
    inf = [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "]
    ]
};

function canMove(sx, sy, dx, dy) {
    if (!canMoveFrom(sx, sy)) {
        return false;
    }
    if (!canMoveTo(dx, dy)) {
        return false;
    }
    if (!isCorrectMove(sx, sy, dx, dy)) {
        return false;
    }
    if (!isCheck(sx, sy, dx, dy)) {
        return true;
    }
    return false;
}


function isCheck(sx, sy, dx, dy) {
    moveFigure(sx, sy, dx, dy);

    king = findFigure("K");
    map[king.x][king.y] = "P";

    backFigure(sx, sy, dx, dy);
}


function findFigure(figure) {
    for (let x = 0; x < 7; x++)
        for (let y = 0; y < 7; y++)
            if (map[x][y] == figure)
                return { x: x, y: y }
    return { x: -1, y: -1 }
}

function isCorrectMove(sx, sy, dx, dy) {
    let figure = map[sx][sy];

    if (isKing(figure)) {
        return isCorrectKingMove(sx, sy, dx, dy)
    }
    if (isQueen(figure)) {
        return isCorrectQueenMove(sx, sy, dx, dy)
    }
    if (isBishop(figure)) {
        return isCorrectBishopMove(sx, sy, dx, dy)
    }
    if (isKnight(figure)) {
        return isCorrectKnightMove(sx, sy, dx, dy)
    }
    if (isRook(figure)) {
        return isCorrectRookMove(sx, sy, dx, dy)
    }
    if (isPawn(figure)) {
        return isCorrectPawnMove(sx, sy, dx, dy)
    }
    return true;
}

function isKing(figure) { return figure.toUpperCase() == 'K' }
function isQueen(figure) { return figure.toUpperCase() == 'Q' }
function isBishop(figure) { return figure.toUpperCase() == 'B' }
function isKnight(figure) { return figure.toUpperCase() == 'N' }
function isRook(figure) { return figure.toUpperCase() == 'R' }
function isPawn(figure) { return figure.toUpperCase() == 'P' }



function isCorrectLineMove(sx, sy, dx, dy, figure) {

    let deltaX = Math.sign(dx - sx);
    let deltaY = Math.sign(dy - sy);

    if (!isCorrectLineDelta(deltaX, deltaY, figure)) {
        return false;
    }

    do {
        sx += deltaX;
        sy += deltaY;

        if (sx == dx && sy == dy) {
            return true;
        }
    } while (isEmpty(sx, sy)) {
        return false;
    }
}


function isCorrectLineDelta(deltaX, deltaY, figure) {

    if (isRook(figure)) {
        return isCorrectRookDelta(deltaX, deltaY);
    }
    if (isBishop(figure)) {
        return isCorrectBishopDelta(deltaX, deltaY);
    }
    if (isQueen(figure)) {
        return isCorrectQueenDelta(deltaX, deltaY);
    }
    return false;
}

function isCorrectRookDelta(deltaX, deltaY) {
    return Math.abs(deltaX) + Math.abs(deltaY) == 1
}

function isCorrectBishopDelta(deltaX, deltaY) {
    return Math.abs(deltaX) + Math.abs(deltaY) == 2
}

function isCorrectQueenDelta(deltaX, deltaY) {
    return true;
}

function isCorrectKingMove(sx, sy, dx, dy) {
    if (Math.abs(dx - sx) <= 1 && Math.abs(dy - sy) <= 1) {

        return true;
    }
}

function isCorrectQueenMove(sx, sy, dx, dy,) {
    return isCorrectLineMove(sx, sy, dx, dy, "Q")
}

function isCorrectBishopMove(sx, sy, dx, dy) {
    return isCorrectLineMove(sx, sy, dx, dy, "B")
}

function isCorrectKnightMove(sx, sy, dx, dy) {
    if (Math.abs(dx - sx) == 1 & Math.abs(dy - sy) == 2) {
        return true;
    }
    if (Math.abs(dx - sx) == 2 & Math.abs(dy - sy) == 1) {
        return true
    }
    return false;
}

function isCorrectRookMove(sx, sy, dx, dy) {
    return isCorrectLineMove(sx, sy, dx, dy, "R")
}

function isEmpty(x, y) {
    if (!onMap(x, y)) {
        return false;
    }
    return map[x][y] == " ";
}

function onMap(x, y) {
    return (x >= 0 && x <= 7 && y >= 0 && y <= 7)
}

function isCorrectPawnMove(sx, sy, dx, dy) {
    if (sy < 1 || sy > 6) {
        return false
    };
    if (getColor(sx, sy) == 'white') {
        return isCorrectSignPawnMove(sx, sy, dx, dy, 1)
    }
    if (getColor(sx, sy) == 'black') {
        return isCorrectSignPawnMove(sx, sy, dx, dy, -1)
    }
    return false;
}


function isCorrectSignPawnMove(sx, sy, dx, dy, sign) {
    if (isPawnPassant(sx, sy, dx, dy, sign)) {
        return true;
    }
    if (!isEmpty(dx, dy)) {  //Взятие?
        if (Math.abs(dx - sx) != 1) //шаг влево вправо 
            return false;
        return dy - sy == sign;
    }
    if (dx != sx)
        return false;
    if (dy - sy == sign)
        return true;
    if (dy - sy == sign * 2) {
        if (sy != 1 && sy != 6)
            return false;
        return isEmpty(sx, sy + sign)
    } //на 2 клетки
    return false;
}



function isPawnPassant(sx, sy, dx, dy, sign) {
    if (!(dx == pawnAttackX && dy == pawnAttackY)) {
        return false;
    }
    if (sign == +1 && sy != 4) {
        return false;
    }
    if (sign == -1 && sy != 3) {
        return false;
    }
    if (dy - sy != sign) {
        return false;
    }
    return (Math.abs(dx - sx) == 1)

}


function marksMoveFrom() {
    initInf();
    for (let sx = 0; sx <= 7; sx++) {
        for (let sy = 0; sy <= 7; sy++) {
            for (let dx = 0; dx <= 7; dx++) {
                for (let dy = 0; dy <= 7; dy++) {
                    if (canMove(sx, sy, dx, dy)) {
                        inf[sx][sy] = 1;
                    }
                }
            }
        }
    }
}

function markMoveTo() {
    initInf();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMove(moveFromX, moveFromY, x, y)) {
                inf[x][y] = 2;
            }
        }
    }
}

function canMoveFrom(x, y) {
    if (!onMap(x, y)) {
        return false;
    }
    return getColor(x, y) == moveColor;
}

function getColor(x, y) {
    let figure = map[x][y];
    if (figure == " ")
        return " ";
    return (figure.toUpperCase() == figure) ? "white" : "black";
}

function figureToHtml(figure) {
    switch (figure) {
        case 'K': return '&#9812'; case 'k': return "&#9818";
        case 'Q': return "&#9813"; case 'q': return "&#9819";
        case 'R': return "&#9814"; case 'r': return "&#9820";
        case 'B': return "&#9815"; case 'b': return "&#9821";
        case 'N': return "&#9816"; case 'n': return "&#9822";
        case 'P': return "&#9817"; case 'p': return "&#9823";
        default: return '&nbsp'
    }
}

function clickBox(x, y) {
    if (inf[x][y] == '1') {
        clickBoxFrom(x, y);
    }
    if (inf[x][y] == '2') {
        clickBoxTo(x, y);
    }
}

function clickBoxFrom(x, y) {
    moveFromX = x;
    moveFromY = y;
    markMoveTo();
    showMap();
}


function moveFigure(sx, sy, dx, dy) {

    fromFigure = map[sx][sy];
    toFigure = map[dx][dy];
    map[dx][dy] = fromFigure // записать координаты той фигуры которую мы предварительно сохранили в перменной
    map[sx][sy] = " ";
}

function backFigure(sx, sy, dx, dy) {
    map[sx][sy] = fromFigure;
    map[dx][dy] = toFigure;
}

function clickBoxTo(toX, toY) {

    moveFigure(moveFromX, moveFromY, toX, toY);
    promotePawn(fromFigure, toX, toY);

    checkPawnAttack(fromFigure, toX, toY);

    turnMove();
    marksMoveFrom();
    showMap();
}

function promotePawn(fromFigure, toX, toY) {
    if (!isPawn(fromFigure))
        return;
    if (!(toY == 7 || toY == 0))
        return;

    do {
        figure = prompt("Select figure to prompt: Q R B N", "Q");
    } while (!(
        isQueen(figure) ||
        isRook(figure) ||
        isBishop(figure) ||
        isKnight(figure))) {

        if (moveColor == "white")
            figure = figure.toUpperCase();
        else
            figure = figure.toLowerCase();
        map[toX][toY] = figure;
    }
}

function checkPawnAttack(fromFigure, toX, toY) {

    if (isPawn(fromFigure))
        if (toX == pawnAttackX && toY == pawnAttackY);
    if (moveColor == 'white') {
        map[toX][toY - 1] = " ";
    } else {
        map[toX][toY + 1] = " ";
    }

    pawnAttackX = -1;
    pawnAttackY = -1;
    if (isPawn(fromFigure))
        if (Math.abs(toY - moveFromX)) {
            pawnAttackX = moveFromX;
            pawnAttackY = (moveFromY + toY) / 2;
        }
}


function canMoveTo(x, y) {
    if (!onMap(x, y)) {
        return false;
    }
    if (map[x][y] == " ")
        return true;
    return getColor(x, y) != moveColor //white can eat black &&
}

function turnMove() {
    moveColor = moveColor == 'white' ? 'black' : 'white';
}

function showMap() {
    let html;
    html = "<table border='1' cellpadding='2' cellspacing='0'>"
    for (let y = 7; y >= 0; y--) {
        html += '<tr>'
        for (let x = 0; x <= 7; x++) {
            if (inf[x][y] == " ")
                color = (x + y) % 2 ? 'white' : 'lightblue';
            else
                color = inf[x][y] == "1" ? "#aaffaa" : "#00F260"
            html += "<td style='width:3rem;height:3rem;text-align:center;font-size:1.5rem;cursor:grab;background:"
                + color + ";" +
                "' onclick = clickBox(" + x + "," + y + ") >"
            html += figureToHtml(map[x][y])
            html += "</td >"
        }
        html += '</tr>'
    }
    document.getElementById('board').innerHTML = html;
}

function startGame() {
    initMap();
    marksMoveFrom();
    showMap();
}