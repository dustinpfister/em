var EM = (function(){

    var ME = {
	
	    cx : 0,
		cy : 0,
		dx : 0,
		dy: 0,
		w : 320,
		h : 240,
		
		xMax : 640,
		yMax : 480,
		
		totalOrbits: 3,
		orbits : [],
		
		touchArray : [],
		maxTouch : 10,
		lastTouch : new Date(0),
		lastPurge : new Date(0),
		touchLife : 5000,
		
		happy : 0.1,
		deltaHappy : -0.01,
		updateRate : 1000,
		lastUpdate : new Date(0)
	
	},
	
	Orbit = function(){
	
	    this.x = 0;
		this.y = 0;
	
	};

    return {
	
	    // a refrence to the ME object
	    ME : ME,
	
	    // update is to be called on each frame tick
	    update : function(){
		
		    //this.ME.cx += this.ME.dx;
			//this.ME.cy += this.ME.dy;
		
		    var now = new Date();
			
			// if the amount of time that has passed sense the last touch is greater then touchLife
			if(now - ME.lastTouch >= ME.touchLife){
				
				if(now - ME.lastPurge >= 1000 && ME.touchArray.length > 0){
					
					ME.touchArray.shift();
					
					ME.lastPurge = new Date();
					
				}
				
			}
			
			if(now - ME.lastUpdate >= 1000){
				
				
				
				// delta happy default
				ME.deltaHappy = -0.01;
				
				if(ME.touchArray.length > 0){
					
				   ME.deltaHappy = ME.touchArray.length / ME.maxTouch * 0.05;	
					
				}
				
				console.log(ME.happy);
				
				ME.happy += ME.deltaHappy;
				if(ME.happy < 0){ ME.happy = 0; }
				if(ME.happy > 1){ ME.happy = 1; }
				
				
				ME.lastUpdate = new Date();
				
				
			}
		
		
		},
		
		// setup EM
		setup : function(options){
		
		    if(options === undefined){ options = {}; }
			if(options.w === undefined){ options.w = 320;}
			if(options.h === undefined){ options.h = 240;}
		    if(options.xMax === undefined){ options.xMax = 640;}
			if(options.yMax === undefined){ options.yMax = 480;}
		
		
		    ME.xMax = options.xMax;
			ME.yMax = options.yMax;
			ME.w = options.w;
			ME.h = options.h;
			
			ME.cx = ME.xMax / 2 - ME.w / 2;
			ME.cy = ME.yMax / 2 - ME.h / 2;
		
		},
		
		// push a new touch at location x, y
		pushTouch : function(x, y){
			
			if(ME.touchArray.length === ME.maxTouch){
				
				ME.touchArray.shift();
				
			}
			
			ME.touchArray.push({
				
				x: x,
				y: y
				//time: new Date()
				
			});
			
			ME.lastTouch = new Date();
			
		},
		
		inMaster : function(e){
		
		    var box = e.target.getBoundingClientRect(),
			x,y,t,tLen;
		
		    e.preventDefault();
	
	        if(e.touches){
	
	            //x = e.touches[0].clientX;
				//y = e.touches[0].clientY;
	
	            t = 0, tLen = e.touches.length;
				
				while(t < tLen){
					
					EM.pushTouch(e.touches[t].clientX, e.touches[t].clientY);
					
					t += 1;
				}
	
	        }else{
				
				//x = e.clientX;
				//y = e.clientY;
	
	            EM.pushTouch(e.clientX - box.left, e.clientY - box.top);
	
	        }
			
			
		
		}
		
	};

}());