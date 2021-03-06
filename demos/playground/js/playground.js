/*
 *    playground.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    A module for working with "a playground" that has a certain width, and height.
 *    The playground also has a certain center point, and a max distance from that point
 *
 *    needs: nothing
 *
 */

var playground = {
	
	width: 640,
	height: 480,
	cx: 320,
	cy: 240,
	maxDistance : 240,
	
	resize : function(canvas){
			
		this.width = window.innerWidth;
		this.height = window.innerHeight;
			
		canvas.width = this.width;
		canvas.height = this.height;
			
		this.cx = this.width / 2;
		this.cy = this.height / 2;
			
		this.maxDistance = this.width < this.height ? this.width / 2 * 0.9 : this.height / 2 * 0.9;
			
	}
	
};


/*
var playground = (function(){
	
	var pg = {
		
		// size of playground (only change on resize)
		xMax : 640,
		yMax : 480,
		
		// center point of playground (only change on resize)
		cx : 320,
		cy: 240,
		
		// max distance from center
		maxDistance : 200,
		
		// an array of points
		points : [],
		AVGPoint : {x:0,y:0},
		AVGAngle : 0,
		AVGDistance: 0,
		maxPoints : 100
	
	},
	
	// kill old points from pg (use with call on pg)
	pointKillOld = function(){
		
		var i = this.points.length, now = new Date();
		
		while(i--){
		
            if(now - this.points[i].startTime >= this.points[i].lifespan){
				
				// kill old point
				this.points.splice(i,1);
				
			}
			
		}
		
	},
	
	// find and return the AVG point (use with call on pg)
	pointAVG = function(){
			
		var i = 0, len = this.points.length, x = 0, y = 0;
			
		while(i < len){
				
			x += this.points[i].x;
			y += this.points[i].y;
			
			i += 1;
		}
			
		return {
				
			x: x / len,
			y: y / len
				
		};
			
	},
	
	// find the AVG Angle from playground center (use with call on pg)
	pointAVGAngle = function(){
		
		return Math.atan2(this.cy - this.AVGPoint.y, this.cx - this.AVGPoint.x ) + Math.PI;
		
	},
	
	// find AVG distance
	pointAVGDistance = function(){
		
		var d = 0, i = 0, len = this.points.length;
		
		while(i < len){
			
			d += fw.distance(this.cx,this.cy,this.points[i].x,this.points[i].y);
			
			i += 1;
			
		}
		
		this.AVGDistance = d / len;
		
	},
	
	// check if the given x, and y is to close to a previous point (use with call on pg)
	pointGood = function(x,y){
		
		var i = 0, len = this.points.length;
		
		while(i < len){
			
		    if(fw.distance(x,y,this.points[i].x, this.points[i].y) <= 20){
				
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
		
		// what to do on each call of update ( this should be called in your game loop )
		update : function(){
			
			// if we have points
			if(pg.points.length > 0){
			
				pg.AVGAngle = pointAVGAngle.call(pg);
				
				pointAVGDistance.call(pg);
			
			    // find the avg point
		    	pg.AVGPoint = pointAVG.call(pg);
			
			    // kill any old points
			    pointKillOld.call(pg);
			
			    
				
				
			
			}
			
		},
		
		// resize the playground, and given canvas to window
		resize : function(canvas){
			
			pg.xMax = window.innerWidth;
			pg.yMax = window.innerHeight;
			
			canvas.width = pg.xMax;
			canvas.height = pg.yMax;
			
			pg.cx = pg.xMax / 2;
			pg.cy = pg.yMax / 2;
			
			pg.maxDistance = pg.xMax < pg.yMax ? pg.xMax / 2 * 0.9 : pg.yMax / 2 * 0.9;
			
		},
		
		// push a point based on event, and x, and y from inMaster
		pushPoint : function(e,x,y){
			
			if(pg.points.length < pg.maxPoints){
			
			    // check if there is a point close by
			    if(pointGood.call(pg,x,y)){
				
				    pg.points.push({
					
					    x : x,
					    y : y,
						startTime : new Date(),
						lifespan : 3000
					
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
*/