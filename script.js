let map = Array();

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




function showMap() {
    let html;
    html = "<table border='1' cellpadding='2' cellspacing='0'>"
    for (let y = 7; y >= 0; y--) {
        html += '<tr>'
        for (let x = 0; x <= 7; x++) {
            color = (x + y) % 2 ? 'white' : 'lightgreen';
            html += "<td style=text-align:center;height:50px;width:50px;background-color:" + color +
                ">";
            html += map[x][y]
            html += "</td >"
        }
        html += '</tr>'
    }
    document.getElementById('board').innerHTML = html;
}

initMap();
showMap();

