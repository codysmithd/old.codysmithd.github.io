$.widget( "cs.scrollSnap", {

    options: {
        snap_delay:   600,
        snap_speed:   400,
        scroll_speed: 600
    },

    _create: function() {

        var that = this;
        this.$element = this.element;

        this.$current_view = null;
        this.timer = null;

        this.$element.addClass("scrollSnap_parent");
        this.$element.on('scroll', $.proxy(this._scrollFn, this));
        this.$element.bind('scroll mousedown DOMMouseScroll mousewheel keyup touchmove', function (e) {
            if(e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel'){
                that.element.stop();
            }
        });

    },

    // Called every time the container scrolls
    _scrollFn: function () {

        var that = this,
            centerOfViewport = (this.$element.outerHeight(true)/2) + this.$element.scrollTop(),
            heightSum = 0,
            currentPageIndex = 0,
            computedView;

        this.$element.children().each(function (index) {
            heightSum += $(this).outerHeight(true);
            if(heightSum >= centerOfViewport){
                computedView = $(this);
                currentPageIndex = index;
                return false;
            }
        });

        if(!computedView.is(this.current_view)){
            this.current_view = computedView;
            this.$element.trigger('changePage', currentPageIndex);
        }

        clearTimeout(this.timer);

        var newScrollTop = heightSum - that.current_view.outerHeight(true)/2 - this.$element.outerHeight(true)/2;

        this.timer = setTimeout(function () {
            that.$element.animate({
                scrollTop: newScrollTop + 'px'
            }, that.options.snap_speed);
        }, that.options.snap_delay)

    },

    // Scrolls to the specificed page
    changePage: function ($page) {

        this.$element.stop();

        var that = this,
            heightSum = 0;

        this.$element.children().each(function () {
            heightSum += $(this).outerHeight(true);
            if($(this).is($page)){
                return false;
            }
        });

        var newScrollTop = heightSum - $page.outerHeight(true)/2 - this.$element.outerHeight(true)/2;

        this.$element.animate({
            scrollTop: newScrollTop + 'px'
        }, that.options.scroll_speed, 'swing');
    }


});
