var config = require('../utils/config'),
	cheerio = require('cheerio'),
    superagent = require('superagent');

function Stock (args) {

}
Stock.prototype = {
	fetch: function (args, callback) {
		var symbol = args.symbol,
			begin_date = args.begin_date,
			end_date = args.end_date,
			query = "";
		if (typeof(symbol) === "undefined") {
			return;
		} else {
			var str_begin_date = typeof(begin_date) === "undefined" ? "" : ("&begin_date=" + begin_date),
				str_end_date = typeof(end_date) === "undefined" ? "" : ("&end_date=" + end_date);
			query = "?symbol=" + symbol + str_begin_date + str_end_date;
		}
		var url = config.api.sina + query;
		superagent.get(url)
			.end(function (err, sres) {
				var $ = cheerio.load(sres.text);
				var data = [];
				$('control').find('content').each(function () {
					var date = $(this).attr('d'),
						open = $(this).attr('o'),
						high = $(this).attr('h'),
						close = $(this).attr('c'),
						low = $(this).attr('l'),
						volume = $(this).attr('v');
					data.push({
						date: date,
						open: open,
						high: high,
						close: close,
						low: low,
						volume: volume	
					});
				});
				callback(null, data);
			});
	}
}

module.exports = Stock;