'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./MailingPreview.scss');

var _MicropublicationMail = require('../../views/micro/MicropublicationMail');

var _MicropublicationMail2 = _interopRequireDefault(_MicropublicationMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MailingPreview = function MailingPreview(_ref, _ref2) {
  var montage = _ref.montage,
      composition = _ref.composition;
  var t = _ref2.t;
  var title = composition.metadata.title;

  return _react2.default.createElement(
    'div',
    { className: 'plurishing-backoffice-MailingPreview' },
    _react2.default.createElement(
      'div',
      { className: 'header' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'span',
          { className: 'label' },
          t('from')
        ),
        _react2.default.createElement(
          'span',
          { className: 'value' },
          'Plurishing team'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'span',
          { className: 'label' },
          t('to')
        ),
        _react2.default.createElement(
          'span',
          { className: 'value' },
          'The world'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'span',
          { className: 'label' },
          t('object')
        ),
        _react2.default.createElement(
          'span',
          { className: 'value' },
          'Plurishing - ',
          title
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'body' },
      _react2.default.createElement(_MicropublicationMail2.default, {
        montage: montage,
        composition: composition })
    )
  );
};

MailingPreview.contextTypes = {
  t: _propTypes2.default.func.isRequired
};

exports.default = MailingPreview;