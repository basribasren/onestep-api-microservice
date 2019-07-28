const axios = require('axios');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

/**
 * parsing xml metadata to JSON
 * @param  {[type]} metadata [description]
 * @return {[type]}          [description]
 */
function getMetadata(metadata) {
	let data
	parser.parseString(metadata, function (err, result) {
		if (err) {
			throw new Error('Error while parsing!')
		} else {
			let metadata = JSON.stringify(result);
			data = metadata
		}
	});
	return data
}
/**
	Sample data suras
	[
		{
			'$': {
				index: '1',
				ayas: '7',
				start: '0',
				name: 'الفاتحة',
				tname: 'Al-Faatiha',
				ename: 'The Opening',
				type: 'Meccan',
				order: '5',
				rukus: '1'
			}
		},
		{ ... },
		{ ... }
	]
**/
/**
 * do convert attribute of metadata and 
 * do save as a json file
 * @param  {[type]} suras [description]
 * @return {[type]}       [description]
 */
function getSuras(suras) {
	const data = suras.map(sura => {
		const newData = convertData(sura['$'])
		return newData
	})
	return data
}

/**
 * convert attribute of metadata
 * @param  {[type]} sura [description]
 * @return {[type]}      [description]
 */
function convertData(sura) {
	const newSura = {
		numberOfSurah: sura.index,
		countOfAyat: sura.ayas,
		name: sura.name,
		tname: sura.tname,
		ename: sura.ename,
		type: sura.type,
		countOfOrder: sura.order,
		countOfRuku: sura.rukus,
	}
	return newSura
}

/**
 * save metadata as a JSON file
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function generateFile(data) {
	const json = JSON.stringify(data);
	return fs.writeFile('./metadata.json', json, 'utf8', function (err) {
		if (err) {
			return console.log(err.message)
		}
		return console.log('generate file metadata complete');
	});
}

function generate() {
	return axios.get('http://tanzil.net/res/text/metadata/quran-data.xml')
		.then(function (response) {
			const data = getMetadata(response.data)
			const metadata = JSON.parse(data)
			return metadata.quran
		})
		.then(function (metadata) {
			const suras = getSuras(metadata.suras[0].sura)
			generateFile(suras)
			return metadata
		})
		.catch(function (error) {
			return console.log(`Error generate metadata: ${error.message}`)
		})
}

generate()
