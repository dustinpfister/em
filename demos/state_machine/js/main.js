var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d'),

drawTitle = function(){
	
	// background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

	// title text
	ctx.fillStyle = '#ffffff';
	ctx.font = '50px arial';
	ctx.textBaseline = 'top';
	ctx.textAlign='center';
	ctx.fillText('EM', canvas.width / 2, 50);
	
	ctx.font = '20px arial';
	ctx.fillText('touch to start', canvas.width / 2, 120);
	
	
	var points = gameState.points.points,
    i = 0,
    len = points.length;

    // draw points
    while (i < len) {

        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        i += 1;
    }
},

draw = function () {

    // background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 3;

    // show playground.cx/cy point
    ctx.strokeStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(playground.cx, playground.cy, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    // max distance of playground
    ctx.strokeStyle = '#808080';
    ctx.beginPath();
    ctx.arc(playground.cx, playground.cy, playground.maxDistance, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    drawPoints();
    drawGuy();

},

drawGuy = function () {

    var g = guy.state;

    ctx.strokeStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(g.x, g.y, 20, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    drawLikePoints();
    drawSugPoints();
    //drawHappy();

},

drawLikePoints = function () {

    var points = guy.state.likePoints.points,
    i = 0,
    len = points.length;

    // draw points
    while (i < len) {

        ctx.strokeStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        i += 1;
    }

},

drawSugPoints = function () {

    var points = guy.state.sugPoints.points,
    i = 0,
    len = points.length;

    // draw points
    while (i < len) {

        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        i += 1;
    }

},

drawPoints = function () {

    var points = gameState.points.points,
    i = 0,
    len = points.length;

    // draw points
    while (i < len) {

        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        i += 1;
    }

    drawAVGPoint();
    drawAVGAngle();
},

drawAVGPoint = function () {

    var AVG = gameState.points.AVGPoint;

    if (gameState.points.points.length > 0) {

        //drawAVGAngle();

        ctx.strokeStyle = '#0000ff';
        ctx.beginPath();
        ctx.arc(AVG.x, AVG.y, 15, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

    }

},

drawAVGAngle = function () {

    ctx.strokeStyle = '#ff0000';

    ctx.beginPath();
    ctx.moveTo(playground.cx, playground.cy);
    ctx.lineTo(
        Math.cos(gameState.points.AVGAngle) * gameState.points.AVGDistance + playground.cx,
        Math.sin(gameState.points.AVGAngle) * gameState.points.AVGDistance + playground.cy);
    ctx.closePath();
    ctx.stroke();

},

machine = {

    current : 'start',
    firstRun : true,
	
	start : {
		
		firstRun : function () {

            playground.resize(canvas);
            guy.resize();
            gameState.newGame();

			machine.firstRun = true;
            machine.current = 'title';

        },
		
		update : function(){}
		
	},

	title : {
		
		firstRun : function(){
			
			title.firstRun();
			machine.firstRun = false;
			
		},
		
		update : function(){
		
	    	title.update();
			
			if(title.startGame){
			
                machine.firstRun = true;			
				machine.current = 'game';
				
			}
			
			drawTitle();
		
	    }
		
	},
	
    game : {
		
		firstRun : function(){
			
			gameState.points = new points.PointCollection();
			control.setDelay(5000);
			
			machine.firstRun = false;
			
		},
		
		update : function () {

            gameState.update();
            guy.update();
            draw();

        }
		
	}
	
	/*
    start : function () {

        playground.resize(canvas);
        guy.resize();
        gameState.newGame();

        machine.current = 'title';

    },

	title : function(){
		
		title.update();
		
	},
	
    game : function () {

        gameState.update();
        guy.update();
        draw();

    }
	*/

};

var loop = function () {

    setTimeout(loop, 33);

	if(machine.firstRun){
		
		machine[machine.current].firstRun();
		
	}else{
	
        machine[machine.current].update();

	}
};

//window.addEventListener('resize', function(){ playground.resize(canvas) } );
	window.addEventListener('resize', function(){control.resize(canvas);} );
	
	// attach mouse events
    canvas.addEventListener('mousedown', control.inMaster);
    canvas.addEventListener('mouseup', control.inMaster);
    //canvas.addEventListener('mousemove', control.inMaster);

    // attach touch events
    canvas.addEventListener('touchstart', control.inMaster);
    canvas.addEventListener('touchend', control.inMaster);
    canvas.addEventListener('touchmove', control.inMaster);

loop();
