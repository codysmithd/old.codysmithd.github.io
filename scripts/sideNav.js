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
            that.buttonPageMap[index] = {
                button: $navButton,
                page: $(that.scrollSnapParent.children()[index])
            };
            $navButton.on('click touch', function () {
                that.changePage(index);
            });
        });

        this.scrollSnapParent.on('scrollSnap_change_page', function (event, newPageIndex) {
            that.$element.children().removeClass('active');
            that.buttonPageMap[newPageIndex].button.addClass('active');
            that._setURLHash(that.buttonPageMap[newPageIndex].page.attr('id'));
        });

        if (location.hash) {
            var requestedPage = $(location.hash);
            if (requestedPage.length === 1){
                this.scrollSnapParent.data('cs-scrollSnap').changePage(requestedPage);
            }
        }
        this.scrollSnapParent.trigger('scroll');

    },

    // Attempts to change to page with the given
    changePage : function (index) {
        this.scrollSnapParent.data('cs-scrollSnap').changePage(this.buttonPageMap[index].page);
    }

});
