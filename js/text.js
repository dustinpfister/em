var text = (function(){

    var state = {
		
		lines : ['one', 'two', 'three'],
	    offset : 0
	
	};

    return {
		
		state : state,
		
		update : function(){
			
			state.offset -= 1;
			
			if(state.offset === -1){
				
				state.offset = 15
				
			}
			
			
		}
		
	};

}());