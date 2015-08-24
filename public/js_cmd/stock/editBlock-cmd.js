define(function(require, exports, module){
	var $ = require('lib_cmd/jquery-cmd'),
        bootstrap = require('lib_cmd/bootstrap-cmd');

    $(function () {
    	initPage();
    });

    function initPage () {
    	//新建板块
    	$('.block-plus').on('click', function () {
    		$('#blockNew').modal({
    			backdrop: false
    		});
    	});
    	//新建板块提交
    	$('#btn_new_block').on('click', function () {
    		var blockname = $('#input_new_block').val();
    		$.ajax({
    			method: "POST",
    			async: true,
    			url: '/api/block/newBlock',
    			data: {
    				blockname: blockname
    			},
    			dataType: "json",
    			success: function (result) {
    				$('#blockNew').modal('hide');
    				
    			},
    			error: function (e) {
    				console.log(e);
    			}
    		});
    	});
    }
});