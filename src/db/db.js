const Sequelize = require('sequelize');
const headerParser = require('../parser/header_parser.js');
const WorkerMigration = require('../model/WorkerMigration.js')

/**
		Initiates DB and defines the WorkerMigration model
 */
exports.initDb = function(callback) {

	// define sequelize DB conn
	const seq = initSequelize();

	// get header object
	const header = headerParser.read();

	// redefine types as sequelize types
	redefineTypes(header);

	// define worker migration table
	const SeqWorkerMigration = seq.define('worker_migration', header, { timestamps: false });

	// sync with db
	SeqWorkerMigration.sync({force: false}).then(function() {
		callback(SeqWorkerMigration);
	}).catch((err) => {
  	console.log(err);
  });;

}

/**
		Redefine all the types in the header.json using sequelizeType
 */
function redefineTypes(header) {

	Object.keys(header).forEach((key) => {
		header[key].type = sequelizeType(header[key].type); 
	});

}

/**
		Creates a Sequelize object instance, defining the DB connection
 */
function initSequelize() {

	return new Sequelize('rais', 'rais', 'rais#1', {
  	host: '192.168.0.6',
  	dialect: 'postgres',
  	logging: false,

  	pool: {
    	max: 128,
    	min: 10,
    	idle: 100
  	},

	});

}

/**
		Transforms the types in header.json in Sequelize types, as 
		defined in http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types
	*/
function sequelizeType(type) {

	switch(type) {
		case 'STRING'		: return Sequelize.STRING;
		case 'INTEGER'	: return Sequelize.INTEGER;
		case 'DECIMAL' 	: return Sequelize.DECIMAL(18,6);
		case 'BOOLEAN'	: return Sequelize.BOOLEAN;
		case 'DATE'			: return Sequelize.DATEONLY;
		default:
			throw `Bad type in header JSON - ${type}`;
	}

}