$.widget( "cs.sideNav", {

    // Sets the URL hash
    _setURLHash: function (id) {
        if(history.pushState) {
            history.pushState(null, null, id ? '#' + id : '');
        } else {
            location.hash = id ? '#' + id : '';
        }
    },


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

        this.scrollSnapParent.on('scrollSnap_change_page', function (event, newPageIndex) {
            that.$element.children().removeClass('active');
            that.buttonPageMap[newPageIndex][0].addClass('active');
            that._setURLHash(that.buttonPageMap[newPageIndex][1].attr('id'));
        });

        this.scrollSnapParent.trigger('scroll');

    },

    // Attempts to change to page with the given
    changePage : function (index) {
        this.scrollSnapParent.data('cs-scrollSnap').changePage(this.buttonPageMap[index][1]);
    }

});
