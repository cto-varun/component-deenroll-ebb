"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./styles.css");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _componentMessageBus = require("@ivoyant/component-message-bus");
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _CTNLookup = _interopRequireDefault(require("./CTNLookup"));
var _DetailView = _interopRequireDefault(require("./DetailView"));
var _Heading = _interopRequireDefault(require("./Heading"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DeEnroll(_ref) {
  let {
    properties,
    data,
    datasources
  } = _ref;
  const {
    ebbBenefit,
    ebbData
  } = data?.data;
  const history = (0, _reactRouterDom.useHistory)();
  const [values, setValues] = (0, _react.useState)({});
  const [loading, setLoading] = (0, _react.useState)(false);
  const [confirmation, setConfirmation] = (0, _react.useState)(false);
  const {
    workflow,
    datasource,
    successStates,
    errorStates,
    responseMapping
  } = properties;
  const handleChange = (value, name) => [setValues({
    ...values,
    [name]: value
  })];
  const onFinish = () => {
    setLoading(true);
    const requestBody = {
      identifier: ebbData?.identifier,
      associations: [{
        type: 'BroadbandBenefit',
        id: ebbBenefit?.id,
        repId: values?.radId,
        reason: values?.reason,
        transactionType: 'deEnroll'.concat(values?.reason)
      }]
    };
    const submitEvent = 'SUBMIT';
    _componentMessageBus.MessageBus.send('WF.'.concat(workflow).concat('.INIT'), {
      header: {
        registrationId: workflow,
        workflow: workflow,
        eventType: 'INIT'
      }
    });
    _componentMessageBus.MessageBus.subscribe(workflow, 'WF.'.concat(workflow).concat('.STATE.CHANGE'), handleResponse('test'));
    _componentMessageBus.MessageBus.send('WF.'.concat(workflow).concat('.').concat(submitEvent), {
      header: {
        registrationId: workflow,
        workflow: workflow,
        eventType: submitEvent
      },
      body: {
        datasource: datasources[datasource],
        request: {
          body: requestBody
        },
        responseMapping
      }
    });
  };
  const handleResponse = value => (subscriptionId, topic, eventData, closure) => {
    const state = eventData.value;
    const isSuccess = successStates.includes(state);
    const isFailure = errorStates.includes(state);
    if (isSuccess || isFailure) {
      if (isSuccess) {
        setConfirmation(true);
        setTimeout(() => {
          history.push('/dashboards/manage-account');
        }, 2000);
      }
      setLoading(false);
      _componentMessageBus.MessageBus.unsubscribe(subscriptionId);
    }
  };
  const [programType, setProgramType] = (0, _react.useState)('');
  const cohorts = ebbData?.cohorts?.length > 0 && ebbData?.cohorts.map(e => e.toUpperCase());
  (0, _react.useEffect)(() => {
    if (cohorts.length > 0 && cohorts.includes('ACP')) {
      setProgramType('acp');
    } else if (cohorts.length > 0 && cohorts.includes('EBB')) {
      setProgramType('ebb');
    }
  }, [cohorts]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '1rem'
    }
  }, /*#__PURE__*/_react.default.createElement(_Heading.default, {
    level: 4,
    title: "ACP Program De-Enrollment",
    contentClassName: "padding-container"
  }), /*#__PURE__*/_react.default.createElement(_CTNLookup.default, {
    referenceId: ebbBenefit?.id,
    programType: programType
    // ctnlookupFormParams={ctnlookupFormParapms}
    // parentProps={parentProps}
  }), /*#__PURE__*/_react.default.createElement(_antd.Divider, {
    dashed: true,
    style: {
      borderColor: '#333'
    }
  }), /*#__PURE__*/_react.default.createElement(_DetailView.default, {
    firstName: ebbData?.firstName,
    lastName: ebbData?.lastName,
    phoneNumber: ebbBenefit?.id,
    last4ssn: ebbData?.last4ssn,
    tribalId: ebbData?.tribalId,
    nladSubscriberId: ebbBenefit?.nladSubscriberId
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "de-enrollment-form-container"
  }, /*#__PURE__*/_react.default.createElement(_antd.Form, {
    layout: "vertical",
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    },
    initialValues: {
      remember: true
    },
    onFinish: onFinish
    // onFinishFailed={onFinishFailed}
  }, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    name: "reason",
    label: "Reason",
    placeholder: "Select a Reason",
    className: "de-enroll-field",
    rules: [{
      required: true,
      message: 'Reason is Required'
    }]
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    options: [{
      value: 'Deceased'
    }, {
      value: 'Leaving'
    }],
    placeholder: "Select a reason",
    onChange: value => handleChange(value, 'reason')
  })), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    label: "Rad Id",
    name: "radId",
    className: "de-enroll-field",
    placeholder: "Ex: H2324344",
    rules: [{
      required: true,
      message: 'Rad Id is Required'
    }]
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    onChange: e => handleChange(e.target.value, 'radId'),
    placeholder: "Ex: H2324344"
  })), /*#__PURE__*/_react.default.createElement(_antd.Divider, null), !confirmation && values?.radId ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    wrapperCol: {
      span: 16
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, "Do you want to De-Enroll from ACP?"), /*#__PURE__*/_react.default.createElement("div", null, "De-Enrolling this CTN from the ACP program will make you ineligible for ACP benefits.")), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    wrapperCol: {
      span: 16
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    htmlType: "submit",
    loading: loading
  }, "DE-ENROLL"))) : confirmation ? /*#__PURE__*/_react.default.createElement("div", {
    className: "success-message"
  }, /*#__PURE__*/_react.default.createElement(_icons.CheckCircleOutlined, {
    twoToneColor: "#52c41a",
    className: "success-icon"
  }), "CTN ", ebbBenefit?.id, " has been successfully De-Enrolled") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null))));
}
var _default = DeEnroll;
exports.default = _default;
module.exports = exports.default;