"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DetailView;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DetailView(_ref) {
  let {
    firstName,
    lastName,
    last4ssn,
    phoneNumber,
    middleName,
    tribalId,
    nladSubscriberId
  } = _ref;
  const renderValue = (value, label) => {
    return value ? /*#__PURE__*/_react.default.createElement("div", {
      className: "detail-view-container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "detail-view-heading"
    }, label), /*#__PURE__*/_react.default.createElement("div", {
      className: "detail-view-data"
    }, ": ", value)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "padding-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "detail-view-main"
  }, renderValue(firstName, 'First Name'), renderValue(phoneNumber, 'Phone Number')), /*#__PURE__*/_react.default.createElement("div", {
    className: "detail-view-main"
  }, renderValue(lastName, 'Last Name'), renderValue(nladSubscriberId, 'Subscriber Id')), /*#__PURE__*/_react.default.createElement("div", {
    className: "detail-view-main"
  }, renderValue(middleName, 'Middle Name')));
}
module.exports = exports.default;