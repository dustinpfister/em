var EM = (function(){

    var ME = {
	
	    cx : 0,
		cy : 0,
		
		x : 0,
		y : 0,
		
		dx : 0,
		dy: 0,
		
		w : 320,
		h : 240,
		
		xMax : 640,
		yMax : 480,
		
		moveRate : 100,
		
		totalOrbits: 1,
		orbitHeight : 100,
		orbitRadian : 0,
		orbitTick : 0,
		orbitMaxTick : 1500,
		orbitSpeed: 20,       // higher numbers are slower
		deltaTick : 1,
		orbits : [],
		
		touchArray : [],
		maxTouch : 10,
		lastTouch : new Date(0),
		lastPurge : new Date(0),
		touchLife : 5000,
		
		happy : 0,
		deltaHappy : -0.01,
		updateRate : 1000,
		lastUpdate : new Date(0),
		
		
		points : 0,
		pointRate : 0,
		level : 1,
		
		findAVGTouch : function(){
			
			var t = 0, tLen = this.touchArray.length, x = 0, y = 0;
			
			while(t < tLen){
				
				x += this.touchArray[t].x;
				y += this.touchArray[t].y;
				
				t += 1;
			}
			
			return {
				
				x: x / tLen,
				y: y / tLen
				
			};
			
		}
	
	},
	
	distance = function(x1,y1,x2,y2){
		
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		
	},
	
	Orbit = function(aurgs){
	
	    var a;
	
	    aurgs = aurgs === undefined ? {} : aurgs;
		
		if(aurgs.startD === undefined){ aurgs.startD = 200; }
		if(aurgs.cx === undefined){ aurgs.cx = 0;}
		if(aurgs.cy === undefined){ aurgs.cy = 0;}
	    if(aurgs.targetX === undefined){ aurgs.targetX = 320;}
		if(aurgs.targetY === undefined){ aurgs.targetY = 240;}
	
	    a = Math.PI * 2 * Math.random();
	
	    this.x = Math.cos(a) * aurgs.startD + aurgs.cx;
		this.y = Math.sin(a) * aurgs.startD + aurgs.cy;
		
		this.dx = 0;
		this.dy = 0;
		
		this.targetX = aurgs.targetX;
		this.targetY = aurgs.targetY;
	
	};
	
	Orbit.prototype = {
		
		setDelta : function(){
			
			a = Math.atan2(this.targetY - this.y, this.targetX - this.x),
			d = distance(this.targetX, this.targetY, this.x, this.y),
			
			overFrame = ME.orbitSpeed;
			
			if(d <= ME.orbitSpeed){
				
			    overFrame = 1 + Math.floor((d / 20) * 9);
				
			}
			
			this.dx = Math.cos(a) * (d / overFrame);
			this.dy = Math.sin(a) * (d / overFrame);
			
		},
		
		setTarget : function(x,y){
			
			this.targetX = x;
			this.targetY = y;
			
		},
		
		step : function(){
			
			this.setDelta();
			
			this.x += this.dx;
			this.y += this.dy;
			
			
		}
		
	};

    return {
	
	    // a refrence to the ME object
	    ME : ME,
	
	    // update is to be called on each frame tick
	    update : function(){
		
		    var now = new Date(), 
			aToCenter = Math.atan2(ME.cy - ME.y, ME.cx - ME.x),
			dToCenter = distance(ME.x,ME.y,ME.cx,ME.cy), a, d,avg,x,y;
			
			// if the amount of time that has passed sense the last touch is greater then touchLife
			if(now - ME.lastTouch >= ME.touchLife){
				
				if(now - ME.lastPurge >= 1000 && ME.touchArray.length > 0){
					
					ME.touchArray.shift();
					
					ME.lastPurge = new Date();
					
				}
				
			}
			
			if(now - ME.lastUpdate >= 1000){
				
				// delta happy default
				ME.deltaHappy = -0.005;
				
				// if being touched
				if(ME.touchArray.length > 0){
					
				   ME.deltaHappy = ME.touchArray.length / ME.maxTouch * 0.05;	
				
                   ME.pointRate = Math.floor(9 * ME.happy) + 1;

				
				}else{
					
					ME.pointRate = Math.floor(99 * ME.happy) + 1;

				}
				
				ME.happy += ME.deltaHappy;
				if(ME.happy < 0){ ME.happy = 0; }
				if(ME.happy > 1){ ME.happy = 1; }
				
				var part = ME.w / 4;
				
				ME.orbitHeight = part * 3 * ME.happy + part;
				
				ME.orbitSpeed = 20 - Math.floor(19 * ME.happy);
				
				//ME.orbitHeight = 160;
				
				//ME.orbitMaxTick = 2000 - 1950 * ME.happy;
				
				ME.deltaTick = Math.floor(29 * ME.happy + 1);
				
				ME.moveRate = 100 - 95 * ME.happy;
				
				ME.lastUpdate = new Date();
				
				
				
				ME.points += ME.pointRate;
				
				ME.level = Math.floor(Math.log(ME.points) / Math.log(2)) + 1;
				
				this.levelUp();
				
			}
			
			// update on each frame tick:
			
			// if no touching move to center 
			if(ME.touchArray.length === 0){
			
		    	ME.dx = Math.cos(aToCenter) * (dToCenter / ME.moveRate);
		    	ME.dy = Math.sin(aToCenter) * (dToCenter / ME.moveRate);
			
			}else{
				
				avg = ME.findAVGTouch();
				x = avg.x - ME.w / 2; 
				y = avg.y - ME.h / 2;
				
				a = Math.atan2(y - ME.y, x - ME.x),
				d = distance(x, y, ME.x, ME.y);
				
				ME.dx = Math.cos(a) * (d / ME.moveRate);
		    	ME.dy = Math.sin(a) * (d / ME.moveRate);
			}
			
			// update orbits
			
			var oi = 0, oa;
			
			ME.orbitTick += ME.deltaTick;
			
			if(ME.orbitTick >= ME.orbitMaxTick){
				
				ME.orbitTick = ME.orbitTick % ME.orbitMaxTick;
				
			}
			
			ME.orbitRadian = Math.PI * 2 / ME.orbitMaxTick * ME.orbitTick;
			
			while(oi < ME.orbits.length){
				
				oa = Math.PI * 2 / ME.orbits.length * oi + ME.orbitRadian;
				
				ME.orbits[oi].setTarget(
				    Math.cos(oa) * ME.orbitHeight + ME.x + ME.w / 2,
					Math.sin(oa) * ME.orbitHeight + ME.y + ME.h / 2
					//Math.cos(oa) * ME.orbitHeight + 200,
					//Math.sin(oa) * ME.orbitHeight + 200
				);
				ME.orbits[oi].step();
				
				
				oi += 1;
			}
			
			ME.x += ME.dx;
			ME.y += ME.dy;
		
		},
		
		levelUp : function(){
		
		    var i, a;
		
            ME.totalOrbits = Math.floor(ME.level / 2);;		
			//ME.totalOrbits = 16;
			
			if(ME.totalOrbits > 15){
				
				ME.totalOrbits = 15;
				
			}else{
			
			    i = ME.orbits.length - 1;
				
			    while(i < ME.totalOrbits){
				
				    a = Math.PI * 2 / ME.totalOrbits * i;
				
				    ME.orbits.push(new Orbit({
				    	cx : ME.cx,
			    		cy : ME.cy,
			    		startD: 1000,
			    		targetX : Math.cos(a) * 10 + ME.cx,
			    		targetY : Math.sin(a) * 10 + ME.cy
		    		}));
				
		    		i += 1;
				
			}
			
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
		
		    ME.x = ME.cx;
			ME.y = ME.cy;
			
			// setup orbits
			
			var i = 0, a;
			while(i < ME.totalOrbits){
				
				a = Math.PI * 2 / ME.totalOrbits * i;
				
				ME.orbits.push(new Orbit({
					cx : ME.cx,
					cy : ME.cy,
					startD: 1000,
					targetX : Math.cos(a) * 10 + ME.cx,
					targetY : Math.sin(a) * 10 + ME.cy
				}));
				
				i += 1;
			}
		
		},
		
		// what to do on a canvas resize
		resize : function(width, height){
			
			ME.xMax = width;
			ME.yMax = height;
			
			ME.cx = ME.xMax / 2 - ME.w / 2;
			ME.cy = ME.yMax / 2 - ME.h / 2;
			
			ME.x = ME.cx;
			ME.y = ME.cy;
			
		},
		
		// push a new touch at location x, y
		pushTouch : function(x, y){
			
			if(new Date() - ME.lastTouch > 1000){
			
			if(ME.touchArray.length === ME.maxTouch){
				
				ME.touchArray.shift();
				
			}
			
			ME.touchArray.push({
				
				x: x,
				y: y
				
			});
			
			ME.lastTouch = new Date();
			
			}
			
		},
		
		inMaster : function(e){
		
		    var box = e.target.getBoundingClientRect(),
			x,y,t,tLen;
		
		    e.preventDefault();
	
	        if(e.touches){
	
	            t = 0, tLen = e.touches.length;
				
				while(t < tLen){
					
					EM.pushTouch(e.touches[t].clientX, e.touches[t].clientY);
					
					t += 1;
				}
	
	        }else{
	
	            EM.pushTouch(e.clientX - box.left, e.clientY - box.top);
	
	        }
		
		}
		
	};

}());
