var text = (function(){

    var state = {
		
		lines : ['one', 'two', 'three','four', 'five', 'six'],
	    offset : 0,
		topLine : 0,
		lineY : 150,
		alpha : 0,
		active : false
	
	};

    return {
		
		state : state,
		
		update : function(touch){
			
			
			if(touch.length === 0){
				
				state.active = true;
				
				if(state.alpha < 1){
					
					state.alpha += 0.05;
					
				}else{
					
					state.alpha = 1;
					
				}
			
			if(state.lineY > 100){
				
                state.lineY -= 1;
						
			
			}else{
				
				state.offset -= 1;
				
				if(state.offset <= -1){
					
					state.offset = 15;
					
					state.topLine += 1;
					
					if(state.topLine === state.lines.length){
						
						state.topLine = 0;
						
					}
					
				}
				
			}
			
			}else{
				
				state.alpha -= 0.05;
				
				if(state.alpha <= 0){
				
				    state.alpha = 0;
				    state.offset = 0;
				    state.topLine = 0;
				    state.lineY = 150;
				
			    	state.active = false;
				
				}
				
			}
			
			
		}
		
	};

}());