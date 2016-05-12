# jQuery DragOnZone [![Build Status](https://secure.travis-ci.org/jquery-boilerplate/jquery-boilerplate.svg?branch=master)](https://travis-ci.org/jquery-boilerplate/jquery-boilerplate) ![Bower Version](https://badge.fury.io/bo/jquery-boilerplate.svg)

#### Detect drag & drop events outside the Drop Zone.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="your/path/to/dist/jquery.dragonzone.min.js"></script>
	```

3. Call the plugin:

	´´´javascript
	$("#dropZone").dragOnZone(options);
	´´´

## [Demo](http://miguel-molina.es/dragonzone/)

## Options

*outZone* false (default) | element (Dom element, jQuery selector, or jQuery element)
By default, outZone is not used. In case you don't define outZone, the functions onDragOutsideStart and onDragOutsideEnd are never fired.

*context*
You could define the context (e.g. "context: this") inside functions onDragOutsideStart, onDragOutsideEnd, onDragInsideStart, onDragInsideEnd and onDropDone.

*debug*
Show or hide console logs.

*onDragOutsideStart*: function
Custom function fired when the mouse starts dragging a file over the element outZone

*onDragOutsideEnd*: function
Custom function fired when the mouse ends dragging a file over the element outZone

*onDragInsideStart*: function
Custom function fired when the mouse starts dragging a file over the element dropZone

*onDragInsideEnd*: function
Custom function fired when the mouse ends dragging a file over the element dropZone

*onDropDone*: function
This function is executed after dropping the file inside the Drop Zone.
