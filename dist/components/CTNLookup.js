"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CTNLookup;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Paragraph
} = _antd.Typography;
const {
  Text
} = _antd.Typography;
function CTNLookup(_ref) {
  let {
    referenceId,
    programType
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: "lookup-description-container padding-container"
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    direction: "vertical"
  }, /*#__PURE__*/_react.default.createElement(Text, null, "Customer is enrolled in the ", programType.toUpperCase(), ' ', "Program."), /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(Text, null, "Reference ID :"), /*#__PURE__*/_react.default.createElement(Paragraph, {
    style: {
      marginBottom: 0
    },
    copyable: true
  }, /*#__PURE__*/_react.default.createElement(Text, {
    type: "success",
    style: {
      fontWeight: 'bold'
    }
  }, referenceId, ' '))))));
}
module.exports = exports.default;