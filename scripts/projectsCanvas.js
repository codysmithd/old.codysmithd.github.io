function projectsCanvas (scrollSnapParent) {

    var $page = $('#projects');

    // Setup background
    var canvas = document.getElementById('projects-bg');
    var context = canvas.getContext('2d');

    var triangles = [];
    var colors = ['#FAFAFA', '#EEEEEE', '#F5F5F5', '#E0E0E0',
        '#F7F7F7', '#E3E3E3', '#E7E7E7', '#F0F0F0'];

    var onScroll = function () {
        _drawBackground($page.offset().top);
    };

    // Draws an equilateral triangle from a set of 3 points with a color
    var _drawTriangle = function (triangle, offset) {
        var offset = offset/2;
        context.beginPath();
        context.moveTo(triangle.p1.x, triangle.p1.y - offset);
        context.lineTo(triangle.p2.x, triangle.p2.y - offset);
        context.lineTo(triangle.p3.x, triangle.p3.y - offset);
        context.lineTo(triangle.p1.x, triangle.p1.y - offset);
        context.fillStyle = triangle.color;
        context.fill();
    };

    // Returns random color from colors array
    var _getColor = function () {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Generates the triangles array to be drawn every time the page scrolls
    var _computeTriangles = function () {

        canvas.height = $page.outerHeight(true);
        canvas.width = $page.outerWidth(true);

        triangles = [];

        var size = 110,
            triangle_height = 0.43301270189 * size * 2;

        for (var y = -size; y < canvas.height + triangle_height; y += triangle_height){
          for (var x = -size/2; x < canvas.width + size; x += size) {

            var A = {
                    x: x - (size/2),
                    y: y + (Math.sqrt(3)/4) * size
                },
                B = {
                    x: x + (size/2),
                    y: y + (Math.sqrt(3)/4) * size
                },
                C = {
                    x: x,
                    y: y - (Math.sqrt(3)/4) * size
                },
                D = {
                    x: x + size,
                    y: y - (Math.sqrt(3)/4) * size
                };
            triangles.push({
                p1: A,
                p2: B,
                p3: C,
                color: _getColor()
            });
            triangles.push({
                p1: C,
                p2: B,
                p3: D,
                color: _getColor()
            });
          }
        }
    }

    // Draws the background (optional offset)
    var _drawBackground = function (offset) {
        triangles.forEach(function (triangle) {
            _drawTriangle(triangle, offset);
        });
    };

    _computeTriangles();
    _drawBackground();

    $(window).on('resize', function () {
      _computeTriangles();
      _drawBackground($page.offset().top);
    });

    scrollSnapParent.on('scrollSnap_view_visible_change', function (event, visible, $visiblePage) {

        if ($visiblePage.is($page)) {
            if (visible) {
                scrollSnapParent.on('scroll', onScroll);
            } else {
                scrollSnapParent.off('scroll', onScroll);
            }
        }
    });
}
