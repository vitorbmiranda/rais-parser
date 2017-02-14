'use strict';

const _ = require('lodash');
const db = require('./db/db.js');
const cvsParser = require('./parser/csv_parser.js');

/**
	Go!
*/
exports.go = function(file, year, done) {

	initializeLodash();

	db.initDb((seq, definition) => {

        cvsParser.parseAndInsert(definition, file, year, () => {
            console.log(`SUCCESS - Finished ${file}`);
            done(seq);
        }, (err) => {
            console.log(`ERROR - ${err}`);
            done(seq);
        });

    });

}

function initializeLodash() {

	// this adds a new sortKeysBy method
	_.mixin({
    'sortKeysBy': function (obj, comparator) {
        var keys = _.sortBy(_.keys(obj), function (key) {
            return comparator ? comparator(obj[key], key) : key;
        });
    
        return _.zipObject(keys, _.map(keys, function (key) {
            return obj[key];
        }));
    }
	});

}