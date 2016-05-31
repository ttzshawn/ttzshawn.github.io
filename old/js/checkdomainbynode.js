var http = require('http'); 
var os =require('os');
var qs = require('querystring');  

var count = 0;
var correct = '210';
var command = 2;
var let = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
var contentType = 'text/plain;charset=GBK';
var userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36';

var urlTail = '.com';
var position = new Array(0, 25, 0, 25, 0, 25, 0, 25);

search(position, command, urlTail);

/*function search(position, command, urlTail) {
	var urlMid = 'baidu';
	checkDomain(urlMid, urlTail)
}*/

function search(position, command, urlTail) {
	var urlMid;
	if (command == '2') {
		for (var i1 = position[0]; i1 < position[1]; i1++) {
			for (var i2 = position[2]; i2 < position[3]; i2++) {
				urlMid = let[i1] + let[i2];
				checkDomain(urlMid, urlTail)
			}
		}
	}
}

// create server
function checkDomain(urlm, urlt) {
	var r1 = Math.floor(Math.random() * 100);
	var r2 = Math.floor(Math.random() * 100);
	var r3 = Math.floor(Math.random() * 100);
	var r4 = Math.floor(Math.random() * 100);
	var rip = '1' + r1 + '.1' + r2 + '.1' + r3 + '.1' + r4;
	var options = {  
		hostname: 'panda.www.net.cn', 
		path : '/cgi-bin/check.cgi?area_domain=' + urlm + urlt,
		method: 'GET',
		headers: { 'Content-Type':contentType,'User-Agent': userAgent, Cookie:'', 'x-forwarded-for':rip}
	};
	var req = http.request(options, function (res) {  
		res.setEncoding('utf8');  
		count += 1;
		res.on('data', function (chunk) { 
			if (chunk.indexOf('210') > 0) {
				console.log(urlm + urlt);
			} else {
				console.log();
			}
		});
		res.on('end', function () {});
	});  
	req.end();
}

/**
 * __utma=1.754859867.1407393440.1409572473.1410496833.11; __utmz=1.1410496833.11.7.utmcsr=aliyun|utmccn=ecs_domain_special|utmcmd=sreach
   __utma=1.754859867.1407393440.1409572473.1410496833.11; __utmz=1.1410496833.11.7.utmcsr=aliyun|utmccn=ecs_domain_special|utmcmd=sreach
 * __utmz：跟踪访问者是从哪里来的(搜索引擎,搜索关键字,链接地址);
 * __utma：跟踪每个用户的大量访问,第一次,最后一次;
 * __utmb和__utmc是跟踪每个用户的访问时间，从开始到结束。
 */
