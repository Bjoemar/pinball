var socket = io();



$(document).ready(function(){
    setTimeout(function(){
        var screenlength = $(window).width();
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
          if (ua.indexOf('chrome') > -1) {
          } else {


            if (screenlength <= 600) {
            	$('.result-rounds').css('font-size' , '8px');
            	$('.game-res-circle').css('font-size' , '15px');
            	$('.gameTimer').css('font-size' , '15px');
            	$('.horizontal-spin li').css('font-size' , '15px');

            	$('.numbox li').css('font-size' , '10px');
            } else if (screenlength <= 768) {

            }
          }
        }

    },2000);
});



var today = new Date();
var M = today.getMonth() + 1;
var D = today.getDate();
var Y = today.getFullYear();


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


var pinballWorld = document.getElementById('gamecanvas');
var engine = Matter.Engine.create();
var world = engine.world;
var render = Matter.Render.create({
	canvas : pinballWorld,
	engine : engine,
	options : {
		width : '400',
		height : '740',
		background : 'black',
		wireframes : false,
	}
});


socket.emit('newVisitor',{'today_data_date' :  today_data_date});

var PATHS2 = {
	DOME : '0 80 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0',
};


var vertices = Matter.Vertices.fromPath(PATHS2.DOME);

var dome = Matter.Bodies.fromVertices(200,90,vertices,{
	isStatic : true,
	render : {
		visible : true,
		lineWidth: 1,
		strokeStyle: '#111',
		fillStyle: '#111',
	}
});

