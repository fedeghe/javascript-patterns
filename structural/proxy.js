/*
https://en.wikipedia.org/wiki/Proxy_pattern
*/
function GeoCoder() {
	this.getLatLng = function(address) {
		var data = {
			"Amsterdam": "52.3700° N, 4.8900° E",
			"London": "51.5171° N, 0.1062° W",
			"Paris": "48.8742° N, 2.3470° E",
			"Berlin": "52.5233° N, 13.4127° E"
		};
		return address in data ? data[address] : "NO DATA";
	};
}

function GeoProxy() {
	var geocoder = new GeoCoder();
	var geocache = {};

	return {
		getLatLng: function(address) {
			if (!geocache[address]) {
				geocache[address] = geocoder.getLatLng(address);
			}
			return geocache[address];
		},
		getCount: function() {
			var count = 0;
			for (var code in geocache) { count++; }
			return count;
		}
	};
};
	
var geo = new GeoProxy();

// geolocation requests

var res = [
	geo.getLatLng("Paris"),
	geo.getLatLng("London"),
	geo.getLatLng("London"),
	geo.getLatLng("London"),
	geo.getLatLng("London"),
	geo.getLatLng("Amsterdam"),
	geo.getLatLng("Amsterdam"),
	geo.getLatLng("Amsterdam"),
	geo.getLatLng("Amsterdam"),
	geo.getLatLng("London"),
	geo.getLatLng("London")
];

console.log(res);
console.log(geo.getCount());

