var text = (function(){

    var state = {
		
		lines : ['one', 'two', 'three','four', 'five', 'six'],
	    offset : 0,
		topLine : 0,
		lineY : 800,
		startY : 800,
		alpha : 0,
		speed : 0,
		active : false
	
	};

    return {
		
		state : state,
		
		// make a lines array from the given string
		makeLinesFrom : function(str){
			
			
			console.log(str.update.toString().split(';'));
			
			state.lines = str.update.toString().split(';');
			
		},
		
		update : function(EM){
			
			
			if(EM.ME.touchArray.length === 0){
				
				state.active = true;
				
				if(state.alpha < 1){
					
					state.alpha += 0.01;
					
				}else{
					
					state.alpha = 1;
					
				}
			
			if(state.lineY > 100){
				
                state.lineY -= 1;
						
			
			}else{
				
				state.offset -= 1;
				
				if(state.offset <= -1){
					
					state.offset = 50;
					
					state.topLine += 1;
					
					if(state.topLine === state.lines.length){
						
						state.topLine = 0;
						
					}
					
				}
				
			}
			
			}else{
				
				state.alpha -= 0.01;
				
				if(state.alpha <= 0){
				
				    state.alpha = 0;
				    state.offset = 0;
				    state.topLine = 0;
				    state.lineY = state.startY;
				
			    	state.active = false;
				
				}
				
			}
			
			
		}
		
	};

}());

text.makeLinesFrom(EM);