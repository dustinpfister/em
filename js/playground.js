var playground = (function(){
	
	var pg = {
		
		// size of playground (only change on resize)
		xMax : 640,
		yMax : 480,
		
		// center point of playground (only change on resize)
		cx : 320,
		cy: 240,
		
		// an array of points
		points : [],
		maxPoints : 4
	
	},
	
	// the distance formula
	distance = function(x1,y1,x2,y2){
		
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		
	},
	
	// check if the given x, and y is to close to a previous point (use with call on pg)
	pointGood = function(x,y){
		
		var i = 0, len = this.points.length;
		
		while(i < len){
			
		    if(distance(x,y,this.points[i].x, this.points[i].y) <= 20){
				
				console.log('okay good');
				
			   return false;	
				
			}	
			
			i += 1;
			
		}
		
		return true;
		
	};
	
	// the api to return to playground global
	var api = {
		
		// add pg to the public api as my draw function will need it
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
			
			
			if(pg.points.length < pg.maxPoints){
			
			    // check if there is a point close by
			    if(pointGood.call(pg,x,y)){
				
				    pg.points.push({
					
					    x : x,
					    y : y
					
			    	});
				
			    }
			
			}
			
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