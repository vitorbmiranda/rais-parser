const argv = require('yargs').argv;

const main = require('./src/main.js');

if (argv.file == null) {
  throw 'File argument not found';
}

if (argv.year == null) {
  throw 'Year argument not found'
}

main.go(argv.file, argv.year, (seq) => {
	console.log('Main finished');
	seq.close();
	process.exit(0);
});