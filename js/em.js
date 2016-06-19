var EM = (function(){

    var ME = {
	
	    cx : 0,
		cy : 0,
		dx : 0,
		dy: 0,
		w : 320,
		h : 240,
		
		totalOrbits: 3,
		orbits : [],
		happy : 0.1
	
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
		
		    this.ME.cx += this.ME.dx;
			this.ME.cy += this.ME.dy;
		
		
		},
		
		// setup EM
		setup : function(options){
		
		    if(options === undefined){ options = {}; }
			if(options.width === undefined){ options.width = 320;}
			if(options.height === undefined){ options.height = 240;}
		
		    ME.cx = options.width / 2 - ME.w / 2;
		    ME.cy = options.height / 2 - ME.h / 2;
		
		},
		
		inMaster : function(e){
		
		    var box = e.target.getBoundingClientRect(),
			x,y;
		
		    e.preventDefault();
	
	        if(e.touches){
	
	            x = e.touches[0].clientX;
				y = e.touches[0].clientY;
	
	        }else{
				
				x = e.clientX;
				y = e.clientY;
	
	        }
			
			EM.ME.cx = x - EM.ME.w / 2 - box.left;
			EM.ME.cy = y - EM.ME.h / 2 - box.top;
	
	/*
	        if(e.touches){
	
	            console.log('touch');
				
				console.log(e.touches[0].clientX);
	
	            EM.ME.cx = e.touches[0].clientX - EM.ME.w / 2;
				EM.ME.cy = e.touches[0].clientY - EM.ME.h / 2;
	
	        }else{
	
	            console.log('mouse');
				
				EM.ME.cx = e.clientX - EM.ME.w / 2;;
				EM.ME.cy = e.clientY - EM.ME.h / 2;
	
	        }
		*/
		
		}
		
	};

}());