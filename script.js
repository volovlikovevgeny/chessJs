

let map = Array();
let inf = Array();

let moveColor = 'white';

let moveFromX;

let moveFromY;

function initMap() {
    map = [
        //y0   y1  y2   y3   y4   y5    y6   y7
        ["R", "P", " ", " ", " ", " ", "p", "r"],//x=0
        ["N", "P", " ", " ", " ", " ", "p", "n"],//x=1
        ["B", "P", " ", " ", " ", " ", "p", "b"],//x=2
        ["Q", "P", " ", " ", " ", " ", "p", "q"],//x=3
        ["K", "P", " ", " ", " ", " ", "p", "k"],//x=4
        ["B", "P", " ", " ", " ", " ", "p", "b"],//x=5
        ["N", "P", " ", " ", " ", " ", "p", "n"],//x=6
        ["R", "P", " ", " ", " ", " ", "p", "r"] //x=7
    ];
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


// function canMove(sx, sy, dx, dy) {
//     if (!canMoveFrom) {
//         return false;
//     }
//     if (!canMoveTo) {
//         return false;
//     }
//     if (!isCorrectMove) {
//         return false;
//     }
//     return true;
// }



function isCorrectMove(sx, sy, dx, dy) {

}


function marksMoveFrom() {
    initInf();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveFrom(x, y)) {
                inf[x][y] = 1;
            }
        }
    }
}

function markMoveTo() {
    initInf();
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            if (canMoveTo(x, y)) {
                inf[x][y] = 2;
            }
        }
    }
}

function canMoveFrom(x, y) {
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

function clickBoxTo(x, y) {
    map[x][y] = map[moveFromX][moveFromY] // записать координаты той фигуры которую мы предварительно сохранили в перменной
    map[moveFromX][moveFromY] = " ";
    turnMove();
    marksMoveFrom();
    showMap();
}


function canMoveTo(x, y) {
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
startGame();


