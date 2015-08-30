define(function(require, exports, module){
	var $ = require('lib_cmd/jquery-cmd'),
        bootstrap = require('lib_cmd/bootstrap-cmd'),
        whatever = require('lib_cmd/highstock-cmd');

    var $eles = {};

    function initPage () {
        //绘制默认股市行情图
    	var data = APP.data;
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
        $('#stock_graph').highcharts('StockChart', {
            chart: {
                height: 600
            },
            rangeSelector: {
                selected: 1
            },
            title: {
                text: '上证指数A000001'
            },
            yAxis: [{
                labels: {
                    align: 'left',
                    x: 3
                },
                title: {
                    text: 'Price'
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
        //

        $("#btn_lookup_one").on("click", function () {
            $eles.market = $('#market');
            $eles.symbol = $('#symbol');
            var str_symbol = $eles.market.val() + $eles.symbol.val();
            $.ajax({
                url: "/api/stock/showGraphCV",
                type: "POST",
                data: {
                    symbol: str_symbol
                },
                async: true,
                dataType: "json",
                error: function (e) {
                    console.log(e);
                },
                success: function (result) {
                if (result.code == 0) {
                    var data = result.data;
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
                    $('#stock_graph').highcharts('StockChart', {
                        chart: {
                            height: 600
                        },
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: str_symbol
                        },
                        yAxis: [{
                            labels: {
                                align: 'left',
                                x: 3
                            },
                            title: {
                                text: 'Price'
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
                }
            });
        });
    }
    //
    $(function () {
        initPage();
    });
});