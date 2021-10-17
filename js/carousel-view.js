/*
*
* Controls the shoveler view and displays the index 
*
*/

(function (exports) {
    "use strict";

    /**
     * @class CarouselView
     * @description Iterates through the shoveler view
     */

    function CarouselView() {
        //global jquery variables 
        this.$el = null;
        this.$rowElements = null;
        this.rowsData = null;
        this.currSelection = 0;
        
        //constants
        this.PREV = null;
        this.NEXT = null;
        this.carouselCount = null;

        Events.call(this, ['indexChange']);

        this.fadeOut = function() {
            this.$el.css("opacity", "0");
        };

        this.fadeIn = function() {
            this.$el.css("opacity", "");
        };

        /**
         * Removes the main content view dom
         */
        this.remove = function () {
            // remove this element from the dom
            this.$el.remove();
        };

        /**
         * Hides the shoveler view
         */
        this.hide = function () {
            this.$el.css("opacity", "0");
        };

        /**
         * Shows the shoveler view
         */
        this.show = function () {
            this.$el.css("opacity", "");
        };

        this.render = function(el, row) {
            this.$el = el;

            var html = utils.buildTemplate($("#carousel-control-template"), {
                curr: this.currSelection + 1,
                totalVids: row.length
            });
            this.rowsData = row;
            el.append(html);

            this.PREV = this.$el.find("#prev")[0];
            this.NEXT = this.$el.find("#next")[0];
            this.carouselCount = this.$el.find("#carousel-count")[0];
            
            mouseevents.registerClickHandler("carousel-nav-but", this.carouselNav);
        };

        this.carouselNav = function (e) {
            let targetIndex = null;
            if (e.target == this.PREV) {
               (this.currSelection == 0) ? targetIndex = this.currSelection : targetIndex = this.currSelection - 1;
            } else {
                (this.currSelection == this.rowsData.length - 1) ? targetIndex = this.currSelection : targetIndex = this.currSelection + 1;
            }
            this.trigger("indexChange", targetIndex);
        }.bind(this);

        this.updateIndex = function (index) {
            this.currSelection = index;
            if(this.rowsData) {
                this.carouselCount.innerHTML = this.currSelection + 1 + '/' + this.rowsData.length; 
            } else {
                throw new Error("this.rowsData is undefined");
            }
        }.bind(this);

    }
    exports.CarouselView = CarouselView;
}(window));