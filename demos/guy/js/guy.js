
var guy = (function () {

    var state = {

        // position and movement
        homeX : playground.cx,
        homeY : playground.cy,
        targetX : playground.cx,
        targetY : playground.cy,
        x : 100,
        y : 100,
        dx : 0,
        dy : 0,
        moveRate : 20,
		
		// isolated, stubborn, likestouch, follower, dependent
		//currentAI : 'follower',
        currentAI : 'dependent',
		
		
        // happy
        happy : 0.1,
        lastHappyUpdate : new Date(),
        happyRate : 33,

        // points that the guy likes
        likePoints : new points.PointCollection(),
        likeChance : .3,
        lastLikeUpdate : new Date(),
        likeRate : 100,

        // suggestion points
        sugPoints : new points.PointCollection(),
        sugChance : .5,
        sugPointLifespan : 60000,
        maxSugPoints : 5,
        newSugPoint : 'none',

        // making choices
        lastChoice : new Date(),
        choiceRate : 5000,

    },
	
	// the public api
    api = {

        state : state,

		/*
        findTarget : function () {

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

        },

		*/
		updateSugs : function () {

            // check new sugs
            this.newSugCheck();

			// kill old sugPoints
			state.sugPoints.killOld();

        },

        newSugCheck : function () {

            var sugPoint;
			

            // if no points but we have a new sug point
            if (gameState.points.points.length === 0 && state.newSugPoint != 'none') {

			    sugPoint = {

                    x : Math.floor(state.newSugPoint.x / state.newSugPoint.count),
                    y : Math.floor(state.newSugPoint.y / state.newSugPoint.count)

                };
				
				state.sugPoints.shiftIfMax();
				state.sugPoints.pushPoint(sugPoint.x, sugPoint.y,0,0, state.sugPointLifespan);
			
			    console.log(state.sugPoints.points);
			
			    state.newSugPoint = 'none';

            }

            // if we have points
            if (gameState.points.points.length > 0) {

                // if no new sug point start one
                if (state.newSugPoint === 'none') {

                    state.newSugPoint = {

                        x : gameState.points.AVGPoint.x + 0, // adding zero creates new number not a reference
                        y : gameState.points.AVGPoint.y + 0,
                        count : 0

                    };

                // else add to it
                } else {

                    state.newSugPoint.x += gameState.points.AVGPoint.x;
                    state.newSugPoint.y += gameState.points.AVGPoint.y;
                    state.newSugPoint.count += 1;

                }

            }

        },
		
        updateHappy : function () {

            var d,
            now = new Date();

            if (now - state.lastHappyUpdate >= state.happyRate) {

                d = Math.floor(fw.distance(state.x, state.y, state.homeX, state.homeY));

                if (d > playground.maxDistance) {
                    d = playground.maxDistance;
                }

                state.happy +=  - 0.001 + 0.004 * d / playground.maxDistance;

                if (state.happy > 1) {

                    state.happy = 1;

                }

                if (state.happy < 0) {

                    state.happy = 0;
                }

                state.lastHappyUpdate = new Date();

            }

        },

        updateLikePoints : function () {

            var now = new Date(),
            index,
            sp,
            lp,
            a;

            if (now - state.lastLikeUpdate >= state.likeRate) {

                // are there sugPoints
                if (state.sugPoints.length > 0) {

                    index = Math.floor(Math.random() * state.sugPoints.length);

                    sp = state.sugPoints[index];

                    lp = state.likePoints[Math.floor(Math.random() * state.likePoints.length)];

                    a = Math.atan2(lp.y - sp.y, lp.x - sp.x) + Math.PI;

                    lp.x += Math.cos(a) * 5;
                    lp.y += Math.sin(a) * 5;

					point.correctAD.call(lp);
                }

                state.lastLikeUpdate = new Date();

            }

        },

        update : function () {

            var a,
            d;

            //this.findTarget();

			guyAI[state.currentAI].update(state);
			//guyAI['stubborn'].update(state);
			//guyAI['likestouch'].update(state);
			//guyAI['follower'].update(state);
			
			
			
            a = Math.atan2(state.targetY - state.y, state.targetX - state.x),
            d = fw.distance(state.x, state.y, state.targetX, state.targetY);

            state.dx = Math.cos(a) * (d / state.moveRate);
            state.dy = Math.sin(a) * (d / state.moveRate);

            state.x += state.dx;
            state.y += state.dy;

            this.updateHappy();
            this.updateLikePoints();
            this.updateSugs();
			
        },

        resize : function () {

            state.homeX = playground.cx;
            state.homeY = playground.cy;
            state.targetX = playground.cx;
            state.targetY = playground.cy;

			state.likePoints.correctXY();
			state.sugPoints.correctXY();

        }

    };
	
	state.likePoints.pushByAD(0,0.5,0);
	state.likePoints.pushByAD(0.25,0.5,0);
	state.likePoints.pushByAD(0.5,0.5,0);
	state.likePoints.pushByAD(0.75,0.5,0);
	
	
    return api;

}
    ());
	