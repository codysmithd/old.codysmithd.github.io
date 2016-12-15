
var COLORS = {
    blue:  '#03A9F4',
    green: '#D4E157'
};

var canvas = document.getElementById('background-animation');
var canvasContext = canvas.getContext('2d');
var gradient;

var radius;
var currentAngle = 0;

var drawGradient = function () {

    // Calculate the start and end points
    var x1 = -1 *Math.cos(currentAngle) * radius;
    var x2 = Math.cos(currentAngle) * radius;
    var y1 = -1 *Math.sin(currentAngle) * radius;
    var y2 = Math.sin(currentAngle) * radius;

    // Translate because (0,0) is the top left, not the middle
    x1 = x1 + canvas.width/2;
    x2 = x2 + canvas.width/2;
    y1 = y1 + canvas.height/2;
    y2 = y2 + canvas.height/2;

    gradient = canvasContext.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, COLORS.blue);
    gradient.addColorStop(1, COLORS.green);

    // Clear canvas and draw rectangle filled with angled gradient
    canvasContext.clearRect(0,0, canvas.width,canvas.height);
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0,0, canvas.width,canvas.height);
};

var onResize = function () {
    radius = canvas.width > canvas.height ? canvas.width/2 : canvas.height/2;
    radius = radius * 1.5;
    drawGradient();
};
window.onresize = onResize;
onResize();

// Rotation
window.setInterval(function () {
    if (currentAngle >= (2*Math.PI)) {
        currentAngle = 0;
    } else {
        currentAngle += (Math.PI/180) * 1.5;
    }
    drawGradient();
}, 10);
