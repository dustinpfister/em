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
	 
	touchPoints : {},
	
	newGame : function(){
		
		console.log( 'gamestate.js:  new game started. ' );
		
		this.touchPoints = new points.PointCollection();
		
	},
	
	update : function(){
		
		
	}
	 
 };