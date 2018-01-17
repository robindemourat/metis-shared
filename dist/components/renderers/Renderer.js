'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entities;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redraft = require('redraft');

var _redraft2 = _interopRequireDefault(_redraft);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _constants = require('../../constants');

var _constants2 = _interopRequireDefault(_constants);

var _BlockAssetWrapper = require('./BlockAssetWrapper');

var _BlockAssetWrapper2 = _interopRequireDefault(_BlockAssetWrapper);

var _InlineAssetWrapper = require('./InlineAssetWrapper');

var _InlineAssetWrapper2 = _interopRequireDefault(_InlineAssetWrapper);

var _NoteContentPointerContainer = require('./NoteContentPointerContainer');

var _NoteContentPointerContainer2 = _interopRequireDefault(_NoteContentPointerContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _constants$draftEntit = _constants2.default.draftEntitiesNames,
    LINK = _constants$draftEntit.LINK,
    BLOCK_ASSET = _constants$draftEntit.BLOCK_ASSET,
    INLINE_ASSET = _constants$draftEntit.INLINE_ASSET,
    NOTE_POINTER = _constants$draftEntit.NOTE_POINTER;

// just a helper to add a <br /> after each block

var addBreaklines = function addBreaklines(children) {
  return children.map(function (child, index) {
    return [child, _react2.default.createElement('br', { key: index })];
  });
};

/**
 * Define the renderers
 */
var renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: function BOLD(children, _ref) {
      var key = _ref.key;
      return _react2.default.createElement(
        'strong',
        { key: key },
        children
      );
    },
    ITALIC: function ITALIC(children, _ref2) {
      var key = _ref2.key;
      return _react2.default.createElement(
        'em',
        { key: key },
        children
      );
    },
    UNDERLINE: function UNDERLINE(children, _ref3) {
      var key = _ref3.key;
      return _react2.default.createElement(
        'u',
        { key: key },
        children
      );
    },
    CODE: function CODE(children, _ref4) {
      var key = _ref4.key;
      return _react2.default.createElement(
        'span',
        { key: key },
        children
      );
    }
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'unstyled': function unstyled(children, _ref5) {
      var keys = _ref5.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'p',
          { id: keys[index], key: index },
          child
        );
      });
    },
    'blockquote': function blockquote(children, _ref6) {
      var keys = _ref6.keys;
      return _react2.default.createElement(
        'blockquote',
        { id: keys[0] },
        addBreaklines(children)
      );
    },
    'header-one': function headerOne(children, _ref7) {
      var keys = _ref7.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h1',
          { id: keys[index], key: index },
          child
        );
      });
    },
    'header-two': function headerTwo(children, _ref8) {
      var keys = _ref8.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h2',
          { id: keys[index], key: index },
          child
        );
      });
    },
    'header-three': function headerThree(children, _ref9) {
      var keys = _ref9.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h3',
          { id: keys[index], key: index },
          child
        );
      });
    },
    'header-four': function headerFour(children, _ref10) {
      var keys = _ref10.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h4',
          { id: keys[index], key: index },
          child
        );
      });
    },
    'header-five': function headerFive(children, _ref11) {
      var keys = _ref11.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h5',
          { id: keys[index], key: index },
          child
        );
      });
    },
    'header-six': function headerSix(children, _ref12) {
      var keys = _ref12.keys;
      return children.map(function (child, index) {
        return _react2.default.createElement(
          'h6',
          { id: keys[index], key: index },
          child
        );
      });
    },

    // You can also access the original keys of the blocks
    'code-block': function codeBlock(children, _ref13) {
      var keys = _ref13.keys;
      return _react2.default.createElement(
        'pre',
        { key: keys[0] },
        addBreaklines(children)
      );
    },
    // or depth for nested lists
    'unordered-list-item': function unorderedListItem(children, _ref14) {
      var depth = _ref14.depth,
          keys = _ref14.keys;
      return _react2.default.createElement(
        'ul',
        { key: keys[keys.length - 1], className: 'ul-level-' + depth },
        children.map(function (child, index) {
          return _react2.default.createElement(
            'li',
            { key: index },
            child
          );
        })
      );
    },
    'ordered-list-item': function orderedListItem(children, _ref15) {
      var depth = _ref15.depth,
          keys = _ref15.keys;
      return _react2.default.createElement(
        'ol',
        { key: keys.join('|'), className: 'ol-level-' + depth },
        children.map(function (child, index) {
          return _react2.default.createElement(
            'li',
            { key: keys[index] },
            child
          );
        })
      );
    }
    // If your blocks use meta data it can also be accessed like keys
    // atomic: (children, { keys, data }) => children.map((child, i) => <Atomic key={keys[i]} {...data[i]}>{child}</Atomic>),
  },
  /**
   * Entities receive children and the entity data
   */
  entities: (_entities = {}, _defineProperty(_entities, LINK, function (children, data, _ref16) {
    var key = _ref16.key;
    return _react2.default.createElement(
      _Link2.default,
      { key: key, to: data.url },
      children
    );
  }), _defineProperty(_entities, BLOCK_ASSET, function (children, data, _ref17) {
    var key = _ref17.key;

    return _react2.default.createElement(_BlockAssetWrapper2.default, { key: key, data: data });
  }), _defineProperty(_entities, INLINE_ASSET, function (children, data, _ref18) {
    var key = _ref18.key;

    return _react2.default.createElement(_InlineAssetWrapper2.default, { data: data, key: key });
  }), _defineProperty(_entities, NOTE_POINTER, function (children, data, _ref19) {
    var key = _ref19.key;

    return _react2.default.createElement(_NoteContentPointerContainer2.default, { key: key, children: children, noteId: data.noteId });
  }), _entities)
};

