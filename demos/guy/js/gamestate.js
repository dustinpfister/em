/*
 *    gamestate.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    game state or model for the game "EM"
 *
 *    needs: ALERT! update this into it is important
 *
 */

var gameState = (function () {
	
	// as the name suggests currentSave will store the current save state of the game
	var currentSave,
	
	// the SaveState constructor function
	SaveState = function(){
		
		this.xp = 0;
		this.guy = {

            // the saved state of the guys like points
            likePoints : [
                {
                    angle : 0,
                    distance : 0.5
                }

            ]

        };
        this.lastAutoSave = new Date();		
		
		this.slotCheck();
		
	},
	
	pro = SaveState.prototype;
	
	// create save state slots if they are not there.
	pro.slotCheck = function(){
		
		// if no autosave
		if(!localStorage.getItem('autosave')){
			
			// default it to this
			localStorage.setItem('autosave', JSON.stringify(this));
			
		}
		
	};
	
	// update this SaveState instance, but do not actually save it to local storage.
	pro.stateUpdate = function(){
		
		
		this.guy = guy.getStateData();
		
	};
	
	// autosave this SaveState instance to the autosave slot, if enough time has elapsed.
	pro.autoSave = function(){
		
		var now = new Date();
		
		if(now - this.lastAutoSave >= 10000){
			
			console.log('autosave of SaveState instance.');
			
			this.stateUpdate();
			this.lastAutoSave = now
			
			localStorage.setItem('autosave', JSON.stringify(this));
			
		}
		
	};
	
	// configure this SaveState to the given localStorage item
	pro.fromStorage = function(storageItem){
		
		var item = JSON.parse(localStorage.getItem(storageItem));
		
		
		for(var prop in item){
			
			this[prop] = item[prop];
			
		}
		
		// convert date string to actual Date instance
		this.lastAutoSave = new Date(item.lastAutoSave);
		
	};
	
	// default currentSave to a clean SaveState instance.
	currentSave = new SaveState();
	
	currentSave.fromStorage('autosave');
	
	// the public API.
    return {

        points : {},

		// As the name suggests this is to be called to start a new game.
        newGame : function () {

		    // make currentSave a clean, new, instance of SaveState.
	        currentSave = new SaveState();
		
            this.points = new points.PointCollection();

            guy.setLikes(currentSave.guy.likePoints);

        },

        pushPoint : function (x, y) {

            this.points.pushPoint(x, y);

        },

        update : function () {

            // kill any old points
            //this.points.killOld();
            this.points.update();
			
			// autosave
			currentSave.autoSave();

        },

        resize : function () {

            this.points.correctXY();

        }

    };

}
    ());
