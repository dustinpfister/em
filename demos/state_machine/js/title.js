var title = (function(){
	
	
	return {
		
	    canContinue : false,
	    startGame : false,
		
		firstRun : function(){
			
			this.canContinue = gameState.findAnySave();
			this.startGame = false;
		},
	
        update : function(){
			
			gameState.update();
			
			if(gameState.points.points.length > 0){
				
				this.startGame = true;
				
			}
			
		}	
		
	}
	
}());