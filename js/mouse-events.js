/* Buttons utility
 *
 * Normalize input to a simple 5 way nav plus back button
 *
 */

(function(exports) {
    "use strict";

    /**
     * Buttons provides a simple abstraction for a 5-way nav plus back and media buttons.
     * Buttons trigger events: 'buttonpress', optionally 'buttonrepeat' at a decaying interval, and 'buttonrelease'
     * Only one button at a time can be pressed, other key events are ignored until that button is released.
     * Button codes are based on keyboard keyCodes for simplicity.
     * @return {*}
     * @constructor
     */
    function MouseEvents() {
        // make it a singleton
        if (exports.mouseEvents) {
            return mouseEvents;
        }
        
        Events.call(this, ['click', 'hover', 'wheel']);
        
        this.handleOnHover = function (e) {
            this.trigger("hover", {type: e.type});
        }.bind(this);
        

        this.handleOnClick = function (e) {

           var ele = e.target;
           let inClassList = false;

           for(var c=0; c<ele.classList.length; c++) {
               if(touchObj[ele.classList[c]]) {
                    touchObj[ele.classList[c]](e);
                    inClassList = true;
                    break;
               }
           }
            if(!inClassList) {
                this.trigger('click', {type: "click", target: e.target});
            }

           
        }.bind(this);

        this.handleOnWheel = function (e) {
            this.trigger('wheel', {type: 'wheel', dir: e.deltaY});
        }.bind(this);

        var touchObj = {};

        this.registerClickHandler = function(touchEle, touchHandler) {
            touchObj[touchEle] = touchHandler;
        };
    

        window.addEventListener("click", this.handleOnClick, false);
        window.addEventListener("wheel", this.handleOnWheel, false);

        this.registerHoverHandler = function(mouseEle) {
            mouseEle.addEventListener("mouseenter", this.handleOnHover, false);
            mouseEle.addEventListener("mouseleave", this.handleOnHover, false);
        }

        /*window.addEventListener("load", function () {
            const shovels = document.getElementsByClassName("shoveler-full-img");
            for (let i = 0; i < shovels.length; i++) {
                shovels[i].style.cursor = "pointer";
            }
        }.bind(this));*/
    }
    
    exports.MouseEvents = MouseEvents;
    exports.mouseevents = new MouseEvents();
}(window));
