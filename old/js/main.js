'use strict'
let http = require('http');
let os = require('os');
let qs = require('querystring');
let colors = require('colors');
let htmlparser = require('htmlparser2');
let commandParam = process.argv[2];
let indexParam = process.argv[3];

let index = indexParam ? parseInt(indexParam) : 0;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let alphabetArray = []

alphabet.forEach((a) => {
	alphabet.forEach((b) => {
		alphabetArray.push(`${a}${b}`)
	})
})

let api = {
	hostname: 'panda.www.net.cn',
	path: '/cgi-bin/check.cgi',
	headers: {
		'Content-Type': 'text/plain;charset=GBK',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36',
		Cookie: '',
		'x-forwarded-for': getMockIp()
	}
}

function getMockIp() {
	let r1 = Math.floor(Math.random() * 100),
		r2 = Math.floor(Math.random() * 100),
		r3 = Math.floor(Math.random() * 100),
		r4 = Math.floor(Math.random() * 100)
	return `1${r1}.1${r2}.1${r3}.1${r4}`;
}

function isDomainAvaliable(sldBParam, tld) {
	let sldA = `${alphabetArray[index]}`
	let sldB = sldBParam ? sldBParam : 'a'
	let options = {
		hostname: api.hostname,
		path: `${api.path}?area_domain=${sldA}${sldB}.${tld}`,
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain;charset=GBK',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36',
			Cookie: '',
			'x-forwarded-for': getMockIp()
		}
	};
	let req = http.request(options, function (res) {
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			// console.log(chunk);
			// console.log(index);
			// if (chunk.indexOf('210 ') > 0) {
			// 	console.log(`${sldA}${sldB}.${tld} is avaliable!`);
			// } else if (index % 20 === 0) {
			// 	console.log(chunk)
			// 	console.log(`${index} now is 20 or ...`);
			// }
			if (index < 677) {
				let parser = new htmlparser.Parser({
					ontext: function (text) {
						if (!!text.match(/(\d{3})\s\:/g)) {
							if (RegExp.$1 === '210') {
								console.log(`${sldA}${sldB}.${tld} is avaliable!`.green);
							} else {
								console.log(`${index} ${sldA}${sldB}.${tld} ${text}`.red);
							}
						}
					}
				}, { decodeEntities: true });
				parser.write(chunk)
				parser.end();
				isDomainAvaliable(`${sldB}`, tld)
			}
		});
		// res.on('end', function () {

		// });
		index += 1;
	});
	req.end();
}

const COMMAND = {
	singleDomain: 0,
	threeLetter: 1
}

let command = 2;
let tld = 'me';
// checkDomain(command, tld, 'fwelfejflwejf');
// checkDomain(commandParam, tld)
isDomainAvaliable(commandParam, 'me')