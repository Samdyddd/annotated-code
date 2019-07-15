;(function(){
 
  var Game = function(){
    var canvas = document.getElementById('invaders');

    var screen = canvas.getContext('2d')

    // canvas大小
    var gameSize = {
      x: canvas.width,
      y: canvas.height
    };

    this.bodies = [];
    this.bodies = this.bodies.concat(new Player(this, gameSize));
    
    var self = this;
    var tick = function() {
      
      self.update();
      self.draw(screen, gameSize);

      requestAnimationFrame(tick);
    }
    tick();
  };

  Game.prototype = {
    draw: function(screen, gameSize) {
      // 渲染画布大小
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      // 循环bodies
      for(var i = 0; i<this.bodies.length; i++) {
        // draw每个物体
        drawRect(screen, this.bodies[i])
      }
    },
    update: function() {
      var self = this;
      // console.log('game update')
      // console.log(this.bodies.length)
      // 循环各个主体的update方法
      for(var i = 0;i<this.bodies.length;i++) {
        this.bodies[i].update()
      }
    }
  };

  var Player = function(game, gameSize) {
    this.game = game;
    // player大小15
    this.size = {x: 15, y: 15};
    // player初始位置
    this.center = {
      x: gameSize.x/2,
      y: gameSize.y - this.size.y*2
    };
    // 键盘对象
    this.keyboarder = new Keyboarder()
  };

  Player.prototype = {
    update: function() {
      // todo: 修复超出边界不能移动；
      // console.log('player update')
      if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){
        
        if(this.center.x > 10) {
          this.center.x -= 2;
        }
        console.log(this.center.x, 'left')
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)){
        if(this.center.x< 490) {
          this.center.x +=2;
        }
        console.log(this.center.x, 'right')
      }
    }

  };

  // 绘制方法
  var drawRect = function(screen, body) {
    // body需要渲染的对象
    screen.fillRect(
      body.center.x-body.size.x/2,
      body.center.y-body.size.y/2,
      body.size.x,
      body.size.y
    );
  };


  // 监听键盘

  var Keyboarder = function() {
    var keyState = {};

    // 需要兼容ie写法
    // 鼠标监听
    // 移动端监听拖动
    window.addEventListener('keydown', function(e) {
      keyState[e.keyCode] = true;
    });

    window.addEventListener('keyup', function(e) {
      keyState[e.keyCode] = false;
    });

    this.isDown = function(keyCode){
      return keyState[keyCode] === true;
    };

    this.KEYS = {LEFT: 37,RIGHT: 39,S: 83};


  }


  // 监听加载，立即运行
  window.addEventListener('load', function(){
    new Game();
  });

})();

