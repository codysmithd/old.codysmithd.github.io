function startProjectsBackground (scrollSnapParent) {

    var $page = $('#projects');

    // Setup background
    var c = document.getElementById('projects-bg');
    var ctx = c.getContext('2d');

    var onScroll = function () {
        // TODO
        //console.log(scrollSnapParent.scrollTop());
    }

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
