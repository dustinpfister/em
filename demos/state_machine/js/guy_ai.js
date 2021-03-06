var guyAI = (function () {

    // choice basic is making some kind of choice, or defaulting to staying home.
    var choiceBasic = function (state, theChoice) {

        if (new Date() - state.lastChoice >= state.choiceRate) {

            // default to home
            state.targetX = state.homeX;
            state.targetY = state.homeY;

            theChoice(Math.random());

            state.lastChoice = new Date();

        }

    },

    touchBasic = function (state, theChoice) {

        // if points follow them
        if (gameState.points.points.length > 0) {

            state.targetX = gameState.points.AVGPoint.x;
            state.targetY = gameState.points.AVGPoint.y;

            // else autonomy
        } else {

            choiceBasic(state, theChoice);

        }

    },

    likeSugBasic = function (state, roll, checkSugs) {

	    var index;
	
	    if(checkSugs === undefined){checkSugs = false;}
	
        // might leave home to do a like
        if (roll <= state.likeChance && state.likePoints.points.length > 0) {

            index = Math.floor(Math.random() * state.likePoints.points.length);

            state.targetX = state.likePoints.points[index].x;
            state.targetY = state.likePoints.points[index].y;

            // else might leave home to do a suggestion
        } else {

            if (state.sugPoints.points.length > 0 && checkSugs) {

                if (roll <= state.sugChance) {

                    index = Math.floor(Math.random() * state.sugPoints.points.length);

                    state.targetX = state.sugPoints.points[index].x;
                    state.targetY = state.sugPoints.points[index].y;

                }

            }

        }

    }

    return {

        /*
         *    isolated AI
         *
         *    * goes home if not there all ready
         *	  * never leaves home.
         *
         */
        isolated : {

            update : function (state) {

                state.targetX = state.homeX;
                state.targetY = state.homeY;

            }

        },

        /*
         *    stubborn AI
         *
         *    * defaults to home
         *	  * goes to like points
         *	  * does not respond to touching, or suggestion points.
         *    * like points never chnage.
         *
         */
        stubborn : {

            update : function (state) {

                choiceBasic(state, function (roll) {

				    likeSugBasic(state, roll, false);

                });

            }

        },

        /*
         *    likestouch AI
         *
         *    * defaults to home
         *	  * goes to like points
         *	  * responds to touching
         *    * suggestion points have no effect
         *    * like points never change
         *
         */
        likestouch : {

            update : function (state) {

                touchBasic(state, function (roll) {

                    likeSugBasic(state, roll, false);

                });

            }

        },

        /*
         *    follower AI
         *
         *    * defaults to home
         *	  * goes to like points
         *	  * responds to touching
         *    * goes to suggestion points
         *    * like points never change
         *
         */
        follower : {

            update : function (state) {

                touchBasic(state, function (roll) {

                    likeSugBasic(state, roll, true);

                });

            }

        },

        /*
         *    dependent AI
         *
         *    * defaults to home
         *	  * goes to like points
         *	  * responds to touching
         *    * goes to suggestion points
         *    * like points change based on suggestion points
         *    * like points never change based on any other factor other than suggestion points.
         *
         */
        dependent : {

            likeChange : function (state) {

                var spi = 0,
                sLen = state.sugPoints.points.length,
                lpi,
                lLen = state.likePoints.points.length,
                near = Infinity,
                d,
                sp,
                lp,
                index = -1;

                // for each sugPoint
                while (spi < sLen) {

                    lpi = 0;
                    near = Infinity;
                    sp = state.sugPoints.points[spi];
                    index = -1;

                    // find the like point that is closest to the sugpoint
                    while (lpi < lLen) {

                        lp = state.likePoints.points[lpi];

                        d = fw.distance(lp.x, lp.y, sp.x, sp.y);

                        if (d < near) {

                            index = lpi;
                            near = d;

                        }

                        lpi += 1;

                    }

                    if (index != -1) {

                        lp = state.likePoints.points[index];

                        lp.x = sp.x;
                        lp.y = sp.y;
						
						lp.correctAD();
						

                    }

                    spi += 1;
                }

            },

            update : function (state) {

                this.likeChange(state);

                touchBasic(state, function (roll) {

                    likeSugBasic(state, roll, true);

                });

            }

        }

    };

}
    ());
