var guyAI = (function(){
	
	var findTarget = function (state) {

            var roll,
            index;

            // if points follow them
            if (gameState.points.points.length > 0) {

                state.targetX = gameState.points.AVGPoint.x;
                state.targetY = gameState.points.AVGPoint.y;
				
                state.lastChoice = new Date();

            // else autonomy
            } else {

                if (new Date() - state.lastChoice >= state.choiceRate) {

                    // default to home
                    state.targetX = state.homeX;
                    state.targetY = state.homeY;

                    roll = Math.random();

                    // might leave home to do a like
                    if (roll <= state.likeChance && state.likePoints.points.length > 0) {
					
                        index = Math.floor(Math.random() * state.likePoints.points.length);

                        state.targetX = state.likePoints.points[index].x;
                        state.targetY = state.likePoints.points[index].y;

                    // else might leave home to do a suggestion
                    } else {

					
					    if (state.sugPoints.points.length > 0) {

                            roll = Math.random();

                            if (roll <= state.sugChance) {

                                index = Math.floor(Math.random() * state.sugPoints.points.length);

                                state.targetX = state.sugPoints.points[index].x;
                                state.targetY = state.sugPoints.points[index].y;

                            }

                        }
						
                    }

                    state.lastChoice = new Date();

                }

            }

        };
	
	return {

	    // does not respond to touching, and suggestion points have no effect on like points
        stubborn : {
		
		    update : function(state){
				
				var roll, index;
				
			    if (new Date() - state.lastChoice >= state.choiceRate) {

                    // default to home
                    state.targetX = state.homeX;
                    state.targetY = state.homeY;

                    roll = Math.random();
			
			        // might leave home to do a like
                    if (roll <= state.likeChance && state.likePoints.points.length > 0) {
					
                        index = Math.floor(Math.random() * state.likePoints.points.length);

                        state.targetX = state.likePoints.points[index].x;
                        state.targetY = state.likePoints.points[index].y;

                    }
				
				    state.lastChoice = new Date();
				
				}
			
		    }
		
	    },
		
		// responds to being touched, but does not respond to suggestion points 
		likestouch : {
			
			update : function(){
				
				
			}
			
		}

    };
	
}());