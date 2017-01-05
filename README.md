# VanillaJS dragOnZone

## TODO

1. Refactor jquery dependant code. "jquery.dragOnZone.js" -> "dragonzone.js"

#### Detect drag & drop events outside the Drop Zone.

## Usage

1. Include plugin's code:

	```html
	<script src="your/path/to/dist/dragonzone.min.js"></script>
	```

2. Call the plugin:

	```javascript
	// OLD WAY:
	// $("#dropZone").dragOnZone(options);
	```

## [Demo](http://miguel-molina.es/dragonzone-vanillajs/)

## Options

  Name                | Type                                  | Default          | Description
----------------------|---------------------------------------|------------------|-------------
 `outZone`            | boolean, Dom element,                                    | false         | By default, outZone is not used. In case you don't define outZone, the functions onDragOutsideStart and onDragOutsideEnd are never fired.
 `context`            | Object                                | {}               | You could define the context (e.g. "context: this") inside functions onDragOutsideStart, onDragOutsideEnd, onDragInsideStart, onDragInsideEnd and onDropDone.
 `debug`              | boolean                               | false            | Show or hide console logs.
 `onDragOutsideStart` | function                              | void function    | Custom function fired when the mouse starts dragging a file over the element outZone
 `onDragOutsideEnd`   | function                              | void function    | Custom function fired when the mouse ends dragging a file over the element outZone
 `onDragInsideStart`  | function                              | void function    | Custom function fired when the mouse starts dragging a file over the element dropZone
 `onDragInsideEnd`    | function                              | void function    | Custom function fired when the mouse ends dragging a file over the element dropZone
 `onDropDone`         | function                              | void function    | This function is executed after dropping the file inside the Drop Zone.
