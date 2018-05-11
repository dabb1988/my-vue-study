(function(window, undefined) {
//	console.log(window, undefined)
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
	
	function image (x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		
	}
	
	image.prototype.move = function (step) {
		
	}
	
	function gameInit(opt) {
		var imgePanel = document.getElementsByClassName("imgePanel")[0]
		
		for(var i = opt.fruitsBeg; i <= opt.fruitsEnd; i++) {
			var image = new Image()
			image.id = "fruit" + i
			image.src = opt.fruitsfolder + i +'.png';
			imgePanel.appendChild(image)
		}
		
		
		
	}
	
	var options = {
		status: 'stop', // stop:停止 running 进行中
		fruitsBeg: 1, // 编号开始位
		fruitsEnd: 9, // 编号结束位
		fruitsfolder: '../images/fruits/', // 水果位置
		arryOne: [], // 水果列表
		arryTwo: [],
		arryThree: [],
	}
	
	gameInit(options)

	var c = document.getElementById("gamePanel");
	var ctx = c.getContext("2d");
	var img = document.getElementById("tulip");
	
	ctx.drawImage(img, 0, 0, 100, 50);
//	ctx.drawImage(img, 100, 0, 100, 50);
//	ctx.drawImage(img, 200, 0, 100, 50);
//	
//	ctx.drawImage(img, 0, 50, 100, 50);
//	ctx.drawImage(img, 100, 50, 100, 50);
//	ctx.drawImage(img, 200, 50, 100, 50);
//	
//	ctx.drawImage(img, 0, 100, 100, 50);
//	ctx.drawImage(img, 100, 100, 100, 50);
//	ctx.drawImage(img, 200, 100, 100, 50);

	var renderLoop = function () {
		console.log(options.status)
	}

	window.requestAnimationFrame(renderLoop);

})(window)