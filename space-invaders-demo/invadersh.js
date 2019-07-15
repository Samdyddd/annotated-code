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
    }
  }

  var Player = function(game, gameSize) {
    this.game = game;
    // player大小15
    this.size = {x: 15, y: 15};
    // player初始位置
    this.center = {
      x: gameSize.x/2,
      y: gameSize.y - this.size.y*2
    };
    // this.keyboarder = new Keyboarder()
  };

  Player.prototype = {

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
  }


  // 监听加载，立即运行
  window.addEventListener('load', function(){
    new Game();
  });

})();

