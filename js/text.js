var text = (function(){

    var state = {
		
		lines : ['one', 'two', 'three'],
	    offset : 0,
		topLine : 0,
		lineY : 400,
	
	};

    return {
		
		state : state,
		
		update : function(){
			
			
			if(state.lineY > 100){
				
                state.lineY -= 1;
						
			
			}
			
			
		}
		
	};

}());