;(function (window) {

	'use strict';
	
	window.log = {

		_concat: String.prototype.concat,
		_log: console.log,
		_warn: console.warn,
		_error: console.error,

		info: function(msg) {
			msg = this._msg(msg, '[INFO ]');
			this._log(msg);
		},

		warn: function(msg) {
			msg = this._msg(msg, '[WARN ]');
			this._warn(msg);
		},

		error: function(msg) {
			msg = this._msg(msg, '[ERROR]');
			this._error(msg);
		},

		_msg: function(msg, prefix) {
			return this._concat.call(prefix, ' ', this._dateTime(), ' - ', msg);
		},

		_dateTime: function() {
			var date = new Date();
			return this._concat.call(date.getFullYear(), '-', this._normalize(date.getMonth()), '-',
									this._normalize(date.getDate()), ' ', this._normalize(date.getHours()), ':',
									this._normalize(date.getMinutes()), ':', this._normalize(date.getSeconds()));
		},

		_normalize: function(num) {
			return (num < 10 ? '0' : '') + num;
		}
	}

	window.parseBoolean = function(b) {
		return b === true || b === 'true' || new Number(b) === 1;
	}

	Event.prototype.stop = function() {
		this.preventDefault();
		this.stopPropagation();
	}

	Array.prototype.groupBy = function(groupingFunction) {
		var map = new Map();
		this.forEach(function(value) {
			var key = groupingFunction(value);
			if (map.has(key)) {
				map.get(key).push(value);
			} else {
				map.set(key, [ value ]);
			}
		});
		return map;
	}

	Map.prototype.reduce = function(reducingFunction, initialValue) {
		var actual = initialValue;
		this.forEach(function(values, key) {
			asArray(values).forEach(function(value) {
				actual = reducingFunction(actual || value, value)
			});
		});
		return actual;
	}

	Map.prototype.reduceValues = function(reducingFunction, initialValue) {
		var reduced = [];
		this.forEach(function(values, key) {
			values = asArray(values);
			var actual = initialValue || values[0];
			values.forEach(function(value) {
				actual = reducingFunction(actual, value)
			});
			reduced.push(actual);
		});
		return reduced;
	}

	Map.prototype.toArray = function() {
		var array = [];
		this.forEach(function(values, key) {
			array = array.concat(values)
		});
		return array;
	}

	function asArray(value) {
		return Array.isArray(value) ? value : [ value ];
	}

	// RIPPLE EFFECT
	function applyRippleEffect(event) {
		event = event.originalEvent || event;
		var $self = $(this);

		// Remove previous ripple elements, if any.
		$self.children('.ripple').detach();

		var offset = this.getBoundingClientRect();
		var buttonWidth = this.clientWidth;
		var buttonHeight = this.clientHeight;

		// Make it round!
		if (buttonWidth >= buttonHeight) {
			buttonHeight = buttonWidth;
		} else {
			buttonWidth = buttonHeight; 
		}
		
		var pageX;
		var pageY;
		// Get event's x and y. Ripple event will start at this point.
		if (event.touches && event.touches.length > 0) {
			pageX = event.touches[0].pageX;
			pageY = event.touches[0].pageY;
		} else {
			pageX = event.pageX;
			pageY = event.pageY;
		}
		
		var rippleColor = $self.data('ripple');
		if (!rippleColor || rippleColor === 'dark') {
			rippleColor = 'rgba(0, 0, 0, .1)';
		} else if (rippleColor === 'light') {
			rippleColor = 'rgba(255, 255, 255, .4)';
		}

		// Create and prepernd ripple element.
		var $span = $('<span>').addClass('ripple').css({
			'top': pageY - offset.top - buttonHeight / 2,
			'left': pageX - offset.left - buttonWidth / 2,
			'width': buttonWidth,
			'height': buttonHeight,
			'background-color': rippleColor
		});
		$self.prepend($span);

		// Start ripple effect from element.
		$span.addClass('ripple-effect');
	};

	$(window).ready(function() {
		var $body = $('body');
		$body.on('touchstart', '[data-ripple]', function (event) {
			$body.off('mousedown', '[data-ripple]');
			applyRippleEffect.call(this, event);
		}).on('mousedown', '[data-ripple]', applyRippleEffect);
	});

}(typeof window !== 'undefined' ? window : this));
