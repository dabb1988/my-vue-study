(function (window, undefined) {
  //	console.log(window, undefined)
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  function renderImage(img, x, y, width, height) {
    this.img = img
    this.x = x
    this.y = y
    this.width = width
    this.height = height

  }

  renderImage.prototype.move = function (step) {

  }
 
  function gameInit(opt) {
    var imgePanel = document.getElementsByClassName("imgePanel")[0]
    // 图片渲染出来
    var arr_flag = []
    for (var i = opt.fruitsBeg; i <= opt.fruitsEnd; i++) {
      var image = new Image()
      image.id = "fruit" + i
      image.src = opt.fruitsfolder + i + '.png';
      imgePanel.appendChild(image)
      arr_flag.push(i)
      opt.images_arry_cache.push(image)
    }
    // 初始化3个随机列表
    arr_flag.sort(function () {
      return 0.5 - Math.random()
    })
    var array_1 = arr_flag.slice(0)
    array_1.sort(function () {
      return 0.5 - Math.random()
    })
    var array_2 = array_1.slice(0)
    array_2.sort(function () {
      return 0.5 - Math.random()
    })
    var array_3 = array_2.slice(0)
    array_3.sort(function () {
      return 0.5 - Math.random()
    })
    opt.array_1 = array_1
    opt.array_2 = array_2
    opt.array_3 = array_3
    // 速度 必须是双数，否则
    opt.speed_1 = 1
    opt.speed_2 = 5
    opt.speed_3 = 18
  }

  function renderImagesArry ( width, _height, _speed, imagesArry, _ctx) {
    var slowFlag = true
    // debugger
    _height -= _speed
    // 判断第一个高度小于-图片高度，就自动回到尾部，修改数组
    var exceedFlag = false
    for (var i = 0; i < imagesArry.length; i++) {
      // var img = document.getElementById('fruit' + imagesArry[i])
      // _ctx.drawImage(img, width, 50 * i + _height, 100, 50);
      _ctx.drawImage(opt.images_arry_cache[parseInt(imagesArry[i])-1], width, opt.fruitsH * i + _height, opt.fruitsW, opt.fruitsH);
      if (i==0) {
        if (_height <= -opt.fruitsH){
          // 高度清零，第一个挪到数组末尾
          exceedFlag = true
        }
      }
    }
    // 循环完成之后，把数组第一个挪到最后
    if (exceedFlag){
      _height = 0
      var obj = imagesArry.splice(0,1)
      imagesArry.push(obj)
    }

    if (imagesArry[2] == opt.winFlag){
      // 速度不能减
      slowFlag = false
    }
    return _height
  }

  var options = {
    status: 'stop', // stop:停止 running 进行中
    images_arry_cache: [],
    fruitsBeg: 1, // 编号开始位
    fruitsEnd: 4, // 编号结束位
    fruitsfolder: '../images/fruits/', // 水果位置
    fruitsH: 200,
    fruitsW: 200,
    array_1: [], // 水果列表
    array_2: [],
    array_3: [],
    speed_1: 0,
    speed_2: 0,
    speed_3: 0,
    canvasH: 150,
    canvasW: 300,
    columnParam: {
      arry_index: []
    }
  }

  var height_1 = 0,
    height_2 = 0,
    height_3 = 0

  var c = document.getElementById("gamePanel");
  var ctx = c.getContext("2d");
  var animate = function () {
    ctx.clearRect(0, 0, c.width, c.height);
    
    height_1 = renderImagesArry(0, height_1, opt.speed_1, opt.array_1, ctx)
    
    height_2 = renderImagesArry(options.fruitsH, height_2, opt.speed_2, opt.array_2, ctx)
    height_3 = renderImagesArry(options.fruitsH*2, height_3, opt.speed_3, opt.array_3, ctx)

    // 第三个是肯定中奖的

    dateTimeEnd = Date.now()
    if (opt.speed_1>0 && dateTimeEnd - dateTimeBeg > 100 && height_1 == 0) {
      opt.speed_1 -= 2
      dateTimeBeg = dateTimeEnd
    }
    if (opt.speed_2>0 && dateTimeEnd - dateTimeBeg > 100 && height_2 == 0) {
      dateTimeBeg = dateTimeEnd
      opt.speed_2 -= 2
    }
    if (opt.speed_3>0 && dateTimeEnd - dateTimeBeg > 100 && height_3 == 0) {
      opt.speed_3 -= 2
      dateTimeBeg = dateTimeEnd
    }

    if (opt.speed_1 ==0 && opt.speed_2 == 0 && opt.speed_3 == 0) {
      return
    }
    window.requestAnimFrame(animate)
  }
  // 准备好数据
  gameInit(options)
  // 开始执行动画
  opt = options

  var dateTimeBeg,dateTimeEnd
  document.querySelectorAll(".btn-start")[0].addEventListener('click', function(){
    opt.speed_1 = 50
    opt.speed_2 = 30
    opt.speed_3 = 40
    opt.winFlag = 2
    dateTimeBeg = Date.now()
    animate(opt)
  }, false)

})(window)