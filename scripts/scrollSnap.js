$.widget( "cs.scrollSnap", {

    options: {
        snap_delay:   600,
        snap_speed:   400,
        scroll_speed: 600
    },

    _create: function() {

        var that = this;
        this.$element = this.element;

        this.current_page = 0;
        this.timer = null;

        this.$element.addClass("scrollSnap_parent");
        this.$element.on('scroll', $.proxy(this._scrollFn, this));
        this.$element.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function (e) {
            if(e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel'){
                that.element.stop();
            }
        });
    },

    // Called every time the container scrolls
    _scrollFn: function () {

        var that = this;
        var computed_page = Math.round(this.$element.scrollTop()/this.$element.outerHeight(true));

        if(computed_page != this.current_page){
            this.current_page = computed_page;
        }

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
            that.$element.animate({
                scrollTop: that.current_page * that.$element.outerHeight(true) + 'px'
            }, that.options.snap_speed);
        }, that.options.snap_delay)

    },

    // Scrolls to the specificed page
    changePage: function (page) {

        var that = this;

        this.$element.stop();
        this.$element.animate({
            scrollTop: page * that.$element.outerHeight(true) + 'px'
        }, that.options.scroll_speed*page, 'swing');
    }


});
