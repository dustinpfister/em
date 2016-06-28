var playground = (function(){
	
	var pg = {
		
		// size of playground (only change on resize)
		xMax : 640,
		yMax : 480,
		
		// center point of playground (only change on resize)
		cx : 320,
		cy: 240,
		
		// an array of points
		points : []
		
	},
	
	// the api to return to playground global
	api = {
		
		// add pg to the api
		pg : pg,
		
		
		
		// resize the playground, and given canvas to window
		resize : function(canvas){
			
			console.log('okay');
			
			pg.xMax = window.innerWidth;
			pg.yMax = window.innerHeight;
			
			canvas.width = pg.xMax;
			canvas.height = pg.yMax;
			
			pg.cx = pg.xMax / 2;
			pg.cy = pg.yMax / 2;
			
			
		},
		
		// push a point based on event, and x, and y from inMaster
		pushPoint : function(e,x,y){
			
			console.log(x,y);
			
			
		},
		
		// in mater to be called by event handers
		inMaster : function(e){
		
		    var box = e.target.getBoundingClientRect(),
			x,y,t,tLen;
		
		    e.preventDefault();
	
	        // if touch event
	        if(e.touches){
	
	            t = 0, tLen = e.touches.length;
				
				while(t < tLen){
					
					api.pushPoint(e, e.touches[t].clientX - box.left, e.touches[t].clientY - box.top);
					
					t += 1;
				}
	
	        // if not touch assume mouse
	        }else{
	
	            api.pushPoint(e, e.clientX - box.left, e.clientY - box.top);
	
	        }
			
		}
		
		
	};
	
	return api;
	
}());