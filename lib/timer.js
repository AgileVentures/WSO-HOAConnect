// Generated by CoffeeScript 1.7.1
(function() {
  var Timer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Timer = (function() {
    function Timer(preset) {
      this.preset = preset != null ? preset : 900000;
      this._updateTimer = __bind(this._updateTimer, this);
      this.startCountdown = __bind(this.startCountdown, this);
      this.stopTimer = __bind(this.stopTimer, this);
      this.startTimer = __bind(this.startTimer, this);
      this.timerId = 0;
      this.time = 0;
      this.countdown = false;
    }

    Timer.prototype.startTimer = function() {
      this.time = new Date(-1000);
      this.countdown = false;
      this._resetTimer();
      return $('.js-timer-start').text('Restart');
    };

    Timer.prototype.stopTimer = function() {
      clearInterval(this.timerId);
      return $('.js-timer-start').text('Start');
    };

    Timer.prototype.startCountdown = function(event, countdown) {
      this.countdown = countdown;
      this.time = new Date(this.preset + 1000);
      this.countdown = true;
      return this._resetTimer();
    };

    Timer.prototype._resetTimer = function() {
      $('.timer__clock').removeClass('timer__clock--error');
      this._updateTimer();
      clearInterval(this.timerId);
      return this.timerId = setInterval(this._updateTimer, 1000);
    };

    Timer.prototype._updateTimer = function() {
      var sign;
      sign = this.countdown ? -1 : 1;
      this.time.setTime(this.time.getTime() + 1000 * sign);
      $('.timer__clock').text(this.time.toTimeString().slice(0, 8));
      if (this.time.getTime() === 0 && this.countdown) {
        $('.timer__clock').addClass('timer__clock--error');
        return this.stopTimer();
      }
    };

    Timer.prototype.init = function() {
      $('.js-timer-start').click(this.startTimer);
      $('.js-timer-stop').click(this.stopTimer);
      return $('.js-timer-countdown').click(this.startCountdown);
    };

    return Timer;

  })();

  this.Timer = Timer;

}).call(this);
