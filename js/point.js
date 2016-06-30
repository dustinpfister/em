/*
 *    point.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    methods that are to be used with points in playground.js, and guy.js
 *
 *    needs: playground.js
 *
 */
 
var point = {
	
	// correct x, and y assuming valid a, and d ( use with call on points)
    correctXY : function () {

	    // ref to playground
        var pg = playground.pg;

		// set x and y based on a, and d relative to playground center.
        this.x = Math.cos(Math.PI * 2 * this.a) * (this.d * pg.maxDistance) + pg.cx;
        this.y = Math.sin(Math.PI * 2 * this.a) * (this.d * pg.maxDistance) + pg.cy;

    },
	
	// correct a and d assuming valid x, and y ( use with call on points)
    correctAD : function () {

	    // ref to playground
        var pg = playground.pg;

        // set the angle
        this.a = Math.atan2(
                pg.cy - this.y,
                pg.cx - this.x);

        // angle should be between 0 and 1
        this.a = (this.a + Math.PI) / (Math.PI * 2);

        // set distance
        this.d = fw.distance(this.x, this.y, pg.cx, pg.cy);

        // if point distance is greater then max distance
        if (this.d > pg.maxDistance) {

            // set distance to max
            this.d = pg.maxDistance;

        }

        // point distance should be between 0 and 1
        this.d = this.d / pg.maxDistance;

    }
	
};