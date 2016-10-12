const headerParser = require('../parser/header_parser.js');
const iconvLite = require('iconv-lite');
const WorkerMigration = require('../model/WorkerMigration.js');
const csvParse = require('csv-parse');
const fs = require('fs');
const ps = require('promise-streams');
const _ = require('lodash');
const definition = require('../db/db.js').definition;
const Sequelize = require('sequelize');

let fileName = null;
let inputStream = null;

// header.json
const headerDefinition = headerParser.read();

/**
		Parses the csv file defined in 'file' and inserts all the records in the database
 */
exports.parseAndInsert = function(definition, file, year, success, error) {

	// file
	fileName = file;

	// file input stream
	inputStream = fs.createReadStream(file);

	// iconv stream
	const iconvDecodeStream = iconvLite.decodeStream('cp1252');	

	// when it reads the file header
	getFileHeader(function(header) {

		// csv parser
		const csvParser = defineCSVParser(header);

		// pipe all the streams in the proper order
		inputStream
			.pipe(iconvDecodeStream)
			.pipe(csvParser)
			.pipe(ps.map({concurrent: 256}, (row) => {

	      let workerMigration = new WorkerMigration(row,year);
	      workerMigration.redefineValues();

				let record = definition.build(workerMigration.record);

			 	record.save().then((worker) => {
			  	// ble
			  }).catch((err) => {
			  	error(err);
			  });

			}))

			.wait().then(_ => {
				 console.log('done!');
				 success();
			});

	});

}

function readFirstLine() {

	return new Promise(function (resolve, reject) {
    var rs = fs.createReadStream(fileName, 'binary');
    var acc = '';
    var pos = 0;
    var index;
    rs
      .on('data', function (chunk) {
        index = chunk.indexOf('\n');
        acc += chunk;
        index !== -1 ? rs.close() : pos += chunk.length;
      })
      .on('close', function () {
        resolve(acc.slice(0, pos + index).replace("\x0d", ""));
      })
      .on('error', function (err) {
        reject(err);
      })
  });

}

function defineCSVParser(header) {

	// needed so the parser will skip first line
	// if we set an array on 'columns' it will consider first line as a valid record
	
	// 	http://csv.adaltas.com/parse/ 	
	//  List of fields as an array, a user defined callback accepting the first line and returning the column names, 
	//	or true if autodiscovered in the first CSV line
	const headerFunction = function() {
		return header;
	};

	// parser stream to fetch csv data
	const parser = csvParse({
		delimiter: ';',
		columns: headerFunction,
		trim: true
	});

	parser.on('error', function(err){
		console.log(err);
	});

	return parser;

}

function getFileHeader(callback) {
		
	try {

		readFirstLine().then(function(line) {

			const columns = line.split(';');

			const finalHeader = [];

			// for each column in the first line
			columns.forEach((c) => {

				// goes through all the header.json elements
				Object.keys(headerDefinition).forEach((key) => {

					// checks if the column is in the 'original' array and pushes the element into the array
					// e.g. if column 'Município' is found then 'municipio' is pushed to the array
					_.find(headerDefinition[key].original, (value) => {
						
						if (c.trim() === value) {
							finalHeader.push(key);
						}

					});

				});

			});

			callback(finalHeader);
	
		});

	} catch(err) {
		console.log(err);
	}

};

