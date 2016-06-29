
var guy = (function () {

    var state = {

        homeX : playground.pg.cx,
        homeY : playground.pg.cy,
        targetX : playground.pg.cx,
        targetY : playground.pg.cy,
        x : 100,
        y : 100,
        dx : 0,
        dy : 0,
        moveRate : 20,

        // points that the guy likes
        likePoints : [],
		likeChance : 0.2,
		lastChoice : new Date(),
		choiceRate : 5000

    },

    // ALERT! this is also in playground!
    distance = function (x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    },

    api = {

        state : state,
		
		findTarget : function(){
			
			// default to home
			//state.targetX = state.homeX;
            //state.targetY = state.homeY;

			// if points follow them
            if (playground.pg.points.length > 0) {

                state.targetX = playground.pg.AVGPoint.x;
                state.targetY = playground.pg.AVGPoint.y;
				
				state.lastChoice = new Date();

			// else autonomy
            }else{
				
				if(new Date() - state.lastChoice >= state.choiceRate){
			
                    // default to home
			        state.targetX = state.homeX;
                    state.targetY = state.homeY;
			
                    state.lastChoice = new Date();				
					
					
					
				}
				
			}
			
		},

        update : function () {

            var a,
            d;

            this.findTarget();

            a = Math.atan2(state.targetY - state.y, state.targetX - state.x),
            d = distance(state.x, state.y, state.targetX, state.targetY);

            //state.dx = Math.cos(angle) * 5;
            //state.dy = Math.sin(angle) * 5;

            state.dx = Math.cos(a) * (d / state.moveRate);
            state.dy = Math.sin(a) * (d / state.moveRate);

            state.x += state.dx;
            state.y += state.dy;

        },

        resize : function () {

            state.homeX = playground.pg.cx;
            state.homeY = playground.pg.cy;
            state.targetX = playground.pg.cx;
            state.targetY = playground.pg.cy;

            // update like points
            var i = 0, len = state.likePoints.length;
            while (i < len) {

                state.likePoints[i].x = Math.cos(Math.PI * 2 * state.likePoints[i].a) * (state.likePoints[i].d * playground.pg.maxDistance) + playground.pg.cx;
                state.likePoints[i].y = Math.sin(Math.PI * 2 * state.likePoints[i].a) * (state.likePoints[i].d * playground.pg.maxDistance) + playground.pg.cy;
				
                i += 1;
            }
        }

    };

    // set up some starting like points
    var i = 0;
    while (i < 4) {

        state.likePoints.push({

            // angle and distance stored in values of 0 to 1 so that the x and y values change based on playground size
            a : Math.random(),
            d : 1/4 * (i+1),
			x:0,y:0

        });

        i += 1;
    }

    return api;

}
    ());