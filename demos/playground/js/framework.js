/*
 *    framework.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    This is a simple custom framework for the game "EM"
 *
 *    needs: nothing
 *
 */
 
var fw = {
	
	// the distance formula
	distance : function (x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    }
	
};