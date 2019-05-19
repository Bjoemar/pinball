var socket = io();


var innerwidth = 50;

var today = new Date();
var M = today.getMonth() + 1;
var D = today.getDate();
var Y = today.getFullYear();


if (M < 10) {
	if (D < 10) {
		var today_data_date = Y+'-0'+M+'-0'+D;
	} else {
		var today_data_date = Y+'-0'+M+'-'+D;
	}
} else {
	if (D < 10) {
		var today_data_date = Y+'-'+M+'-0'+D;
	} else {
		var today_data_date = Y+'-'+M+'-'+D;
	}
}




$('.table-loading').show();

$('#result-limit').change(function(){
	$('.table-loading').show();
	var result_limit = $('#result-limit option:selected').val();
	var result_limit = parseInt(result_limit);
	socket.emit('LoadMoreResult',{'result_limit' : result_limit , 'today_data_date' : today_data_date});

	innerwidth = 50;

	$('#result-limit').css({
		'pointer-events' : 'none',
	})
});




function process(today_data_date) {

	var result_limit = $('#result-limit option:selected').val();
	var result_limit = parseInt(result_limit)
	socket.emit('LoadMoreResult',{'result_limit' : result_limit , 'today_data_date'  : today_data_date});

	innerwidth = 50;

	$('#result-limit').css({
		'pointer-events' : 'none',
	})
}

var status_sniff = false; 
var status_3color = true;
var status_2color = false;


var sniffative = false;
var color3active = true;
var color2active = false;

var loading = true;


$('#sniff_result').click(function(){
	status_sniff = false;
	status_3color = false;
	status_2color = false;

	sniffative = false;
	color3active = false;
	color2active = false;

	status_sniff = true;
	sniffative = true;

	process(today_data_date);

	$('.categ').css({
		'pointer-events' : 'none',
	})

	$('.table-loading').show();

});


$('#color3_result').click(function(){
	status_sniff = false;
	status_3color = false;
	status_2color = false;

	sniffative = false;
	color3active = false;
	color2active = false;

	status_3color = true;
	color3active = true;

	process(today_data_date);

	$('.categ').css({
		'pointer-events' : 'none',
	})

	$('.table-loading').show();

});


$('#color2_result').click(function(){
	status_sniff = false;
	status_3color = false;
	status_2color = false;

	sniffative = false;
	color3active = false;
	color2active = false;

	status_2color = true;
	color2active = true;

	process(today_data_date);

	$('.categ').css({
		'pointer-events' : 'none',
	})

	$('.table-loading').show();

});


$(document).ready(function(){
	socket.emit('newVisitor',{'today_data_date' : today_data_date});
})



var lastresType = '';
var sizelimiter = 0;




