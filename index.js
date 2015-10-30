'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var LocalCache = (function () {
  function LocalCache(store) {
    var key = arguments.length <= 1 || arguments[1] === undefined ? store.displayName : arguments[1];
    return (function () {
      _classCallCheck(this, LocalCache);

      this.debug = (0, _debug2['default'])('localstore:' + key).bind(null, '');
      this.debug('registering localStorage');

      this.store = store;
      this.key = key;

      this.save = this.save.bind(this);

      this.listen();
    }).apply(this, arguments);
  }

  _createClass(LocalCache, [{
    key: 'listen',
    value: function listen() {
      this.debug('attaching listener');
      this.store.listen(this.save);
    }
  }, {
    key: 'unlisten',
    value: function unlisten() {
      this.debug('detaching listener');
      this.store.unlisten(this.save);
    }
  }, {
    key: 'save',
    value: function save(data) {
      var saveState = data || this.store.state || _immutable2['default'].Map();
      var stateStr = JSON.stringify(saveState.toJS());
      this[symbols.debug]('saving store state to localStorage', stateStr);
      localStorage.setItem(this.key, stateStr);
    }
  }, {
    key: 'restore',
    value: function restore() {
      var state = JSON.parse(localStorage.getItem(this.key) || '{}');
      this.store.setState(function (old) {
        return old.merge(_immutable2['default'].fromJS(state));
      });
      this.debug('loading store state from localStorage', state);
      return this.store.state;
    }
  }]);

  return LocalCache;
})();

exports['default'] = LocalCache;
module.exports = exports['default'];
