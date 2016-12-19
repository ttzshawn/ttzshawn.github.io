'use strict'
let http = require('http');
let os = require('os');
let qs = require('querystring');
let cc = process.argv[2];

let count = 0;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
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

/*function checkDomain(position, command, tld) {
	let sld = 'baidu';
	isDomainAvaliable(sld, tld)
}*/

function checkDomain(command, tld, cc) {
	let sld;
	if (false) {
		isDomainAvaliable(domain, tld)
	} else if (command == '2') {
		alphabet.forEach(letterA => {
			alphabet.forEach(letterB => {
				// alphabet.forEach(letterC => {
					// sld = `${letterA}${letterB}${letterC}`
					sld = `${letterA}${letterB}${cc}`
					isDomainAvaliable(sld, tld)
				// })
			})
		})
	}
}

// create server
function isDomainAvaliable(sld, tld) {
	let options = {
		hostname: api.hostname,
		path: `${api.path}?area_domain=${sld}.${tld}`,
		method: 'GET',
		headers: api.headers
	};
	let req = http.request(options, function (res) {
		res.setEncoding('utf8');
		count += 1;
		res.on('data', function (chunk) {
			if (chunk.indexOf('210') > 0) {
				console.log(`${sld}.${tld} is avaliable!`);
			} else if (count % 20 === 0) {
				console.log(`${count} now is 20 or ...`);
			}
		});
		// res.on('end', function () {

		// });
	});
	req.end();
}

let command = 2;
let tld = 'me';
// checkDomain(command, tld, 'fwelfejflwejf');
checkDomain(command, tld, cc);