socket.on('gameResPass',function(newdata){
	setTimeout(function(){

		if (sniffative == true) {

			if (lastresType == newdata.sniff) {

				if (newdata.sniff == 'ODD') {

			  		lastresType = 'ODD';

			  		$('.innerResult .columns').last().append('<dd><div class="circle-blue res-circle">'+newdata.rounds+'</div></dd>');

			  	} else if (newdata.sniff == 'EVEN') {

			  		lastresType = 'EVEN';

			  		$('.innerResult .columns').last().append('<dd><div class="circle-red res-circle">'+newdata.rounds+'</div></dd>');
			  	}

			} else {

		  		innerwidth = (innerwidth + 35) - 1;


			  	if (newdata.sniff == 'ODD') {

			  		lastresType = 'ODD';
			  		$('.innerResult').append('<dl class="columns odd-sniff"><dt>홀</dt><dd><div class="circle-blue res-circle">'+newdata.rounds+'</div></dd></dl>');

			  	} else if (newdata.sniff == 'EVEN') {

			  		lastresType = 'EVEN';
			  		$('.innerResult').append('<dl class="columns even-sniff"><dt>짝</dt><dd><div class="circle-red res-circle">'+newdata.rounds+'</div></dd></dl>');
			  	}
			}
		}

		if (color3active == true) {

			if (lastresType == newdata.res3Color) {
				if (newdata.res3Color == 'BLUE') {
					lastresType = 'BLUE';
					$('.innerResult .columns').last().append('<dd><div class="circle-blue res-circle">'+newdata.rounds+'</div></dd>');
				} else if (newdata.res3Color == 'RED') {
					lastresType = 'RED';
					$('.innerResult .columns').last().append('<dd><div class="circle-red res-circle">'+newdata.rounds+'</div></dd>');
				} else if (newdata.res3Color == 'GREEN') {
					lastresType = 'GREEN';
					$('.innerResult .columns').last().append('<dd><div class="circle-green res-circle">'+newdata.rounds+'</div></dd>');
				}
			} else {

				innerwidth = (innerwidth + 35) - 1;

				if (newdata.res3Color == 'BLUE') {
					lastresType = 'BLUE';
					$('.innerResult').append('<dl class="columns mblue"><dt>파</dt><dd><div class="circle-blue res-circle">'+newdata.rounds+'</div></dd></dl>');
				} else if (newdata.res3Color == 'RED') {
					lastresType = 'RED';
					$('.innerResult').append('<dl class="columns mred"><dt>빨</dt><dd><div class="circle-red res-circle">'+newdata.rounds+'</div></dd></dl>');
				} else if (newdata.res3Color == 'GREEN') {
					lastresType = 'GREEN';
					$('.innerResult').append('<dl class="columns mgreen"><dt>초</dt><dd><div class="circle-green res-circle">'+newdata.rounds+'</div></dd></dl>');
				}
			}
	
		}

		if (color2active == true) {


			if (lastresType == newdata.res2Color) {
				if (newdata.res2Color == 'BLACK') {
					lastresType = 'BLACK';

					$('.innerResult .columns').last().append('<dd><div class="circle-black res-circle">'+newdata.rounds+'</div></dd>');
				} else if (newdata.res2Color == 'YELLOW') {
					lastresType = 'YELLOW';
					$('.innerResult .columns').last().append('<dd><div class="circle-yellow res-circle">'+newdata.rounds+'</div></dd>');
				}
			} else {
				innerwidth = (innerwidth + 35) - 1;

				if (newdata.res2Color == 'BLACK') {
					lastresType = 'BLACK';
					$('.innerResult').append('<dl class="columns mblack"><dt>검</dt><dd><div class="circle-black res-circle">'+newdata.rounds+'</div></dd></dl>');
				} else if (newdata.res2Color == 'YELLOW') {
					lastresType = 'YELLOW';
					$('.innerResult').append('<dl class="columns myellow"><dt>노</dt><dd><div class="circle-yellow res-circle">'+newdata.rounds+'</div></dd></dl>');

				}
			}

		}



		if (loading == false) {
			 $('.innerResult').css({
				  	  width : innerwidth ,
				 });

			 $('.resultHolder').animate({scrollLeft : innerwidth},500);
		}


	},1000);
})



// Load the data
socket.on('loadData',function(prevdata){

	// console.log(prevdata)
	loading = false;

	$('.innerResult').html('');
	// getSniff(prevdata);

	if (status_sniff == true){
		


		getSniff(prevdata);

		$('.categ').css({
			'pointer-events' : 'auto',
		});


		return status_sniff;
	}

	if (status_3color == true){
		


		get3Colors(prevdata);


		$('.categ').css({
			'pointer-events' : 'auto',
		});

		return status_3color;
	}

	if (status_2color == true){
		


		get2Colors(prevdata);

		$('.categ').css({
			'pointer-events' : 'auto',
		});

		return status_2color;
	}


});





function getSniff(prevdata) {
	$('.innerResult').css({
		width : 50,
	});

	$('.innerResult').html('');
	var pastLen = prevdata.length;

	for(p = pastLen - 1; p >= 0; p--) {
		var pastdata = prevdata[p];

		if (lastresType == pastdata.sniff) {
			if (pastdata.sniff == 'ODD') {
				lastresType = 'ODD';

				$('.innerResult .columns').last().append('<dd><div class="circle-blue res-circle">'+pastdata.rounds+'</div></dd>');
			} else if (pastdata.sniff == 'EVEN') {
				lastresType = 'EVEN';

				$('.innerResult .columns').last().append('<dd><div class="circle-red res-circle">'+pastdata.rounds+'</div></dd>')
			}

		} else {
			innerwidth = (innerwidth + 35) - 1;

			if (pastdata.sniff == 'ODD') {
				lastresType = 'ODD';
				$('.innerResult').append('<dl class="columns odd-sniff"><dt>홀</dt><dd><div class="circle-blue res-circle">'+pastdata.rounds+'</div></dd></dl>')
			} else if (pastdata.sniff == 'EVEN') {
				lastresType = 'EVEN';
				$('.innerResult').append('<dl class="columns even-sniff"><dt>짝</dt><dd><div class="circle-red res-circle">'+pastdata.rounds+'</div></dd></dl>');
			}
		}

	}


	$('.innerResult').css({
		width : innerwidth,
	});

	$('#result-limit').css({
		'pointer-events' : 'auto',
	});

	setTimeout(function(){
		$('.resultHolder').animate({scrollLeft : innerwidth},500);
	},1000);

	$('.table-loading').fadeOut();
}



