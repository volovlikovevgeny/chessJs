


function showMap() {
    let html;
    html = "<table border='1' cellpadding='2' cellspacing='0'    >"
    for (let y = 7; y >= 0; y--) {
        html += '<tr>'
        for (let x = 0; x <= 7; x++) {
            html += "<td style=height:50px;width:50px></td>"
        }
        html += '</tr>'
    }
    document.getElementById('board').innerHTML = html;
}
showMap()