socket.on('sec',function(seconds){

	if (seconds == 10) {
		$('.redLine').css('height' , '90%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 9) {
		$('.redLine').css('height' , '80%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 8) {
		$('.redLine').css('height' , '70%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 7) {
		$('.redLine').css('height' , '60%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 6) {
		$('.redLine').css('height' , '50%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 5) {
		$('.redLine').css('height' , '40%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 4) {
		$('.redLine').css('height' , '30%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 3) {
		$('.redLine').css('height' , '20%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 2) {
		$('.redLine').css('height' , '10%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 1) {
		$('.redLine').css('height' , '0%');
		$('.redLine').css('transition' , 'all 1s linear');
	} else if (seconds == 59) {
		$('.redLine').css('height' , '100%');
		$('.redLine').css('transition' , 'none');
	}

	if (seconds < 10) {
		$('.gameTimer').html('00 : 0'+seconds);
	} else {
		$('.gameTimer').html('00 : '+seconds);
	}

});

Matter.World.add(world,dome);


function makeBall(x,y,r) {
	return Matter.Bodies.circle(x, y, r, {
		density: 0.04,
		friction: 0.01,
		frictionAir: 0.00001,
		restitution: 0.8,
		render: {
		  fillStyle: 'red',
		  strokeStyle: 'white',
		  lineWidth: 1
		}
	});
};

function bounds(x,y,r) {
	return Matter.Bodies.circle(x,y,r, {
		isStatic : true,
		render : {
			visible : true,
			fillStyle : 'white',
		}
	});
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i - 11;
	var ypos = 200 +  40;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i + 11;
	var ypos = 200 +  80;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i - 11;
	var ypos = 200 +  120;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i + 11;
	var ypos = 200 +  160;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i - 11;
	var ypos = 200 +  200;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i + 11;
	var ypos = 200 +  240;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};

for(i = 1; i <= 7; i++) {
	var xpos = 45 * i - 11;
	var ypos = 200 +  280;
	var raduis = 3;
	Matter.World.add(world,bounds(xpos,ypos,raduis));
};







var bucketLine1 = Matter.Bodies.rectangle(66,700,2,390, {
	isStatic : true ,
		render : {
			visible : true,
			fillStyle: 'white',
		}
});

Matter.World.add(world,bucketLine1);

var bucketLine2 = Matter.Bodies.rectangle(123,700,2,390, {
	isStatic : true ,
		render : {
			visible : true,
			fillStyle: 'white',
		}
});

Matter.World.add(world,bucketLine2);



var bucketLine3 = Matter.Bodies.rectangle(180,700,2,390, {
	isStatic : true ,
		render : {
			visible : true,
			fillStyle: 'white',
		}
});

Matter.World.add(world,bucketLine3);




var bucketLine4 = Matter.Bodies.rectangle(237,700,2,390, {
	isStatic : true ,
		render : {
			visible : true,
			fillStyle: 'white',
		}
});

Matter.World.add(world,bucketLine4);




var bucketLine5 = Matter.Bodies.rectangle(294,700,2,390, {
	isStatic : true ,
		render : {
			visible : true,
			fillStyle: 'white',
		}
});

Matter.World.add(world,bucketLine5);




var pusher = Matter.Bodies.rectangle(380,740,30,15,{
	isStatic : true,
	render : {
		visible : true,
		fillStyle : 'white',
	}
});

var gameTimer = Matter.Bodies.rectangle(50,50,50,50,{
	isStatic : true,
	render : {
		visible : true,
		fillStyle : 'white',
	}
})
Matter.World.add(world,pusher);

var floor = Matter.Bodies.rectangle(0,740,900,10,{
	isStatic : true ,
	render : {
		visible : true,
		fillStyle: '#111',
	}
});

var floorLeft = Matter.Bodies.rectangle(5,320,10,900,{
	isStatic : true ,
	render : {
		visible : true,
		fillStyle: '#111',
	}
});

var floorRight = Matter.Bodies.rectangle(355,680,10,900,{
	isStatic : true ,
	render : {
		visible : true,
		fillStyle: '#111',
	}
});

var floorRightSide = Matter.Bodies.rectangle(400,680,10,1090,{
	isStatic : true ,
	render : {
		visible : true,
		fillStyle: '#111',
	}
});

// Adding the object in the canvas
Matter.World.add(world,floor);
Matter.World.add(world,floorLeft);
Matter.World.add(world,floorRight);
Matter.World.add(world,floorRightSide);

// Run the world
Matter.Engine.run(engine);
Matter.Render.run(render);

function initGame() {

	for(i = 0; i < 8; i++) {
		var loopData = $('.color3-roullete .horizontal-spin ul').html();
		$('.color3-roullete .horizontal-spin ul').append(loopData);
	};

	for(i = 0; i < 8; i++) {
		var loopData = $('.color2-roullete .horizontal-spin ul').html();
		$('.color2-roullete .horizontal-spin ul').append(loopData);
	};

	for (i = 0; i < 8; i++) {
		var loopData = $('.firstBox .inner-vertical-spin ul').html();
		$('.firstBox .inner-vertical-spin ul').append(loopData);
	};

	for (i = 0; i < 8; i++) {
		var loopData = $('.secondBox .inner-vertical-spin ul').html();
		$('.secondBox .inner-vertical-spin ul').append(loopData);
	};

	for (i = 0; i < 8; i++) {
		var loopData = $('.thirdBox .inner-vertical-spin ul').html();
		$('.thirdBox .inner-vertical-spin ul').append(loopData);
	};

	for (i = 0; i < 8; i++) {
		var loopData = $('.fourthBox .inner-vertical-spin ul').html();
		$('.fourthBox .inner-vertical-spin ul').append(loopData);
	};

	for (i = 0; i < 8; i++) {
		var loopData = $('.fifthBox .inner-vertical-spin ul').html();
		$('.fifthBox .inner-vertical-spin ul').append(loopData);
	};

	for (i = 0; i < 8; i++) {
		var loopData = $('.sixBox .inner-vertical-spin ul').html();
		$('.sixBox .inner-vertical-spin ul').append(loopData);
	};

};


	

function runGame(r3Pos,r2Pos,rh1,rh2,rh3,rh4,rh5,rh6) {

	$('.color3-roullete').scrollLeft(0);
	$('.firstBox').scrollTop(0);
	$('.thirdBox').scrollTop(0);
	$('.fifthBox').scrollTop(0);

	$('.color2-roullete').scrollLeft(4510);
	
	$('.color3-roullete ').animate({
		scrollLeft : r3Pos,
	},9000);


	setTimeout(function(){
		$('.color2-roullete').animate({
			scrollLeft : r2Pos,
		},6000);
	},2000);


	setTimeout(function(){

		$('.firstBox').animate({
			scrollTop : rh1,
		},4000);

		$('.secondBox').scrollTop(18500);


		$('.secondBox').animate({
			scrollTop : rh2,
		},4000);

		$('.thirdBox').animate({
			scrollTop : rh3,
		},4000);

		$('.fourthBox').scrollTop(18500);

		$('.fourthBox').animate({
			scrollTop : rh4,
		},4000);

		$('.fifthBox').animate({
			scrollTop : rh5,
		},4000);

		$('.sixBox').scrollTop(18500);

		$('.sixBox').animate({
			scrollTop : rh6,
		},4000);

	},4000);
};



initGame();




socket.on('gameData',function(data){
	var xpos = 380;
	var ypos = 720;
	var raduis = 10;
	// Append the ball in the world
	var object = makeBall(xpos,ypos,raduis);
	Matter.World.add(world,object);

	runGame(data.r3Pos,data.r2Pos,data.rh1,data.rh2,data.rh3,data.rh4,data.rh5,data.rh6);

	setTimeout(function(){
		Matter.Body.setVelocity(object , { x: 0, y: data.ballForce});
		Matter.Body.setAngularVelocity(object, 0);
		setTimeout(function(){
			Matter.World.remove(world,object)
		},30000);
	},10000);

});


socket.on('gameResPass',function(data){


	if (data.res3Color == 'GREEN') {
		var color3 = '초';
	} else if (data.res3Color == 'BLUE') {
		var color3 = '파';
	} else if (data.res3Color == 'RED') {
		var color3 = '빨';
	}

	if (data.res2Color == 'YELLOW') {
		var color2 = '노';
	} else if (data.res2Color == 'BLACK') {
		var color2 = '검';
	}

	$('.inner-side-result').first().remove();

	$('.result-list').prepend('<div class="inner-side-result"><div class="inner-result"><div class="result-rounds">'+data.rounds+'</div>'+
		'<div class="game-res-circle '+data.res3Color+'">'+color3+'</div>'+
		'<div class="game-res-circle '+data.res2Color+'">'+color2+'</div>'+
		'<div class="game-res-circle NUMBER">'+data.numberRes+'</div></div></div>');

	setTimeout(function(){
		$('.result-list').prepend('<div class="inner-side-result"><div class="inner-result"><div class="result-rounds">'+(data.rounds + 1 )+'</div></div></div>');
	},5000);



	$(document).ready(function(){
	    setTimeout(function(){
	        var screenlength = $(window).width();
	        var ua = navigator.userAgent.toLowerCase(); 
	        if (ua.indexOf('safari') != -1) { 
	          if (ua.indexOf('chrome') > -1) {
	          } else {


	            if (screenlength <= 600) {
	            	$('.result-rounds').css('font-size' , '8px');
	            	$('.game-res-circle').css('font-size' , '15px');
	            } else if (screenlength <= 768) {

	            }
	          }
	        }

	    },2000);
	});


});


socket.on('loadData',function(data){

	$('.result-list').prepend('<div class="inner-side-result"><div class="inner-result"><div class="result-rounds">'+(data[0].rounds + 1 )+'</div></div></div>');

	var dataLen = data.length;

	for(i = 0; i < dataLen; i++) {
		var game = data[i];
		if (game.res3Color == 'GREEN') {
			var color3 = '초';
		} else if (game.res3Color == 'BLUE') {
			var color3 = '파';
		} else if (game.res3Color == 'RED') {
			var color3 = '빨';
		}

		if (game.res2Color == 'YELLOW') {
			var color2 = '노';
		} else if (game.res2Color == 'BLACK') {
			var color2 = '검';
		}


		$('.result-list').append('<div class="inner-side-result"><div class="inner-result"><div class="result-rounds">'+game.rounds+'</div>'+
			'<div class="game-res-circle '+game.res3Color+'">'+color3+'</div>'+
			'<div class="game-res-circle '+game.res2Color+'">'+color2+'</div>'+
			'<div class="game-res-circle NUMBER">'+game.numberRes+'</div></div></div>');
	} // End loop of previous data

})
setTimeout(function(){
	runGame();
},20000);


