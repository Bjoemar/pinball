var socket = io();
var resultList = [];

var ballPos = genPosition();
resultList.ballPos = ballPos;

$('#red-command').click(function(){


	if (resultList.ballPos == 0) {

		 resultList.r3Pos = 0;

	} else if(resultList.ballPos == 1) {

		 resultList.r3Pos = 2;

	} else if (resultList.ballPos == 2) {

		 resultList.r3Pos = 1;

	} else if (resultList.ballPos == 3) {

		 resultList.r3Pos = 0;

	} else if (resultList.ballPos == 4) {

		 resultList.r3Pos = 2;

	} else if (resultList.ballPos == 5) {

		 resultList.r3Pos = 1;
	}

	$('.r3Container').html('빨');

	$('.r3Container').css('background' , '#c82333');


});

$('#green-command').click(function(){



	if (resultList.ballPos == 0) {

		 resultList.r3Pos = 1;

	} else if(resultList.ballPos == 1) {

		 resultList.r3Pos = 0;

	} else if (resultList.ballPos == 2) {

		 resultList.r3Pos = 2;

	} else if (resultList.ballPos == 3) {

		 resultList.r3Pos = 1;

	} else if (resultList.ballPos == 4) {

		 resultList.r3Pos = 0;

	} else if (resultList.ballPos == 5) {

		 resultList.r3Pos = 2;
	}

	$('.r3Container').html('초')
	$('.r3Container').css('background' , '#218838');

});

$('#blue-command').click(function(){



	if (resultList.ballPos == 0) {

		resultList.r3Pos = 2;

	} else if(resultList.ballPos == 1) {

		resultList.r3Pos = 1;

	} else if (resultList.ballPos == 2) {

		resultList.r3Pos = 0;

	} else if (resultList.ballPos == 3) {

		resultList.r3Pos = 2;

	} else if (resultList.ballPos == 4) {


		resultList.r3Pos = 1;

	} else if (resultList.ballPos == 5) {

		resultList.r3Pos = 0;
	}

	$('.r3Container').html('파')

	$('.r3Container').css('background' , '#0069d9');
})


$('#black-command').click(function(){



	if (resultList.ballPos == 0) { 

		resultList.r2Pos = 0;

	} else if(resultList.ballPos == 1) {

		resultList.r2Pos = 1;

	} else if (resultList.ballPos == 2) {

		resultList.r2Pos = 0;

	} else if (resultList.ballPos == 3) {

		resultList.r2Pos = 1;

	} else if (resultList.ballPos == 4) {

		resultList.r2Pos = 0;

	} else if (resultList.ballPos == 5) {
		
		resultList.r2Pos = 1;

	}

	$('.r2Container').html('검')
	$('.r2Container').css('background' , '#23272b');
});

$('#yellow-command').click(function(){


	if (resultList.ballPos == 0) {

		resultList.r2Pos = 1;

	} else if(resultList.ballPos == 1) {

		resultList.r2Pos = 0;

	} else if (resultList.ballPos == 2) {

		resultList.r2Pos = 1;

	} else if (resultList.ballPos == 3) {

		resultList.r2Pos = 0;

	} else if (resultList.ballPos == 4) {

		resultList.r2Pos = 1;

	} else if (resultList.ballPos == 5) {
		
		resultList.r2Pos = 0;

	}

	$('.r2Container').html('노')
	$('.r2Container').css('background' , '#ffc107');
});


$('#even-command').click(function(){



	if (resultList.ballPos == 0) {

		 resultList.rH1 = 1;

	} else if(resultList.ballPos == 1) {

		 resultList.rH2 = 1;

	} else if (resultList.ballPos == 2) {

		 resultList.rH3 = 1;

	} else if (resultList.ballPos == 3) {

		 resultList.rH4 = 1;

	} else if (resultList.ballPos == 4) {

		 resultList.rH5 = 1;

	} else if (resultList.ballPos == 5) {
		
		 resultList.rH6 = 1;

	}


	$('.r1Container').html('짝');
	$('.r1Container').css('background' , '#007bff');
	
});

$('#odd-command').click(function(){



	if (resultList.ballPos == 0) {

		 resultList.rH1 = 0;

	} else if(resultList.ballPos == 1) {

		 resultList.rH2 = 0;

	} else if (resultList.ballPos == 2) {

		 resultList.rH3 = 0;

	} else if (resultList.ballPos == 3) {

		 resultList.rH4 = 0;

	} else if (resultList.ballPos == 4) {

		 resultList.rH5 = 0;

	} else if (resultList.ballPos == 5) {
		
		 resultList.rH6 = 0;

	}

	$('.r1Container').html('홀');
	$('.r1Container').css('background' , '#c82333');




});


function genPosition(){
	var ballPosition = Math.floor(Math.random() * 6);
	return ballPosition;
}



$('#sendData').click(function(){
	$('#sendData').css('background' , '#218838');
	$('#cancelData').css('background' , 'transparent');


	socket.emit('adminOps',{'bForce' : resultList.ballPos ,
	 	'r3Pos' : resultList.r3Pos ,
	   	'r2Pos' : resultList.r2Pos ,
	    'rH1' : resultList.rH1 ,
	    'rH2' : resultList.rH2 ,
	    'rH3' : resultList.rH3 ,
	    'rH4' : resultList.rH4,
	    'rH5' : resultList.rH5,
	    'rH6' : resultList.rH6,
	});


})

$('#cancelData').click(function(){
	$('#sendData').css('background' , 'transparent');
	$('#cancelData').css('background' , '#dc3545');
	$('.res-cont').html('');
	$('.res-cont').css('background' , 'none');

	resultList = [];
	var ballPos = genPosition();
	resultList.ballPos = ballPos;

})


socket.on('sec',function(data){
	if (data == 43) {

		$('#sendData').css('background' , 'transparent');
		$('#cancelData').css('background' , 'transparent');
		$('.res-cont').html('');
		$('.res-cont').css('background' , 'none');


		resultList = [];
		var ballPos = genPosition();
		resultList.ballPos = ballPos;
	}
})

setInterval(function(){
	console.log(resultList)
},1000);

