// Generated by CoffeeScript 1.7.1
(function() {
  var Canvas, Color, EventQueue, Graphics, Image, ImageData, Keyboard, Quad, Timer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Color = (function() {
    function Color(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a != null ? a : 255;
      this.html_code = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }

    return Color;

  })();

  Canvas = (function() {
    function Canvas(width, height) {
      this.width = width;
      this.height = height;
      this.element = document.createElement('canvas');
      this.element.setAttribute('width', this.width);
      this.element.setAttribute('height', this.height);
      this.context = this.element.getContext('2d');
    }

    Canvas.prototype.clear = function(self, r, g, b, a) {
      var color;
      if (r === null || r === void 0) {
        color = Canvas.transparent;
      } else {
        color = new Color(r, g, b, a);
      }
      self.context.save();
      self.context.setTransform(1, 0, 0, 1, 0, 0);
      self.context.fillStyle = color.html_code;
      self.context.globalAlpha = color.a / 255;
      self.context.fillRect(0, 0, self.canvas.width, self.canvas.height);
      return self.context.restore();
    };

    Canvas.prototype.getDimensions = function(self) {
      return [self.width, self.height];
    };

    Canvas.prototype.getHeight = function(self) {
      return self.height;
    };

    Canvas.prototype.getImageData = function(self) {
      var image_data;
      image_data = self.context.getImageData(0, 0, self.width, self.height);
      return new ImageData(image_data);
    };

    Canvas.prototype.getPixel = function(self, x, y) {
      var data;
      data = self.context.getImageData(x, y, 1, 1).data;
      return [data[0], data[1], data[2], data[3]];
    };

    Canvas.prototype.getWidth = function(self) {
      return self.width;
    };

    Canvas.prototype.getWrap = function(self) {};

    Canvas.prototype.setWrap = function(self) {};

    Canvas.prototype.copyContext = function(context) {
      this.context.fillStyle = context.fillStyle;
      this.context.font = context.font;
      this.context.globalAlpha = context.globalAlpha;
      this.context.globalCompositeOperation = context.globalCompositeOperation;
      this.context.lineCap = context.lineCap;
      this.context.lineDashOffset = context.lineDashOffset;
      this.context.lineJoin = context.lineJoin;
      this.context.lineWidth = context.lineWidth;
      this.context.miterLimit = context.miterLimit;
      this.context.shadowBlur = context.shadowBlur;
      this.context.shadowColor = context.shadowColor;
      this.context.shadowOffsetX = context.shadowOffsetX;
      this.context.shadowOffsetY = context.shadowOffsetY;
      this.context.strokeStyle = context.strokeStyle;
      this.context.textAlign = context.textAlign;
      return this.context.textBaseline = context.textBaseline;
    };

    return Canvas;

  })();

  Canvas.transparent = new Color(0, 0, 0, 0);

  Image = (function() {
    function Image(path) {
      this.element = document.createElement("img");
      this.element.setAttribute("src", "lua/" + path);
    }

    Image.prototype.getData = function(self) {};

    Image.prototype.getDimensions = function(self) {
      return [self.element.width, self.element.height];
    };

    Image.prototype.getFilter = function(self) {};

    Image.prototype.getHeight = function(self) {
      return self.element.height;
    };

    Image.prototype.getMipmapFilter = function(self) {};

    Image.prototype.getWidth = function(self) {
      return self.element.width;
    };

    Image.prototype.getWrap = function(self) {};

    Image.prototype.isCompressed = function(self) {};

    Image.prototype.refresh = function(self) {};

    Image.prototype.setFilter = function(self) {};

    Image.prototype.setMipmapFilter = function(self) {};

    Image.prototype.setWrap = function(self) {};

    return Image;

  })();

  ImageData = (function() {
    function ImageData() {}

    return ImageData;

  })();

  Quad = (function() {
    function Quad(x, y, width, height, sw, sh) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sw = sw;
      this.sh = sh;
    }

    Quad.prototype.getViewport = function(self) {
      return [self.x, self.y, self.width, self.height];
    };

    Quad.prototype.setViewport = function(self, x, y, width, height) {
      self.x = x;
      self.y = y;
      self.width = width;
      return self.height = height;
    };

    return Quad;

  })();

  Graphics = (function() {
    var drawDrawable, drawWithQuad;

    function Graphics(width, height) {
      this.width = width != null ? width : 800;
      this.height = height != null ? height : 600;
      this.getWidth = __bind(this.getWidth, this);
      this.getWidth = __bind(this.getWidth, this);
      this.setCanvas = __bind(this.setCanvas, this);
      this.setBackgroundColor = __bind(this.setBackgroundColor, this);
      this.setColor = __bind(this.setColor, this);
      this.newQuad = __bind(this.newQuad, this);
      this.newImage = __bind(this.newImage, this);
      this.newCanvas = __bind(this.newCanvas, this);
      this.rectangle = __bind(this.rectangle, this);
      this.printf = __bind(this.printf, this);
      this.print = __bind(this.print, this);
      this.polygon = __bind(this.polygon, this);
      this.point = __bind(this.point, this);
      this.line = __bind(this.line, this);
      this.draw = __bind(this.draw, this);
      this.clear = __bind(this.clear, this);
      this.circle = __bind(this.circle, this);
      this.arc = __bind(this.arc, this);
      this.canvas = new Canvas(this.width, this.height);
      document.body.appendChild(this.canvas.element);
      this.context = this.canvas.context;
      this.default_canvas = this.canvas;
      this.default_context = this.context;
      this.setColor(255, 255, 255);
      this.setBackgroundColor(0, 0, 0);
    }

    Graphics.prototype.arc = function(mode, x, y, radius, startAngle, endAngle, segments) {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.arc(x, y, radius, startAngle, endAngle);
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Graphics.prototype.circle = function(mode, x, y, radius, segments) {
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Graphics.prototype.clear = function() {
      this.context.save();
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.fillStyle = this.background_color.html_code;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      return this.context.restore();
    };

    Graphics.prototype.draw = function(drawable, quad) {
      switch (true) {
        case !(quad instanceof Quad):
          return drawDrawable.apply(this, arguments);
        case quad instanceof Quad:
          return drawWithQuad.apply(this, arguments);
      }
    };

    Graphics.prototype.line = function() {
      var i, points, x, y, _i, _ref, _ref1;
      points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.context.beginPath();
      this.context.moveTo(points[0], points[1]);
      for (i = _i = 2, _ref = points.length; _i < _ref; i = _i += 2) {
        _ref1 = [points[i], points[i + 1]], x = _ref1[0], y = _ref1[1];
        this.context.lineTo(x, y);
      }
      return this.context.stroke();
    };

    Graphics.prototype.point = function(x, y) {
      return this.context.fillRect(x, y, 1, 1);
    };

    Graphics.prototype.polygon = function() {
      var i, mode, points, x, y, _i, _ref, _ref1;
      mode = arguments[0], points = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.context.beginPath();
      this.context.moveTo(points[0], points[1]);
      for (i = _i = 2, _ref = points.length; _i < _ref; i = _i += 2) {
        _ref1 = [points[i], points[i + 1]], x = _ref1[0], y = _ref1[1];
        this.context.lineTo(x, y);
      }
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Graphics.prototype.print = function(str, x, y) {
      return this.context.fillText(str, x, y);
    };

    Graphics.prototype.printf = function() {};

    Graphics.prototype.rectangle = function(mode, x, y, width, height) {
      switch (mode) {
        case "fill":
          return this.context.fillRect(x, y, width, height);
        case "line":
          return this.context.strokeRect(x, y, width, height);
      }
    };

    Graphics.prototype.newCanvas = function(width, height) {
      return new Canvas(width, height);
    };

    Graphics.prototype.newImage = function(path) {
      return new Image(path);
    };

    Graphics.prototype.newQuad = function(x, y, width, height, sw, sh) {
      return new Quad(x, y, width, height, sw, sh);
    };

    Graphics.prototype.setColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      this.current_color = new Color(r, g, b, a);
      this.context.fillStyle = this.current_color.html_code;
      this.context.strokeStyle = this.current_color.html_code;
      return this.context.globalAlpha = this.current_color.a / 255;
    };

    Graphics.prototype.setBackgroundColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      return this.background_color = new Color(r, g, b, a);
    };

    Graphics.prototype.setCanvas = function(canvas) {
      if (canvas === void 0 || canvas === null) {
        this.default_canvas.copyContext(this.canvas.context);
        this.canvas = this.default_canvas;
        return this.context = this.default_context;
      } else {
        canvas.copyContext(this.canvas.context);
        this.canvas = canvas;
        return this.context = canvas.context;
      }
    };

    Graphics.prototype.getWidth = function() {
      return this.default_canvas.width;
    };

    Graphics.prototype.getWidth = function() {
      return this.default_canvas.height;
    };

    drawDrawable = function(drawable, x, y, r, sx, sy, ox, oy, kx, ky) {
      var halfHeight, halfWidth;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (r == null) {
        r = 0;
      }
      if (sx == null) {
        sx = 1;
      }
      if (sy == null) {
        sy = sx;
      }
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      if (kx == null) {
        kx = 0;
      }
      if (ky == null) {
        ky = 0;
      }
      halfWidth = drawable.element.width / 2;
      halfHeight = drawable.element.height / 2;
      this.context.save();
      this.context.translate(x + halfWidth - ox, y + halfHeight - oy);
      this.context.rotate(r);
      this.context.scale(sx, sy);
      this.context.transform(1, ky, kx, 1, 0, 0);
      this.context.drawImage(drawable.element, -halfWidth, -halfHeight);
      return this.context.restore();
    };

    drawWithQuad = function(drawable, quad, x, y, r, sx, sy, ox, oy, kx, ky) {
      var halfHeight, halfWidth;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (r == null) {
        r = 0;
      }
      if (sx == null) {
        sx = 1;
      }
      if (sy == null) {
        sy = sx;
      }
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      if (kx == null) {
        kx = 0;
      }
      if (ky == null) {
        ky = 0;
      }
      halfWidth = drawable.element.width / 2;
      halfHeight = drawable.element.height / 2;
      this.context.save();
      this.context.translate(x + halfWidth - ox, y + halfHeight - oy);
      this.context.rotate(r);
      this.context.scale(sx, sy);
      this.context.transform(1, ky, kx, 1, 0, 0);
      this.context.drawImage(drawable.element, quad.x, quad.y, quad.width, quad.height, -halfWidth, -halfHeight, quad.width, quad.height);
      return this.context.restore();
    };

    return Graphics;

  })();

  this.Love = (function() {
    function Love(window_conf) {
      this.run = __bind(this.run, this);
      this.graphics = new Graphics(window_conf.width, window_conf.height);
      this.timer = new Timer();
      this.event = new EventQueue();
      this.keyboard = new Keyboard(this.event);
    }

    Love.prototype.run = function() {
      var game_loop;
      this.timer.step();
      this.load.call();
      game_loop = (function(_this) {
        return function() {
          var e, _i, _len, _ref;
          _ref = _this.event.internalQueue;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            _this[e.eventType].call(null, e.arg1, e.arg2, e.arg3, e.arg4);
          }
          _this.event.clear();
          _this.timer.step();
          _this.update.call(null, _this.timer.getDelta());
          _this.graphics.clear();
          _this.draw.call();
          return _this.timer.nextFrame(game_loop);
        };
      })(this);
      return this.timer.nextFrame(game_loop);
    };

    Love.prototype.load = function(args) {};

    Love.prototype.update = function(dt) {};

    Love.prototype.mousepressed = function(x, y, button) {};

    Love.prototype.mousereleased = function(x, y, button) {};

    Love.prototype.keypressed = function(key, unicode) {};

    Love.prototype.keyreleased = function(key, unicode) {};

    Love.prototype.joystickpressed = function(joystick, button) {};

    Love.prototype.joystickreleased = function(joystick, button) {};

    Love.prototype.textinput = function(text) {};

    Love.prototype.draw = function() {};

    Love.prototype.focus = function(has_focus) {};

    Love.prototype.quit = function() {};

    return Love;

  })();

  Timer = (function() {
    var lastTime, performance, requestAnimationFrame;

    function Timer() {
      this.step = __bind(this.step, this);
      this.sleep = __bind(this.sleep, this);
      this.getTime = __bind(this.getTime, this);
      this.getFPS = __bind(this.getFPS, this);
      this.getDelta = __bind(this.getDelta, this);
      this.nextFrame = __bind(this.nextFrame, this);
      this.microTime = performance.now();
      this.deltaTime = 0;
      this.deltaTimeLimit = 0.25;
      this.events = {};
      this.maxEventId = 0;
    }

    Timer.prototype.nextFrame = function(callback) {
      return requestAnimationFrame(callback);
    };

    Timer.prototype.getDelta = function() {
      return this.deltaTime;
    };

    Timer.prototype.getFPS = function() {
      if (this.deltaTime === 0) {
        return 0;
      } else {
        return 1 / this.deltaTime;
      }
    };

    Timer.prototype.getTime = function() {
      return this.microTime;
    };

    Timer.prototype.sleep = function() {};

    Timer.prototype.step = function() {
      var dt;
      dt = (performance.now() - this.microTime) / 1000;
      this.deltaTime = Math.max(0, Math.min(this.deltaTimeLimit, dt));
      return this.microTime += dt * 1000;
    };

    performance = window.performance || Date;

    performance.now = performance.now || performance.msNow || performance.mozNow || performance.webkitNow || Date.now;

    lastTime = 0;

    requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
      var currTime, delay, timeToCall;
      currTime = performance.now();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      delay = function() {
        return callback(currTime + timeToCall);
      };
      lastTime = currTime + timeToCall;
      return setTimeout(delay, timeToCall);
    };

    return Timer;

  })();

  EventQueue = (function() {
    var Event;

    function EventQueue() {
      this.wait = __bind(this.wait, this);
      this.quit = __bind(this.quit, this);
      this.push = __bind(this.push, this);
      this.pump = __bind(this.pump, this);
      this.poll = __bind(this.poll, this);
      this.clear = __bind(this.clear, this);
      this.internalQueue = [];
    }

    EventQueue.prototype.clear = function() {
      return this.internalQueue = [];
    };

    EventQueue.prototype.poll = function() {};

    EventQueue.prototype.pump = function() {};

    EventQueue.prototype.push = function() {
      var args, eventType, newEvent;
      eventType = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      newEvent = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Event, [eventType].concat(__slice.call(args)), function(){});
      return this.internalQueue.push(newEvent);
    };

    EventQueue.prototype.quit = function() {};

    EventQueue.prototype.wait = function() {};

    Event = (function() {
      function Event(eventType, arg1, arg2, arg3, arg4) {
        this.eventType = eventType;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        this.arg4 = arg4;
      }

      return Event;

    })();

    return EventQueue;

  })();

  Keyboard = (function() {
    var getKeyFromEvent, keys, rightKeys, shiftedKeys;

    function Keyboard(eventQueue) {
      this.isDown = __bind(this.isDown, this);
      this.keysDown = {};
      document.addEventListener("keydown", (function(_this) {
        return function(evt) {
          var key;
          evt.preventDefault();
          evt.stopPropagation();
          key = getKeyFromEvent(evt);
          _this.keysDown[key] = true;
          return eventQueue.push("keypressed", key, evt.which);
        };
      })(this));
      document.addEventListener("keyup", (function(_this) {
        return function(evt) {
          var key;
          evt.preventDefault();
          evt.stopPropagation();
          key = getKeyFromEvent(evt);
          _this.keysDown[key] = false;
          return eventQueue.push("keyreleased", key, evt.which);
        };
      })(this));
    }

    Keyboard.prototype.isDown = function() {
      var key, others;
      key = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.keysDown[key]) {
        return true;
      } else {
        if (others.length === 0) {
          return false;
        } else {
          return this.isDown.apply(this, others);
        }
      }
    };

    keys = {
      8: "backspace",
      9: "tab",
      13: "enter",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "escape",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      45: "insert",
      46: "delete",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      91: "lmeta",
      92: "rmeta",
      93: "mode",
      96: "kp0",
      97: "kp1",
      98: "kp2",
      99: "kp3",
      100: "kp4",
      101: "kp5",
      102: "kp6",
      103: "kp7",
      104: "kp8",
      105: "kp9",
      106: "kp*",
      107: "kp+",
      109: "kp-",
      110: "kp.",
      111: "kp/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scrolllock",
      186: ",",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    };

    shiftedKeys = {
      192: "~",
      48: ")",
      49: "!",
      50: "@",
      51: "#",
      52: "$",
      53: "%",
      54: "^",
      55: "&",
      56: "*",
      57: "(",
      109: "_",
      61: "+",
      219: "{",
      221: "}",
      220: "|",
      59: ":",
      222: "\"",
      188: "<",
      189: ">",
      191: "?",
      96: "insert",
      97: "end",
      98: "down",
      99: "pagedown",
      100: "left",
      102: "right",
      103: "home",
      104: "up",
      105: "pageup"
    };

    rightKeys = {
      16: "rshift",
      17: "rctrl",
      18: "ralt"
    };

    getKeyFromEvent = function(event) {
      var code, key;
      code = event.which;
      if (event.location && event.location > 1) {
        key = rightKeys[code];
      } else if (event.shiftKey) {
        key = shiftedKeys[code] || keys[code];
      } else {
        key = keys[code];
      }
      if (typeof key === "undefined") {
        key = String.fromCharCode(code);
        if (event.shiftKey) {
          key = key.toUpperCase();
        }
      }
      return key;
    };

    return Keyboard;

  })();

}).call(this);

//# sourceMappingURL=love.map
