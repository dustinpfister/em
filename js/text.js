var text = (function(){

    var state = {
		
		lines : ['one', 'two', 'three','four', 'five', 'six'],
	    offset : 0,
		topLine : 0,
		lineY : 150,
	
	};

    return {
		
		state : state,
		
		update : function(){
			
			
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
			
			
		}
		
	};

}());