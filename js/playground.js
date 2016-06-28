var playground = (function(){
	
	var pg = {
		
		xMax : 640,
		yMax : 480,
		cx : 320,
		cy: 240
		
	},
	
	api = {
		
		// add pg to the api
		pg : pg,
		
		// resize the playground, and given canvas to window
		resize : function(canvas){
			
			console.log('okay');
			
			pg.xMax = window.innerWidth;
			pg.yMax = window.innerHeight;
			
			canvas.width = pg.xMax;
			canvas.height = pg.yMax;
			
			pg.cx = pg.xMax / 2;
			pg.cy = pg.yMax / 2;
			
			
		}
		
		
	};
	
	return api;
	
}());