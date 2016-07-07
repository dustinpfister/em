/*
 *    control.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    controller for the game "EM"
 *
 *    needs: ALERT! update this into it is important
 *
 */
 
 
 var control = (function(){
	 
	var pointDelay = {
			
		active : true,
		time : 1000,
		activeAt : new Date()
			
	};
	 
	return {
		
		// set the point push delay
		setDelay : function(time){
			
			if(time === undefined){ time = 3000; }
			
			pointDelay.active = true;
			pointDelay.time = time;
			pointDelay.activeAt = new Date();
			
		},
		
		pushPoint : function(e,x,y){
			
			if(!pointDelay.active){
			
			    gameState.pushPoint(x,y)
			
			}else{
			
                if(new Date() - pointDelay.activeAt >= pointDelay.time){
					
					pointDelay.active = false;
					
				}			
				
			}
			
		},
		
		inMaster : function(e){
		
		    var box = e.target.getBoundingClientRect(),
			x,y,t,tLen;
		
		    e.preventDefault();
	
	        // if touch event
	        if(e.touches){
	
	            t = 0, tLen = e.touches.length;
				
				while(t < tLen){
					
					control.pushPoint(e, e.touches[t].clientX - box.left, e.touches[t].clientY - box.top);
					
					t += 1;
				}
	
	        // if not touch assume mouse
	        }else{
	
	            control.pushPoint(e, e.clientX - box.left, e.clientY - box.top);
	
	        }
			
		},
		
		resize : function(canvas){
			
			playground.resize(canvas);
            gameState.resize();		
			guy.resize();
		
		}
		
	};
	 
 }());