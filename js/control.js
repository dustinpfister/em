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
	 
	 
	return {
		
		pushPoint : function(e,x,y){
			
			console.log('push point:');
			console.log(x + ',' + y);
			
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
			
		}
		
	};
	 
 }());