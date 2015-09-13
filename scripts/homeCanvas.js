function homeCanvas (scrollSnapParent) {

    var $page = $('#home');

    // Setup background
    var canvas = document.getElementById('home-bg');
    var context = canvas.getContext('2d');

    var lines = [];

    // Generates a cluster of points which will be drawn
    var _generateBackground = function () {

        canvas.height = $page.outerHeight(true);
        canvas.width = $page.outerWidth(true);

        var size = 16;

        lines = [];

        for (var i = 0; i < canvas.width; i += size) {
            lines.push({
                startX: i,
                endX: i,
                startY: 0,
                endY: canvas.height
            });
        }

        for (i = 0; i < canvas.height; i += size) {
            lines.push({
                startX: 0,
                endX: canvas.width,
                startY: i,
                endY: i
            });
        }

    }

    // Draws the background
    var _drawBackground = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);

        var gradient = context.createRadialGradient(canvas.width/2,canvas.height/2,0,canvas.width/2,canvas.height/2,canvas.width/2);
        gradient.addColorStop(0.25,'#F5F5F5');
        gradient.addColorStop(0.5,'#F0F0F0');
        gradient.addColorStop(1,'#E0E0E0');

        lines.forEach(function (segment) {
            context.beginPath();
            context.moveTo(segment.startX, segment.startY);
            context.lineTo(segment.endX, segment.endY);
            context.strokeStyle = gradient;
            context.stroke();
        });
    };

    _generateBackground();
    _drawBackground();

    $(window).on('resize', function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        _generateBackground();
        _drawBackground();
    });

}
