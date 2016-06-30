
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
		likeChance : .3,
		lastChoice : new Date(),
		choiceRate : 5000,
		
		newSugPoint : 'none'

    },

    // ALERT! this is also in playground!
    distance = function (x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    },
	
	// point correction based on is a and d values ( angle and distance expressed as values between 0 and 1 )
	// the method is to be used on like and suggestion points with call
	pointCorrection = function(){
		
		var pg = playground.pg;
		
		this.x = Math.cos(Math.PI * 2 * this.a) * (this.d * pg.maxDistance) + pg.cx;
		this.y = Math.sin(Math.PI * 2 * this.a) * (this.d * pg.maxDistance) + pg.cy;
		
	},

    api = {

        state : state,
		
		findTarget : function(){
			
			var roll = Math.random(), likeIndex;

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
			
			        if(roll <= state.likeChance){
						
						likeIndex = Math.floor(Math.random() * state.likePoints.length);
						
						state.targetX = state.likePoints[likeIndex].x;
						state.targetY = state.likePoints[likeIndex].y;
						
					}
			
                    state.lastChoice = new Date();				
					
				}
				
			}
			
		},
		
		updateSugs : function(){
			
			var likePoint;
			
			// if no points but we have a new like point
			if (playground.pg.points.length === 0 && state.newSugPoint != 'none') {
			
                state.likePoints.shift();
				
				//state.likePoints.push(state.newSugPoint);
				
				likePoint = {
				
				    x : Math.floor(state.newSugPoint.x / state.newSugPoint.count),
					y : Math.floor(state.newSugPoint.y / state.newSugPoint.count)
				
				};
				
				// set the angle
				likePoint.a = Math.atan2(
				    playground.pg.cy - likePoint.y,
					playground.pg.cx - likePoint.x
				);
				
				// angle should be between 0 and 1
				likePoint.a =  (likePoint.a + Math.PI) / (Math.PI * 2);
				
				// set distance
				likePoint.d = distance(likePoint.x, likePoint.y, playground.pg.cx, playground.pg.cy);
				
				// if like point distance is greater then max distance
				if(likePoint.d > playground.pg.maxDistance){
					
					// set distance to max, and adjust position
					likePoint.d = playground.pg.maxDistance;
					
				}
				
				// like point distance should be between 0 and 1
				likePoint.d = likePoint.d / playground.pg.maxDistance;
				
				pointCorrection.call(likePoint);
				
				state.likePoints.push(likePoint);
				
				state.newSugPoint = 'none';
			
			}
			
			// if we have points
			if(playground.pg.points.length > 0){
				
				// if no new like point start one
				if(state.newSugPoint === 'none'){
				
					state.newSugPoint = {
						
						x : playground.pg.AVGPoint.x + 0, // adding zero creates new number not a reference
						y : playground.pg.AVGPoint.y + 0,
						count : 0
						
					};
							
			    // else add to it
				}else{
					
					state.newSugPoint.x += playground.pg.AVGPoint.x;
					state.newSugPoint.y += playground.pg.AVGPoint.y;
					state.newSugPoint.count += 1;
					
				}
				
			}
			
		},

        update : function () {

            var a,
            d;

			this.updateSugs();
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

                //state.likePoints[i].x = Math.cos(Math.PI * 2 * state.likePoints[i].a) * (state.likePoints[i].d * playground.pg.maxDistance) + playground.pg.cx;
                //state.likePoints[i].y = Math.sin(Math.PI * 2 * state.likePoints[i].a) * (state.likePoints[i].d * playground.pg.maxDistance) + playground.pg.cy;
				
				pointCorrection.call(state.likePoints[i]);
				
                i += 1;
            }
        }

    };

    // set up some starting like points
    var i = 0;
    while (i < 4) {

        state.likePoints.push({

            // angle and distance stored in values of 0 to 1 so that the x and y values change based on playground size
            // a : Math.random(),
            // d : 1/4 * (i+1),
			a : 1 / 4 * i,
			d : 0.5,
			
			x:0,y:0

        });

        i += 1;
    }

    return api;

}
    ());