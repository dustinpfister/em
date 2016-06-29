
var guy = (function(){
	
	var state = {
		
		homeX : playground.pg.cx,
		homeY : playground.pg.cy,
		targetX : playground.pg.cx,
		targetY : playground.pg.cy,
		x: 100,
		y: 100,
		dx: 0,
		dy: 0,
		moveRate: 20
		
	},
	
	// ALERT! this is also in playground!
	distance = function(x1,y1,x2,y2){
		
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		
	},
	
	api = {
		
		state: state,
		
		update : function(){
			
			var a,d;
			
			state.targetX = state.homeX;
            state.targetY = state.homeY;				
				
			if(playground.pg.points.length > 0){
				
				state.targetX = playground.pg.AVGPoint.x;
				state.targetY = playground.pg.AVGPoint.y;
				
			}
			
			a = Math.atan2(state.targetY - state.y, state.targetX - state.x),
			d = distance(state.x,state.y,state.targetX,state.targetY);
			
			//state.dx = Math.cos(angle) * 5;
			//state.dy = Math.sin(angle) * 5;
			
			state.dx = Math.cos(a) * (d / state.moveRate);
		    state.dy = Math.sin(a) * (d / state.moveRate);
			
			state.x += state.dx;
			state.y += state.dy;
			
		},
		
		resize : function(){
			
			state.homeX = playground.pg.cx;
			state.homeY = playground.pg.cy;
			state.targetX = playground.pg.cx;
			state.targetY = playground.pg.cy;
		}
		
	};
	
	return api;
	
}());