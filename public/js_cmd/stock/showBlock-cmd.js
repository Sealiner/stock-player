define(function (require, exports, module) {
	var $ = require('lib_cmd/jquery-cmd'),
        bootstrap = require('lib_cmd/bootstrap-cmd'),
        whatever = require('lib_cmd/highstock-cmd');

	function draw (args_data, args_id, args_title) {
		var data = args_data;
    	var ohlc = [],
            close = [],
            volume = [],
            dataLength = data.length;
        for (var i = 0; i < dataLength; i += 1) {
        	var p_d = new Date(data[i]["date"]).getTime(), //date
        		p_o = parseFloat(data[i]["open"]), //open
        		p_h = parseFloat(data[i]["high"]), // high
                p_l = parseFloat(data[i]["low"]), // low
                p_c = parseFloat(data[i]["close"]),// close
                p_v = parseFloat(data[i]["volume"]); //volume
            ohlc.push([
                p_d,
                p_o,
                p_h,
                p_l,
                p_c
            ]);
            close.push([
                p_d,
                p_c
            ]);
            volume.push([
                p_d, // the date
                p_v // the volume
            ]);
        }
        // create the chart
        $('#'+args_id).highcharts('StockChart', {
            chart: {
                height: 600
            },
            rangeSelector: {
                selected: 1
            },
            title: {
                text: args_title
            },
            yAxis: [{
                labels: {
                    align: 'left',
                    x: 3
                },
                title: {
                    text: 'Price'
                },
                height: '65%',
                offset: 3,
                lineWidth: 2
            }, {
                labels: {
                    align: 'left',
                    x: 3
                },
                title: {
                    text: 'Volume'
                },
                top: '70%',
                height: '30%',
                offset: 3,
                lineWidth: 2
            }],
            series: [{
                type: 'area',
                name: '收盘价',
                data: close,
                dataGrouping: {
                	enabled: false
                }
            }, {
                type: 'column',
                name: '交易量',
                data: volume,
                yAxis: 1,
                dataGrouping: {
                	enabled: false
                }
            }]
        });
	}
	$(function () {
		for (var i = 0; i < APP.data.length; i++) {
			var args_data = APP.data[i].data,
				args_id = "stock_graph" + i,
				args_title = APP.data[i].symbol;
			draw(args_data, args_id, args_title);
		}
	});
});