module.exports = function( config ) {
	config.set( {
		files: [
			"dist/dragonzone.min.js",
			"test/setup.js",
			"test/spec/*"
		],
		frameworks: [ "qunit" ],
		autoWatch: true
	} );
};
