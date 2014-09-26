/*global jQuery */

/*! 
 * jquery.fontResizer - v 1.4
 * Copyright (c) 2014 Eder Lima - http://ederlima.com.br
 * License Attribution-ShareAlike 2.5 Generic (CC BY-SA 2.5) http://creativecommons.org/licenses/by-sa/2.5/
 *
 * Contributor: Bruno Gasparetto <brunogasparetto@gmail.com>
 */

/*
 * Options
 *
 * steps - Ammount of resizes (default 5)
 * sizeIncrement - Size to add or remove from each element (default 2)
 * smallerButton - Element to decrease the size (a valid jQuery selector)
 * biggerButton - Element to increase the size (a valid jQuery selector)
 * elements - An array of elements (strings, eg: 'li', 'p') to resize within the container
 * onIncrease - A callback function to call after increase the font size
 * onDecrease - A callback function to call after decrease the font size
 *
 * The callbacks receive the event, current step, max steps, the buttons (smallerButton and biggerButton) and the container.
 * The context in the callbacks is the element trigger the font resize.
*/
(function ($, console) {
    "use strict";

    var pluginName = "fontResizer",
        defaults = {
            steps: 5,
            sizeIncrement: 2,
            smallerButton: "",
            biggerButton: "",
            elements: ["p", "li", "blockquote", "cite", "dd", "dt", "h1", "h2", "h3", "h4", "h5", "h6", "span", "small", "td", "th"],
            onIncrease: null,
            onDecrease: null
        };

    function FontResizer(element, options) {
        this.container = $(element);
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    FontResizer.prototype = {
        init: function () {
            var self = this;

            self.step = Math.ceil(self.settings.steps / 2);
            self.settings.elements = self.settings.elements.join(",");
            self.settings.biggerButton.on("click." + pluginName, function (event) { self.increase(this, event); });
            self.settings.smallerButton.on("click." + pluginName, function (event) { self.decrease(this, event); });
        },

        increase: function (element, event) {
            var self = this;
            event.preventDefault();

            if (self.step + 1 > self.settings.steps) {
                return false;
            }
            self.step += 1;
            self.setFontSize(function (size) { return size + self.settings.sizeIncrement; });
            self.trigger("onIncrease", element, event);
        },

        decrease: function (element, event) {
            var self = this;
            event.preventDefault();

            if (self.step - 1 === 0) {
                return false;
            }
            self.step -= 1;
            self.setFontSize(function (size) { return size - self.settings.sizeIncrement; });
            self.trigger("onDecrease", element, event);
        },

        setFontSize: function (getNewValue) {
            var self = this;

            self.container.find(this.settings.elements).each(function () {
                var element = $(this),
                    specs = self.getSizeSpecs(element.css("font-size"));

                element.css("font-size", getNewValue(specs.number) + specs.unit);
            });
        },

        getSizeSpecs: function (fontSize) {
            var result = /(-?\d+)(\D+)/.exec(fontSize);
            
            return {
                number: parseFloat(result[1]),
                unit: result[2]
            };
        },

        trigger: function (callback, element, event) {
            if (!this.settings[callback]) {
                return;
            }
            this.settings[callback].call(
                element,
                event,
                this.step,
                this.settings.steps,
                {
                    smallerButton: this.settings.smallerButton,
                    biggerButton: this.settings.biggerButton
                },
                this.container
            );
        }
    };

    $.fn[pluginName] = function (options) {
        var config = $.extend({}, defaults, options);

        config.smallerButton = $(config.smallerButton);

        if (config.smallerButton.length !== 1) {
            console.error("smallerButton invalid");
            return false;
        }

        config.biggerButton = $(config.biggerButton);

        if (config.biggerButton.length !== 1) {
            console.error("biggerButton invalid");
            return false;
        }

        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new FontResizer(this, config));
            }
        });
    };

}(jQuery, window.console));
