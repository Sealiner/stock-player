define(function(require, exports, module){
	var $ = require('lib_cmd/jquery-cmd'),
        bootstrap = require('lib_cmd/bootstrap-cmd'),
        whatever = require('lib_cmd/highstock-cmd');

    $(function () {
    	var data = APP.data;
    	var ohlc = [],
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

            volume.push([
                p_d, // the date
                p_v // the volume
            ]);
        }


        // create the chart
        $('#container').highcharts('StockChart', {

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'AAPL Historical'
            },

            yAxis: [{
                labels: {
                    align: 'left',
                    x: 3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
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
                top: '65%',
                height: '35%',
                offset: 3,
                lineWidth: 2
            }],

            series: [{
                type: 'candlestick',
                name: 'AAPL',
                data: ohlc,
                dataGrouping: {
                	enabled: false
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                dataGrouping: {
                	enabled: false
                }
            }]
        });
    }); 
});