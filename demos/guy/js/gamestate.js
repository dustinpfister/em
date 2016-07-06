/*
 *    gamestate.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    game state or model for the game "EM"
 *
 *    needs: ALERT! update this into it is important
 *
 */
 
 var gameState = {
	 
	points : {},
	
	// the current save state
	save : {
		
		xp: 0,
		
		guy: {
			
			// the saved state of the guys like points
			likePoints : [
			
			    {angle: 0, distance: 0.5}
			
			]
			
		}
		
	},
	
	newGame : function(){
		
		this.points = new points.PointCollection();
		
		guy.setLikes(this.save.guy.likePoints);
		
	},
	
	pushPoint : function(x,y){
	
         this.points.pushPoint(x,y);	
		
	},
	
	update : function(){
		
		// kill any old points
		//this.points.killOld();
		this.points.update();
		
		
	},
	
	resize : function(){
		
		this.points.correctXY();
		
	}
	 
 };