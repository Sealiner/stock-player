var jsonData = APP.data,
	priceData = [],
	volumeData = [],
	summaryData = [];
for (var i = 0; i < jsonData.length; i++) {
	priceData.push([i,jsonData[i].close]);
	volumeData.push([i,jsonData[i].volume]);
	if (i === 0 || i === jsonData.length-1 || i % 4 === 0) {
		summaryData.push([i, jsonData[i].close]);
	}
}

Event.observe(document, 'dom:loaded', function() {
    
    HumbleFinance.trackFormatter = function (obj) {
        
        var x = Math.floor(obj.x);
        var data = jsonData[x];
        var text = data.date + " Price: " + data.close + " Vol: " + data.volume;
        
        return text;
    };

    HumbleFinance.yTickFormatter = function (n) {
        return n+'';
    };
    
    HumbleFinance.xTickFormatter = function (n) { 
        var date = jsonData[n].date;
        return date; 
    }
    
    HumbleFinance.init('finance', priceData, volumeData, summaryData);
    //HumbleFinance.setFlags(flagData); 
    
    var xaxis = HumbleFinance.graphs.summary.axes.x;
    var prevSelection = HumbleFinance.graphs.summary.prevSelection;
    var xmin = xaxis.p2d(prevSelection.first.x);
    var xmax = xaxis.p2d(prevSelection.second.x);
    
    $('dateRange').update(jsonData[xmin].date + ' - ' + jsonData[xmax].date);
    
    Event.observe(HumbleFinance.containers.summary, 'flotr:select', function (e) {
        
        var area = e.memo[0];
        xmin = Math.floor(area.x1);
        xmax = Math.ceil(area.x2);
        
        var date1 = jsonData[xmin].date;
        var date2 = jsonData[xmax].date;
        
        $('dateRange').update(jsonData[xmin].date + ' - ' + jsonData[xmax].date);
    });
});