function get3Colors(prevdata) {
	$('.innerResult').css({
		width : 50,
	});

	$('.innerResult').html('');

	var pastLen = prevdata.length;

	for(p = pastLen - 1; p >= 0; p--) {
		var pastdata = prevdata[p];

		if (lastresType == pastdata.res3Color) {
			if (pastdata.res3Color == 'BLUE') {
				lastresType = 'BLUE';
				$('.innerResult .columns').last().append('<dd><div class="circle-blue res-circle">'+pastdata.rounds+'</div></dd>');
			} else if (pastdata.res3Color == 'RED') {
				lastresType = 'RED';
				$('.innerResult .columns').last().append('<dd><div class="circle-red res-circle">'+pastdata.rounds+'</div></dd>');
			} else if (pastdata.res3Color == 'GREEN') {
				lastresType = 'GREEN';
				$('.innerResult .columns').last().append('<dd><div class="circle-green res-circle">'+pastdata.rounds+'</div></dd>');
			}
		} else {
			innerwidth = (innerwidth + 35) - 1;

			if (pastdata.res3Color == 'BLUE') {
				lastresType = 'BLUE';
				$('.innerResult').append('<dl class="columns mblue"><dt>파</dt><dd><div class="circle-blue res-circle">'+pastdata.rounds+'</div></dd></dl>');
			} else if (pastdata.res3Color == 'RED') {
				lastresType = 'RED';
				$('.innerResult').append('<dl class="columns mred"><dt>빨</dt><dd><div class="circle-red res-circle">'+pastdata.rounds+'</div></dd></dl>');
			} else if (pastdata.res3Color == 'GREEN') {
				lastresType = 'GREEN';
				$('.innerResult').append('<dl class="columns mgreen"><dt>초</dt><dd><div class="circle-green res-circle">'+pastdata.rounds+'</div></dd></dl>');
			}
		}
	}



	  $('.innerResult').css({
	  	  width : innerwidth ,
	  });


	$('#result-limit').css({
		'pointer-events' : 'auto',
	})


	$('.resultHolder').animate({scrollLeft : innerwidth},500);

	$('.table-loading').fadeOut();
}


function get2Colors(prevdata) {
	$('.innerResult').css({
		width : 50,
	});

	$('.innerResult').html('');

	var pastLen = prevdata.length;

	for(p = pastLen - 1; p >= 0; p--) {
		var pastdata = prevdata[p];

		if (lastresType == pastdata.res2Color) {
			if (pastdata.res2Color == 'BLACK') {
				lastresType = 'BLACK';

				$('.innerResult .columns').last().append('<dd><div class="circle-black res-circle">'+pastdata.rounds+'</div></dd>');
			} else if (pastdata.res2Color == 'YELLOW') {
				lastresType = 'YELLOW';
				$('.innerResult .columns').last().append('<dd><div class="circle-yellow res-circle">'+pastdata.rounds+'</div></dd>');
			}
		} else {
			innerwidth = (innerwidth + 35) - 1;

			if (pastdata.res2Color == 'BLACK') {
				lastresType = 'BLACK';
				$('.innerResult').append('<dl class="columns mblack"><dt>검</dt><dd><div class="circle-black res-circle">'+pastdata.rounds+'</div></dd></dl>');
			} else if (pastdata.res2Color == 'YELLOW') {
				lastresType = 'YELLOW';
				$('.innerResult').append('<dl class="columns myellow"><dt>노</dt><dd><div class="circle-yellow res-circle">'+pastdata.rounds+'</div></dd></dl>');

			}
		}
	}



	  $('.innerResult').css({
	  	  width : innerwidth ,
	  });


	$('#result-limit').css({
		'pointer-events' : 'auto',
	})


	$('.resultHolder').animate({scrollLeft : innerwidth},500);

	$('.table-loading').fadeOut();
}





