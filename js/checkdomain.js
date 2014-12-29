/*! Yahoo YQL */
jQuery.ajax = (function(_ajax) {
	var protocol = location.protocol, hostname = location.hostname, exRegex = RegExp(protocol + '//' + hostname), YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?', query = 'select * from html where url="{URL}" and xpath="*"';
	function isExternal(url) {
		return !exRegex.test(url) && /:\/\//.test(url);
	}
	return function(o) {
		var url = o.url;
		if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {
			// Manipulate options so that JSONP-x request is made to YQL
			o.url = YQL;
			o.dataType = 'json';
			o.data = {
				q : query.replace('{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')),
				format : 'xml'
			};
			// Since it's a JSONP request
			// complete === success
			if (!o.success && o.complete) {
				o.success = o.complete;
				delete o.complete;
			}
			o.success = (function(_success) {
				return function(data) {
					if (_success) {
						// Fake XHR callback.
						_success.call(this, {
							responseText : (data.results[0] || '')
							// YQL screws with <script>s
							// Get rid of them
							.replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
						}, 'success');
					}
				};
			})(o.success);
		}
		return _ajax.apply(this, arguments);
	};
})(jQuery.ajax);

/*
 * 
 * http://whois.www.net.cn/whois/domain/teapic.com 信息接口
 * returncode=200 表示接口返回成功 original=210 : Domain name is available 表示域名可以注册
 * original=211 : Domain name is not available 表示域名已经注册 original=212 : Domain
 * name is invalid 表示域名参数传输错误 original=213 : Time out 查询超时
 */
$(function() {
	var a = "http://panda.www.net.cn/cgi-bin/check.cgi?area_domain=";
	var correct = '210';
	var bname;
	var let = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	$('#title').live('click', function() {
		var b1 = parseInt($('#b1').val()) - 1;
		var b2 = parseInt($('#b2').val()) - 1;
		var b3 = parseInt($('#b3').val()) - 1;
		var b4 = parseInt($('#b4').val()) - 1;
		var e1 = parseInt($('#e1').val());
		var e2 = parseInt($('#e2').val());
		var e3 = parseInt($('#e3').val());
		var e4 = parseInt($('#e4').val());
		var c = $('#cname').val();
		bname = $('#bname').val();
		var command = $('#command').val();

		var position = new Array(b1, e1, b2, e2, b3, e3, b4, e4);
		search(position, command, c);
	})

	function search(position, command, c) {
		var b;
		var url;
		var data1;
		var i1;
		var i2;
		var i3;
		var i4;

		if (command == '3') {
			for (i1 = position[0]; i1 < position[1]; i1++) {
				for (i2 = position[2]; i2 < position[3]; i2++) {
					for (i3 = position[4]; i3 < position[5]; i3++) {
						b = let[i1] + let[i2] + let[i3];
						url = a + b + c;
						$.get(url, function(data) {
							data1 = data.responseText;
							var begin = data1.indexOf('>200');
							var end = data1.indexOf(':');
							var showdata = data1.substr(begin + 4, end - begin - 4);
							$('#maincont1').append('<div class="dis">' + showdata + '</div>');
							if (data1.indexOf(correct) > 0) {
								$('#maincont1').append('<h1>' + showdata + '</h1>');
							}
						});
					}
				}
			}
		} else if (command == '4') {
			for (i1 = position[0]; i1 < position[1]; i1++) {
				for (i2 = position[2]; i2 < position[3]; i2++) {
					for (i3 = position[4]; i3 < position[5]; i3++) {
						for (i4 = position[6]; i4 < position[7]; i4++) {
							b = let[i1] + let[i2] + let[i3] + let[i4];
							url = a + b + c;
							$.get(url, function(data) {
								data1 = data.responseText;
								var begin = data1.indexOf('>200');
								var end = data1.indexOf(':');
								var showdata = data1.substr(begin + 4, end - begin - 4);
								$('#maincont1').append('<div class="dis">' + showdata + '</div>');
								if (data1.indexOf(correct) > 0) {
									$('#maincont1').append('<h1>' + showdata + '</h1>');
								}
							});
						}
					}
				}
			}
		} else if (command == '2') {
			for (i1 = position[0]; i1 < position[1]; i1++) {
				for (i2 = position[2]; i2 < position[3]; i2++) {
					b = let[i1] + let[i2];
					url = a + b + c;
					$.get(url, function(data) {
						data1 = data.responseText;
						var begin = data1.indexOf('>200');
						var end = data1.indexOf(':');
						var showdata = data1.substr(begin + 4, end - begin - 4);
						$('#maincont1').append('<div class="dis">' + showdata + '</div>');
						if (data1.indexOf(correct) > 0) {
							$('#maincont1').append('<h1>' + showdata + '</h1>');
						}
					});
				}
			}
		} else if (command == 'a') {
			url = a + bname + c;
			$.get(url, function(data) {
				data1 = data.responseText;
				var begin = data1.indexOf('>200');
				var end = data1.indexOf(':');
				var showdata = data1.substr(begin + 4, end - begin - 4);
				$('#maincont1').append('<div class="dis">' + showdata + '</div>');
				if (data1.indexOf(correct) > 0) {
					$('#maincont1').append('<h1>' + showdata + '</h1>');
				}
			});
		}
	}
})