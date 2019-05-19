var socket = io();

var today = new Date();
var D = today.getDate();
var M = today.getMonth() + 1;
var Y = today.getFullYear();


if (D < 10) {
	$('#date-picker').val(Y+'-0'+M+'-0'+D);
} else {
	$('#date-picker').val(Y+'-0'+M+'-'+D);
}


var sort = $('#date-picker').val();

socket.emit('HistoryClient' , {sort});


socket.on('loadDatahis', function(data) {


	console.log(data);
	var pastLen = data.length;
	var pastimg = '';
	var sniff_data = '';
	for(p = 0; p < pastLen; p++) {
		var pastdata = data[p];

		if (pastdata.res2Color == 'YELLOW') {

			var res2Color = '노';
			var text_color_1 = 'res1_text_yellow';

		} else if (pastdata.res2Color == 'BLACK') {

			var res2Color = '검';
			var text_color_1 = 'res1_text_black';

		}

		if (pastdata.res3Color == 'RED') {

			var res3Color = '빨';

			var text_color_3 = 'res3_text_red';

		} else if (pastdata.res3Color == 'GREEN') {

			var res3Color = '초';

			var text_color_3 = 'res3_text_green';

		} else if (pastdata.res3Color == 'BLUE') {

			var res3Color = '파';

			var text_color_3 = 'res3_text_blue';

		}


		if (pastdata.sniff == 'ODD') {

			var sniff = '홀';
			var text_color_2 = 'res2_text_odd';

		} else if (pastdata.sniff == 'EVEN') { 

			var sniff = '짝';
			var text_color_2 = 'res2_text_even';
		}


		$('.gameresult table').append('<tr class="gameobjects"><td class="trounds">'
			+pastdata.rounds+'</td><td class="thash">'
			+pastdata.hash+'</td><td class="tsaltcode">'
			+pastdata._id+'</td><td class="result"><div class="gameresult-circle '+text_color_3+'">'+res3Color+'</div><div class="gameresult-circle '+text_color_1+'">'+res2Color+'</div><div class="gameresult-circle '+text_color_2+'">'+sniff+'</div></td></tr>')
	}
 
})

socket.on('pageCount',function(data) {

	if (data == 0) {
		$('.pagination').hide();
	} else {
		$('.pagination').show();
	var current_page = 1;
	var records_per_page = 10;
	var pages = data / 10;
	pages = Math.ceil(pages);
	var lastone = pages % 10;
	changePage(pages);


	if (pages < 11) {
		$('#prevpage').hide();
		$('#nextpage').hide();
	}


	function prevPage() {

		if (records_per_page == pages) {

				current_page = current_page - 10;

				if (lastone == 0) {
					records_per_page = records_per_page - 10;
				} else {

					records_per_page = records_per_page - lastone;
				}
				changePage();

		} else {

			if (current_page > 1) {
				current_page = current_page - 10;
				records_per_page = records_per_page - 10;
				changePage();
			}

		}
		
	}


	function nextPage() {

		if (lastone == 0) {
			var rs_limiter = records_per_page;
		}else {
			var rs_limiter = records_per_page + 10;
		}
		
		var curpage = curpage + 10;



		if (records_per_page == pages || curpage == pages) {

		} else {

			if (rs_limiter < pages) {

				current_page = current_page + 10;
				records_per_page = records_per_page + 10;
				changePage();

			}else {
				current_page = current_page + 10;
				records_per_page = records_per_page + lastone;
				changePage();
				
			}
		}

	}
	
		
	

	}
	
	$('#prevpage').click(function(){
		prevPage(pages);
	})

	$('#nextpage').click(function(){
		nextPage(pages);
	})



function changePage(page)
	{  


		// $('.gameobjects').remove();
		$('.page_cotent').html('');

		if (pages > 10) {

			for(x = current_page; x <= records_per_page; x++) {
				$('.page_cotent').append('<li class="page-item" ><a class="page-link loadpagesbtn"  href="#">'+x+'</a></li>')
			}

		} else {

			for(x = current_page; x <= pages; x++) {
				$('.page_cotent').append('<li class="page-item" ><a class="page-link loadpagesbtn"  href="#">'+x+'</a></li>')
			}
		}
		
	}
})





$('#checkResult').click(function(){

	var hash = $('#hashtext').val();
	var salt = $('#salttext').val();
	var round = $('#roundtxt').val();

	if (hash.length == 0 || salt.length == 0 || round.length == 0) {
		$('#errorModal .modal-body p').html('');
		$('#errorModal .modal-body p').html('정보가 일치하지 않습니다.');
		$('#errorModal').modal('show');
	} else if (salt.length < 24 || salt.length > 24) {
		$('#errorModal .modal-body p').html('');
		$('#errorModal .modal-body p').html('정보가 일치하지 않습니다.');
		$('#errorModal').modal('show');
	} else {
		socket.emit('searchDatahis' , {hashcode: hash , saltcode : salt, roundcode : round});
	}


})




socket.on('resdata',function(data){


	if (data.length > 0) {
		$('#result_round').html('');
		$('#result_sniff').html('');
		$('#result_3colors').html('');
		$('#result_2colors').html('');
		$('#invalidtxt').html('');


		$('#result_round').html(data[0].rounds);

		if (data[0].res2Color == 'YELLOW') {

			$('#result_2colors').html('노');
			$('#result_2colors').css('color' , 'yellow');

		} else if (data[0].res2Color == 'BLACK') {


			$('#result_2colors').html('검');
			$('#result_2colors').css('color' , '#aaa');

		}

		if (data[0].res3Color == 'RED') {

			$('#result_3colors').html('빨');
			$('#result_3colors').css('color' , 'red');

		} else if (data[0].res3Color == 'GREEN') {


			$('#result_3colors').html('초');
			$('#result_3colors').css('color' , 'green');

		} else if (data[0].res3Color == 'BLUE') {

			$('#result_3colors').html('파');
			$('#result_3colors').css('color' , 'blue');

		}

		if (data[0].sniff == 'ODD') {

			$('#result_sniff').html('홀');
			$('#result_sniff').css('color' , 'blue');

		} else if (data[0].sniff == 'EVEN') { 

			$('#result_sniff').html('짝');
			$('#result_sniff').css('color' , 'red');
		}

		$('#invalidtxt').hide();
		$('#restext').show();
		
	}
})



