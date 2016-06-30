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
	
	newGame : function(){
		
		console.log( 'gamestate.js:  new game started. ' );
		
		this.points = new points.PointCollection();
		
	},
	
	pushPoint : function(x,y){
	
         this.points.pushPoint(x,y);	
		
	},
	
	update : function(){
		
		
	}
	 
 };