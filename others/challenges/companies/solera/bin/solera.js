#!/usr/bin/env node
var fs = require('fs'),
	path = require('path'),
	storeFac = require('../lib.js');
(function () {
	var args = [].slice.call(process.argv, 2),
		exe = path.basename(__filename),
		exeDir = path.dirname(path.dirname(__filename)),
		settingFilePath = "market.json";
		listFile = null,
		store = null;
	try {
		listFile = args[0];
		fs.readFile(exeDir + '/' + listFile, "utf8", function (err, data) {
			if (err) return help(err);
			store = storeFac.create(path.resolve(exeDir, settingFilePath));
			store.printReceipt(data);
		});
	} catch (e) {
		help();
	}
	function help (err) {
		console.log("\n" + exe + " usage:\n$ ./getReceipt relative/path/to/listFile\n");
		if (err) {
			console.log("ERROR: ");
			console.log(err.toString());
		}
	}
	
})();