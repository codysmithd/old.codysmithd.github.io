$(document).ready(function(){
    var scrollSnapParent = $('.scrollSnap-container').scrollSnap();
    $('.sideNav').sideNav({
        scrollSnapParent: scrollSnapParent
    });
    projectsCanvas(scrollSnapParent);
    homeCanvas(scrollSnapParent);
});
