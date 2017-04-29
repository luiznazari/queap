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

}(typeof window !== 'undefined' ? window : this));
