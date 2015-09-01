$(document).ready(function(){
    var scrollSnapParent = $('.scrollSnap-container').scrollSnap();
    $('.sideNav').sideNav({
        scrollSnapParent: scrollSnapParent
    });
    startProjectsBackground(scrollSnapParent);
});
