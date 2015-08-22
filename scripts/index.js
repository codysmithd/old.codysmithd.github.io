$(document).ready(function(){
    var scrollSnap = $('.scrollSnap-container').scrollSnap();
    $('.sideNav').sideNav({
        scrollSnapParent: scrollSnap
    });
});
