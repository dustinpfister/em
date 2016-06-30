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

    // Point Constructor and Prototype returned to Point so I can type var just once,
    // and keep the prototype directly bellow the constrictor
    var Point = (function () {

        var Point = function (x, y, a, d, l) {

            this.x = x;
            this.y = y;
            this.a = a;
            this.d = d;
            this.startTime = new Date();
            this.lifespan = l;

        },

        pro = Point.prototype;

        // correct x, and y assuming valid a, and d
        pro.correctXY = function () {

            // ref to playground
            var pg = playground.pg;

            // set x and y based on a, and d relative to playground center.
            this.x = Math.cos(Math.PI * 2 * this.a) * (this.d * pg.maxDistance) + pg.cx;
            this.y = Math.sin(Math.PI * 2 * this.a) * (this.d * pg.maxDistance) + pg.cy;

        },

        // correct a and d assuming valid x, and y
        pro.correctAD = function () {

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

        };

        // return the constructor and prototype to Point local variable
        return Point;

    }
        ()),

    // PointCollection constructor and prototype
    PointCollection = (function () {

        var PointCollection = function () {

            // the point collection array
            this.points = [];
            this.maxPoints = 10;

        },

        pro = PointCollection.prototype;

        // push a new point to the collection
        pro.newPoint = function (x, y, a, d, l) {

            if (this.points.length < this.maxPoints) {

                if (this.pointGood(x, y)) {

                    this.points.push(new Point(x, y, a, d, l))

                }

            }

        };

        // find and return the AVG point (use with call on pg)

            var i = 0,
            len = this.points.length,
            x = 0,
            y = 0;
            while (i < len) {

                x += this.points[i].x;
                y += this.points[i].y;

                i += 1;
            }

            return {

                x : x / len,
                y : y / len

            };

        };

        // find AVG distance of a collection from the given point
        pro.AVGDistance = function (x, y) {

            var d = 0,
            i = 0,
            len = this.points.length;
            while (i < len) {

                d += fw.distance(x, y, this.points[i].x, this.points[i].y);

                i += 1;

            }

            this.AVGDistance = d / len;

        };

        pro.AVGAngle = function (x, y) {

            var AVGPoint = this.AVGPoint();

            return Math.atan2(y - AVGPoint.y, x - AVGPoint.x) + Math.PI;

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

        // return the constructor and prototype to Point local variable
        return PointCollection;

    }
        ()),

    // the public API
    api = {

        Point : Point,
        PointCollection : PointCollection

    };

    return api;

}
    ());