socket.on('invalid' ,function(data) {
	$('#invalidtxt').show();
	$('#restext').hide();
	$('#invalidtxt').html('정보가 일치하지 않습니다.');
})

 $('#date-picker').change(function(){
 	var dateval = $(this).val();
 	socket.emit('sortbydate' , dateval);
 	$('.gameresult table .gameobjects').remove();
 })






$(document).ready(function(){

	$(document).on('click','.loadpagesbtn',function() {
		var skip = 10 * $(this).html();
		skip = skip - 10;
		var sort = $('#date-picker').val();
		socket.emit('page_control', {skip : skip , sort : sort});
	})





socket.on('getpageload',function(data){

	// console.log(data);
	$('.gameobjects').remove();

		var pastLen = data.length;
		for(p = 0; p < pastLen; p++) {
			var pastdata = data[p];
		
		if (pastdata.res2Color == 'YELLOW') {

			var res2Color = '노';
			var text_color_1 = 'res1_text_yellow';

		} else if (pastdata.res2Color == 'BLACK') {

			var res2Color = '검';
			var text_color_1 = 'res1_text_black';

		}

		if (pastdata.res3Color == 'RED') {

			var res3Color = '빨';

			var text_color_3 = 'res3_text_red';

		} else if (pastdata.res3Color == 'GREEN') {

			var res3Color = '초';

			var text_color_3 = 'res3_text_green';

		} else if (pastdata.res3Color == 'BLUE') {

			var res3Color = '파';

			var text_color_3 = 'res3_text_blue';

		}


		if (pastdata.sniff == 'ODD') {

			var sniff = '홀';
			var text_color_2 = 'res2_text_odd';

		} else if (pastdata.sniff == 'EVEN') { 

			var sniff = '짝';
			var text_color_2 = 'res2_text_even';
		}


		$('.gameresult table').append('<tr class="gameobjects"><td class="trounds">'
			+pastdata.rounds+'</td><td class="thash">'
			+pastdata.hash+'</td><td class="tsaltcode">'
			+pastdata._id+'</td><td class="result"><div class="gameresult-circle '+text_color_3+'">'+res3Color+'</div><div class="gameresult-circle '+text_color_1+'">'+res2Color+'</div><div class="gameresult-circle '+text_color_2+'">'+sniff+'</div></td></tr>')
	}

})

}) // end document ready function



 socket.on('loadsort',function(sortres){
		var pastLen = sortres.length;

		for(p = 0; p < pastLen; p++) {
		var pastdata = sortres[p];
		
		if (pastdata.res2Color == 'YELLOW') {

			var res2Color = '노';
			var text_color_1 = 'res1_text_yellow';

		} else if (pastdata.res2Color == 'BLACK') {

			var res2Color = '검';
			var text_color_1 = 'res1_text_black';

		}

		if (pastdata.res3Color == 'RED') {

			var res3Color = '빨';

			var text_color_3 = 'res3_text_red';

		} else if (pastdata.res3Color == 'GREEN') {

			var res3Color = '초';

			var text_color_3 = 'res3_text_green';

		} else if (pastdata.res3Color == 'BLUE') {

			var res3Color = '파';

			var text_color_3 = 'res3_text_blue';

		}


		if (pastdata.sniff == 'ODD') {

			var sniff = '홀';
			var text_color_2 = 'res2_text_odd';

		} else if (pastdata.sniff == 'EVEN') { 

			var sniff = '짝';
			var text_color_2 = 'res2_text_even';
		}


		$('.gameresult table').append('<tr class="gameobjects"><td class="trounds">'
			+pastdata.rounds+'</td><td class="thash">'
			+pastdata.hash+'</td><td class="tsaltcode">'
			+pastdata._id+'</td><td class="result"><div class="gameresult-circle '+text_color_3+'">'+res3Color+'</div><div class="gameresult-circle '+text_color_1+'">'+res2Color+'</div><div class="gameresult-circle '+text_color_2+'">'+sniff+'</div></td></tr>')
	}
 })

 
$(document).ready(function(){

	$(document).on('click' , 'td.trounds' , function(){
		var copytext = $(this).html();
		$('#roundtxt').val('');
		$('#roundtxt').val(copytext);
	});


	$(document).on('click' , 'td.thash' , function(){
		var copytext = $(this).html();
		$('#hashtext').val('');
		$('#hashtext').val(copytext);

	});


	$(document).on('click' , 'td.tsaltcode' , function(){
		var copytext = $(this).html();
		$('#salttext').val('');
		$('#salttext').val(copytext);

	});
})


$(document).ready(function(){

	var screenlength = $(window).width();
	var ua = navigator.userAgent.toLowerCase(); 

	if (ua.indexOf('safari') != -1) { 
	  if (ua.indexOf('chrome') > -1) {
	  } else {

	  	setTimeout(function(){
		  	$('.page-item a').css({
		  		'font-size' : '12px',
		  	})

		  	$('.page-link').css({
		  		'font-size' : '12px',
		  	})
	  	},1000)


	  }
	}
})


