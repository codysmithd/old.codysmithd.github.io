$.widget( "cs.sideNav", {

    // REQUIRES scrollSnapParent in options, assumes page order and nav button order are the same
    _create: function() {

        var that = this;
        this.$element = this.element;
        this.scrollSnapParent = this.options.scrollSnapParent;

        this.buttonPageMap = {};

        this.$element.children().each(function(index){
            var $navButton = $(this);
            that.buttonPageMap[index] = [$navButton, $(that.scrollSnapParent.children()[index])];
            $navButton.on('click touch', function () {
                that.changePage(index);
            });
        });

        this.scrollSnapParent.on('changePage', function (event, newPageIndex) {
            that.$element.children().removeClass('active');
            that.buttonPageMap[newPageIndex][0].addClass('active');
        });

    },

    // Attempts to change to page with the given
    changePage : function (index) {
        this.$element.children().removeClass('active');
        this.buttonPageMap[index][0].addClass('active');
        this.scrollSnapParent.data('cs-scrollSnap').changePage(this.buttonPageMap[index][1]);
    }

});
