/*
 *    points.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    A module for working with a Point, and Point Collections
 *
 *    needs: framework.js, playground.js
 *
 */

var points = (function () {

    // Point Constructor
    var Point = function (x, y, a, d, l) {

        this.x = x;
        this.y = y;
        this.a = a;
        this.d = d;
        this.startTime = new Date();
        this.lifespan = l === undefined ? 5000 : l;

    },

    pro = Point.prototype;

    // correct x, and y assuming valid a, and d
    pro.correctXY = function () {

        // set x and y based on a, and d relative to playground center.
        this.x = Math.cos(Math.PI * 2 * this.a) * (this.d * playground.maxDistance) + playground.cx;
        this.y = Math.sin(Math.PI * 2 * this.a) * (this.d * playground.maxDistance) + playground.cy;

    },

    // correct a and d assuming valid x, and y
    pro.correctAD = function () {

        // set the angle
        this.a = Math.atan2(
                playground.cy - this.y,
                playground.cx - this.x);

        // angle should be between 0 and 1
        this.a = (this.a + Math.PI) / (Math.PI * 2);

        // set distance
        this.d = fw.distance(this.x, this.y, playground.cx, playground.cy);

        // if point distance is greater then max distance
        if (this.d > playground.maxDistance) {

            // set distance to max
            this.d = playground.maxDistance;

        }

        // point distance should be between 0 and 1
        this.d = this.d / playground.maxDistance;

    };

	
	/*   Helper methods for PointCollection that do not need to be public
	 *   many of these are used with call in PointCollection.update, but are not part
	 *   of the prototype.
	 */
	 
	 // find and return the AVG point (use with call on pg)
	var setAVGPoint = function () {

        var i = 0,
        len = this.points.length,
        x = 0,
        y = 0;
		
		if(len === 0){
		
            this.AVGPoint = {

                x : 0,
                y : 0

            };		
			
		}else{
		
        while (i < len) {

            x += this.points[i].x;
            y += this.points[i].y;

            i += 1;
        }

        this.AVGPoint = {

            x : x / len,
            y : y / len

        };
		
		}

    },

    // find AVG distance of a collection from the given point
    setAVGDistance = function () {

        var d = 0,
        i = 0,
        len = this.points.length;
        while (i < len) {

            d += fw.distance(playground.cx, playground.cy, this.points[i].x, this.points[i].y);

            i += 1;

        }
		
		
        this.AVGDistance = d === 0 ? 0 : d / len;

    },

    setAVGAngle = function () {

        setAVGPoint.call(this);
		
        this.AVGAngle = Math.atan2(playground.cy - this.AVGPoint.y, playground.cx - this.AVGPoint.x) + Math.PI;

		console.log(this.AVGAngle);
		
    };
	
	
	
    // the PointCollcetion constructor
    var PointCollection = function () {

        // the point collection array
        this.points = [];
        this.maxPoints = 100;
		this.AVGPoint = 0;
        this.AVGDistance = 0;
		this.AVGANgle = 0;
		
    },

    pro = PointCollection.prototype;

    // what to do on a per frame tick basis.
    pro.update = function () {

        this.killOld();
		//this.AVGPoint = getAVGPoint.call(this);
		//this.AVGDistance = getAVGDistance.call(this);
		//this.AVGAngle = getAVGAngle.call(this);
        setAVGPoint.call(this);
		setAVGDistance.call(this);
		setAVGAngle.call(this);
    
	
	};

    // push a new point to the collection
    pro.pushPoint = function (x, y, a, d, l) {

        var thePoint;

        if (this.points.length < this.maxPoints) {

            thePoint = new Point(x, y, a, d, l);

            thePoint.correctAD();
            thePoint.correctXY();

            if (this.pointGood(thePoint.x, thePoint.y)) {

                this.points.push(thePoint);

            }

        }

    };

    // check if the given x, and y is to close to a previous point (use with call on pg)
    pro.pointGood = function (x, y) {

        var i = 0,
        len = this.points.length;
        while (i < len) {

            // ALERT! just a fixed distance of 20?
            if (fw.distance(x, y, this.points[i].x, this.points[i].y) <= 20) {

                return false;

            }

            i += 1;

        }

        return true;

    };

    // purge any old points from the collection
    pro.killOld = function () {

        var i = this.points.length,
        now = new Date();
        while (i--) {

            if (now - this.points[i].startTime >= this.points[i].lifespan) {

                // kill old point
                this.points.splice(i, 1);

            }

        }

    };

    // call point.correctXY for all points
    pro.correctXY = function () {

        this.points.forEach(function (point) {

            point.correctXY();

        });

    };

    // the public API
    api = {

        Point : Point,
        PointCollection : PointCollection

    };

    return api;

}
    ());