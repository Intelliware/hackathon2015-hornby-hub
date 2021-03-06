'use strict';

var interval = 2.5;  // seconds
var targettime = 60; // seconds
exports.calculate = function(measure) {
	var factor = targettime / interval;

	measure.count = ( measure.count ? measure.count : 0 );
	measure.data = ( measure.data ? measure.data : 0 );
	measure.lambda = ( measure.lambda ? measure.lambda : 0 );
	measure.std = ( measure.std ? measure.std : 0 );

	measure.count++;
	factor = ( measure.count > factor ? factor : measure.count );

	measure.std = Math.sqrt( measure.std * measure.std * ( factor - 1 ) / factor + Math.pow( measure.data - measure.lambda , 2) / factor );
	measure.lambda = measure.lambda * ( factor - 1 ) / factor  + measure.data / factor ;

	measure.activity = measure.std ? Math.max( ( measure.data - measure.lambda ) / measure.std , 0) : 0;
	console.log( " >> lambda : " + JSON.stringify(measure) );
	return measure;
}



/*
var item = { };

item.data = 5; lambda(item);
console.log( JSON.stringify(item) );

item.data = 6; lambda(item);
console.log( JSON.stringify(item) );

for( var i = 0 ; i < 20 ; i++ ) { item.data = 7; lambda(item); console.log( JSON.stringify(item) ); }

item.data = 17; lambda(item);
console.log( JSON.stringify(item) );

item.data = 8; lambda(item);
console.log( JSON.stringify(item) );

for( var i = 0 ; i < 20 ; i++ ) { item.data = 5; lambda(item); console.log( JSON.stringify(item) ); }
*/
