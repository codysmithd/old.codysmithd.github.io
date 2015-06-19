$(document).ready(function(){

    var parent = $('.scrollSnap-container').scrollSnap();

    $('#home-nav-about').click(function(){
        parent.scrollSnap('changePage', 1);
    });

    $('#home-nav-projects').click(function(){
        parent.scrollSnap('changePage', 2);
    });

    $('#home-nav-blog').click(function(){
        parent.scrollSnap('changePage', 3);
    });

});
