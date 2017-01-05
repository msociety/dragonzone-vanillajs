
const defaults = {
    debug: false,

    // DOM element
    dropZone: null,

    // By default, outZone is not used.
    // It that case, the functions onDragOutsideStart and onDragOutsideEnd are never fired.
    outZone: false,

    // Functions fired when the mouse starts/ends to drag a file over the element outZone (usually the body)
    onDragOutsideStart: () => {},
    onDragOutsideEnd: () => {},

    // Functions fired when the mouse starts/ends to drag a file over the element dropZone
    onDragInsideStart: () => {},
    onDragInsideEnd: () => {},

    // Function fired when a file is dropped over dropZone element.
    onDropDone: () => {}
};

const log = (msg) => console.log('dragOnZone: ' + msg);

const _checkDomElem = (o) => {
    return typeof o === 'object' && o.tagName;
};

class DragOnDrop {

    constructor(options) {
        this._initState();
        this._initHandlers();
        if (_checkDomElem(options.dropZone)) {
            // this.options = Object.assign({}, defaults, options);
            this.options = { ...defaults, ...options };
            // this.init();
        } else {
            log('"dropZone" is not a DOM element.');
        }
    }

    _initState() {
        this._state = {
            semaphore1: false,
            semaphore2: false,
            draggingOut: false,
            draggingZone: false
        };
    }

    _initHandlers() {
        this._handlers = {
            drop: null,
            dragOverOut: null,
            dragLeaveOut: null,
            dragOverIn: null,
            dragLeaveIn: null
        };
    }

    _onDrop(e) {
        e.preventDefault();
        this._initState();
        if (this.options.debug) log('Drop done!');
        this.options.onDropDone(e);
    }

    _dragOverOut(e) {
        e.preventDefault();
        if (!this._state.draggingOut) {
            this._state.draggingOut = true;
            if (this._state.semaphore1) {
                this._state.semaphore1 = false;
            } else {
                if (this.options.debug) {
                    log('Drag outside start!');
                }
                this.options.onDragOutsideStart(e);
            }
        }
    }

    _dragLeaveOut(e) {
        e.preventDefault();
        if (this._state.draggingOut) {
            this._state.draggingOut = false;
            if (this._state.semaphore1) {
                this._state.semaphore1 = false;
            } else {
                this._state.semaphore1 = true;
                setTimeout(() => {
                    if (this._state.semaphore1 && !this._state.draggingOut) {
                        if (this.options.debug) {
                            log('Drag outside end!');
                        }
                        this._state.semaphore1 = false;
                        this.options.onDragOutsideEnd(e);
                    }
                }, 50);
            }
        }
    }

    _dragOverIn(e) {
        e.preventDefault();
        if (!this._state.draggingZone) {
            this._state.draggingZone = true;
            if (this._state.semaphore2) {
                this._state.semaphore2 = false;
            } else {
                if (this.options.debug) {
                    log('Drag inside start!');
                }
                this.options.onDragInsideStart(e);
            }
        }
    }

    _dragLeaveIn(e) {
        e.preventDefault();
        if (this._state.draggingZone) {
            this._state.draggingZone = false;
            if (this._state.semaphore2) {
                this._state.semaphore2 = false;
            } else {
                this._state.semaphore2 = true;
                setTimeout(() => {
                    if (this._state.semaphore2 && !this._state.draggingZone) {
                        if (this.options.debug) {
                            log('Drag inside end!');
                        }
                        this._state.semaphore2 = false;
                        this.options.onDragInsideEnd(e);
                    }
                }, 50);
            }
        }
    }

    init() {
        this._handlers.drop = this.options.dropZone.addEventListener('drop', this._onDrop.bind(this));
        if (_checkDomElem(this.options.outZone)) {
            this._handlers.dragOverOut = this.options.outZone.addEventListener('dragover', this._dragOverOut.bind(this));
            this._handlers.dragLeaveOut = this.options.outZone.addEventListener('dragleave', this._dragLeaveOut.bind(this));
        }
        this._handlers.dragOverIn = this.options.dropZone.addEventListener('dragover', this._dragOverIn.bind(this));
        this._handlers.dragLeaveIn = this.options.dropZone.addEventListener('dragleave', this._dragLeaveIn.bind(this));
    }

    removeHandlers() {
        this.dropZone.removeEventListener('drop', this._handlers.drop);
        if (_checkDomElem(this.options.outZone)) {
            this.outZone.removeEventListener('dragover', this._handlers.dragOverOut);
            this.outZone.removeEventListener('dragleave', this._handlers.dragLeaveOut);
        }
        this.dropZone.removeEventListener('dragover', this._handlers.dragOverIn);
        this.dropZone.removeEventListener('dragleave', this._handlers.dragLeaveIn);
    }
}

export default DragOnDrop;
