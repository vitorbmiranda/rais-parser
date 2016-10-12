const fs = require('fs');
const _ = require('lodash');
const HEADER_FILE = "header.json";
let headerAsJson = null;

/**
		Returns the header object (which is read only once)
 */
exports.read = function() {

	if (headerAsJson === null) {
		headerAsJson = getJsonFromFile(HEADER_FILE);
	}

	return headerAsJson;
	
}

/**	
		Parses the .json file, ordering by key
 */
function getJsonFromFile(fileName) {
	return sortKeysBy(JSON.parse(fs.readFileSync(fileName, 'utf8')));
}

function sortKeysBy (obj, comparator) {
	var keys = _.sortBy(_.keys(obj), function (key) {
		return comparator ? comparator(obj[key], key) : key;
	});

	return _.zipObject(keys, _.map(keys, function (key) {
		return obj[key];
  }));
}