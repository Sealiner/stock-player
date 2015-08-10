define(function(require, exports, module){
	var $ = require('lib_cmd/jquery-cmd'),
		bootstrap = require('lib_cmd/bootstrap-cmd'),
		HumbleFinance = require('lib_cmd/HumbleFinance-cmd');

	var jsonData = APP.data,
		priceData = [],
		volumeData = [],
		summaryData = [];
	for (var i = 0; i < jsonData.length; i++) {
		priceData.push([i,jsonData[i].close]);
		volumeData.push([i,jsonData[i].volume]);
		if (i === 0 || i === jsonData.length || i % 4 === 0) {
			summaryData.push([i, jsonData[i].close]);
		}
	}
	console.log(priceData);
	$(function(){
    	
    	HumbleFinance.trackFormatter = function (obj) {
        
        	var x = Math.floor(obj.x);
        	var data = jsonData[x];
        	var text = data.date + " Price: " + data.close + " Vol: " + data.volume;
        
        	return text;
    	};
    	
    	HumbleFinance.init('finance', priceData, volumeData, summaryData);	

    	$("#zoom1").on("click", function () {
			HumbleFinance.zoom(30);
    	});
    	$("#zoom2").on("click", function () {
			HumbleFinance.zoom(300);
    	});
	});

});