/**
 * Renderer class for building raw-to-react rendering react component instances
 */

var Renderer = function (_Component) {
  _inherits(Renderer, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function Renderer(props) {
    _classCallCheck(this, Renderer);

    var _this = _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, props));

    _this.getChildContext = function () {
      return {
        contextualizations: _this.props.contextualizations,
        contextualizers: _this.props.contextualizers,
        resources: _this.props.resources,
        assetsData: _this.props.assets,
        notes: _this.props.notes,
        NoteContentPointer: _this.props.NoteContentPointer,
        Link: _this.props.Link
      };
    };

    return _this;
  }

  _createClass(Renderer, [{
    key: 'shouldComponentUpdate',


    /**
     * Determines whether to update the component or not
     * @param {object} nextProps - the future properties of the component
     * @return {boolean} shouldUpdate - yes or no
     */
    value: function shouldComponentUpdate() {
      return true;
      // return this.props.raw !== nextProps.raw;
    }

    /**
     * Displays something when no suitable content state is provided to the renderer
     * @return {ReactElement} default message
     */

  }, {
    key: 'renderWarning',
    value: function renderWarning() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Nothing to render.'
        )
      );
    }

    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */

  }, {
    key: 'render',
    value: function render() {
      var raw = this.props.raw;

      if (!raw) {
        return this.renderWarning();
      }
      var rendered = (0, _redraft2.default)(raw, renderers);
      // redraft can return a null if there's nothing to render
      if (!rendered) {
        return this.renderWarning();
      }
      return _react2.default.createElement(
        'div',
        null,
        rendered
      );
    }
  }]);

  return Renderer;
}(_react.Component);

Renderer.childContextTypes = {
  contextualizations: _propTypes2.default.object,
  contextualizers: _propTypes2.default.object,
  resources: _propTypes2.default.object,
  assetsData: _propTypes2.default.object,
  notes: _propTypes2.default.object,

  NoteContentPointer: _propTypes2.default.func,
  Link: _propTypes2.default.func
};

/**
 * Component's properties types
 */
Renderer.propTypes = {
  /**
   * Draft-js raw representation of some contents
   * see https://draftjs.org/docs/api-reference-data-conversion.html
   */
  raw: _propTypes2.default.object
};

exports.default = Renderer;