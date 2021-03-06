'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _axios = require('axios');

var _parseSrt = require('parse-srt');

var _parseSrt2 = _interopRequireDefault(_parseSrt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-set-state : 0 */
/* eslint react/no-danger : 0 */
/* eslint no-new-func : 0 */

var isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
var inBrowser = isBrowser();

var fs = void 0;
if (!inBrowser) {
  fs = require('fs');
}

var TextPlayer = function (_Component) {
  _inherits(TextPlayer, _Component);

  function TextPlayer(props) {
    _classCallCheck(this, TextPlayer);

    var _this = _possibleConstructorReturn(this, (TextPlayer.__proto__ || Object.getPrototypeOf(TextPlayer)).call(this, props));

    _this.componentWillMount = function () {
      if (_this.props.src) {
        _this.updateText(_this.props.src);
      }
    };

    _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.src) {
        _this.updateText(nextProps.src);
      }
    };

    _this.getText = function (src) {
      return new Promise(function (resolve, reject) {
        var protocol = src.split(':')[0];
        if (protocol.indexOf('http') === 0) {
          (0, _axios.get)(src).then(function (resp) {
            resolve(resp.data);
          }).catch(reject);
        } else if (protocol.indexOf('file') === 0 && fs) {
          var path = src.split('file://')[1];
          fs.readFile(path, 'utf8', function (err, str) {
            if (err) {
              return reject(err);
            } else return resolve(str);
          });
        } else reject();
      });
    };

    _this.updateText = function (src) {
      _this.getText(src).then(function (str) {
        var type = _mime2.default.lookup(src.split('.').pop());
        var contents = void 0;
        switch (type) {
          case 'application/x-subrip':
          case 'text/srt':
            if (_parseSrt2.default) {
              contents = (0, _parseSrt2.default)(str);
              // turn to array
              contents = Object.keys(contents).map(function (id) {
                return contents[id];
              });
            } else {
              contents = str.split('\n').filter(function (s) {
                return s.trim().length;
              }).map(function (text) {
                return { text: text };
              });
            }
            break;

          default:
            contents = str.split('\n').filter(function (s) {
              return s.trim().length;
            }).map(function (text) {
              return { text: text };
            });
            break;
        }
        _this.setState({
          contents: contents
        });
      }).catch(function () {
        // what to do there ?
        _this.setState({
          content: { text: 'Not available' }
        });
      });
    };

    _this.state = {
      contents: []
    };
    return _this;
  }

  _createClass(TextPlayer, [{
    key: 'render',
    value: function render() {
      var _state$contents = this.state.contents,
          contents = _state$contents === undefined ? [] : _state$contents;


      return _react2.default.createElement(
        'blockquote',
        { className: 'transcription-container' },
        contents.map(function (paragraph, index) {
          return _react2.default.createElement('p', { key: index, dangerouslySetInnerHTML: { __html: paragraph.text } });
        })
      );
    }
  }]);

  return TextPlayer;
}(_react.Component);

exports.default = TextPlayer;