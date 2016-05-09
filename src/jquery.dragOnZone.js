;(function ($, window, document, undefined) {

    function log(msg) {
        console.log('dragOnZone: ' + msg);
    }

    var defaults = {

        context: {},

        // By default, outZone is not used.
        // It that case, the functions onDragOutsideStart and
        // onDragOutsideEnd are never fired.
        outZone: false,

        // Functions fired when the mouse starts/ends to drag
        // a file over the element outZone (usually the body)
        onDragOutsideStart: function () {
            log('Drag outside start!');
        },
        onDragOutsideEnd: function () {
            log('Drag outside end!');
        },

        // Functions fired when the mouse starts/ends to drag
        // a file over the element dropZone (usually the body)
        onDragInsideStart: function () {
            log('Drag inside start!');
        },
        onDragInsideEnd: function () {
            log('Drag inside end!');
        },

        // Function fired when a file is dropped over dropZone element.
        onDropDone: function () {
            log('Drop done!');
        }
    };

    function Plugin(element, options) {

        this._defaults = defaults;
        this._state = {
            semaphore1: false,
            semaphore2: false,
            draggingOut: false,
            draggingZone: false
        };

        this.dropZone = $(element);
        if (this.dropZone.length > 0) {
            this.options = $.extend({}, defaults, options);
            this.outZone = $(this.options.outZone);
            this.init();
        } else {
            log('"dropZone" has not any element.');
        }
    }

    Plugin.prototype = {

        init: function () {

            var self = this;

            this.dropZone.on('drop', function (e) {
                self.options.onDropDone.apply(self.options.context, e);
            });

            if (this.outZone.length > 0) {

                this.outZone.on('dragover', function (e) {
                    if (!self._state.draggingOut) {
                        self._state.draggingOut = true;
                        if (self._state.semaphore1) {
                            self._state.semaphore1 = false;
                        } else {
                            self.options.onDragOutsideStart.apply(self.options.context, e);
                        }
                    }
                });

                this.outZone.on('dragleave', function (e) {
                    if (self._state.draggingOut) {
                        self._state.draggingOut = false;
                        if (self._state.semaphore1) {
                            self._state.semaphore1 = false;
                        } else {
                            self._state.semaphore1 = true;
                            setTimeout(function () {
                                if (self._state.semaphore1 && !self._state.draggingOut) {
                                    self._state.semaphore1 = false;
                                    self.options.onDragOutsideEnd.apply(self.options.context, e);
                                }
                            }, 50);
                        }
                    }
                });
            }

            this.dropZone.on('dragover', function (e) {
                if (!self._state.draggingZone) {
                    self._state.draggingZone = true;
                    if (self._state.semaphore2) {
                        self._state.semaphore2 = false;
                    } else {
                        self.options.onDragInsideStart.apply(self.options.context, e);
                    }
                }
            });

            this.dropZone.on('dragleave', function (e) {
                if (self._state.draggingZone) {
                    self._state.draggingZone = false;
                    if (self._state.semaphore2) {
                        self._state.semaphore2 = false;
                    } else {
                        self._state.semaphore2 = true;
                        setTimeout(function () {
                            if (self._state.semaphore2 && !self._state.draggingZone) {
                                self._state.semaphore2 = false;
                                self.options.onDragInsideEnd.apply(self.options.context, e);
                            }
                        }, 50);
                    }
                }
            });
        }
    };

    $.fn.dragOnZone = function (options) {
        return this.each(function () {
            if (!$.data(this, 'dragOnZone')) {
                $.data(this, 'dragOnZone',
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
