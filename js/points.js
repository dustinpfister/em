var points = (function(){

    // Point Constructor and Prototype returned to Point so I can type var just once,
	// and keep the prototype directly bellow the constrictor
    var Point = (function(){
		
		var Point = function(){
			
			
		},
		
		pro = Point.prototype;
		
		pro.set = function(x,y){
			
			this.x = x;
			this.y = y;
			
		};
		
		// return the constructor and prototype to Point local variable
		return Point;
		
	}()),
	
	// PointCollection constructor and prototype
	Point = (function(){
		
		var Point = function(){
			
			
		},
		
		pro = Point.prototype;
		
		pro.set = function(x,y){
			
			this.x = x;
			this.y = y;
			
		};
		
		// return the constructor and prototype to Point local variable
		return Point;
		
	}()),
	
	api = {
		
		
	};
	
	var p = new Point();

	console.log(p.constructor.name);


    return api;

}());