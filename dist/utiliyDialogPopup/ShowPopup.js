"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShowPopup;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _Popover = _interopRequireDefault(require("@mui/material/Popover"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _IsText = _interopRequireDefault(require("./IsText"));
var _IsCheck = _interopRequireDefault(require("./IsCheck"));
var _IsSelect = _interopRequireDefault(require("./IsSelect"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function splitParameter(p, def) {
  if (!p) return def;
  const arr = p.split('-');
  if (arr.length == 2) {
    return {
      vertical: arr[0],
      horizontal: arr[1]
    };
  }
  return def;
}
function ShowPopup(_ref) {
  let {
    params,
    handleReaction
  } = _ref;
  const [state, setState] = React.useState({});
  const {
    anchorEl,
    position,
    dialogHeader,
    content,
    confirmBttTxt,
    rejectBttTxt
  } = params;
  const ao = splitParameter(position === null || position === void 0 ? void 0 : position.eventObj, {
    vertical: 'bottom',
    horizontal: 'left'
  });
  const to = splitParameter(position === null || position === void 0 ? void 0 : position.panel, {});
  const notifyChange = newState => {
    // console.log({ ...state, ...newState });
    setState(_objectSpread(_objectSpread({}, state), newState));
  };

  // onMount / unMount
  React.useEffect(() => {
    // memoize preferences risolvendo i content uno per uno
    let localState = {};
    content.map(i => {
      if (i.selected !== undefined) localState[i.variable] = i.selected;
    });
    setState(localState);
    return () => {
      // unmount
    };
  }, []);
  return /*#__PURE__*/React.createElement(_Popover.default, {
    open: true,
    anchorEl: anchorEl,
    onClose: () => handleReaction({
      reject: true
    }),
    anchorOrigin: ao,
    transformOrigin: to,
    PaperProps: {
      style: {
        minWidth: '300px'
      }
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_DialogTitle.default, {
    id: "responsive-dialog-title"
  }, dialogHeader), /*#__PURE__*/React.createElement(_DialogContent.default, null, content.map(item => ({
    'isText': /*#__PURE__*/React.createElement(_IsText.default, {
      item: item,
      key: item.variable,
      notifyChange: notifyChange
    }),
    'isCheck': /*#__PURE__*/React.createElement(_IsCheck.default, {
      item: item,
      key: item.variable,
      notifyChange: notifyChange
    }),
    'isSelect': /*#__PURE__*/React.createElement(_IsSelect.default, {
      item: item,
      key: item.variable,
      notifyChange: notifyChange
    })
  })[item.kind])), /*#__PURE__*/React.createElement(_DialogActions.default, null, /*#__PURE__*/React.createElement(_Button.default, {
    onClick: () => handleReaction(_objectSpread(_objectSpread({}, state), {
      confirm: true
    }))
  }, confirmBttTxt), /*#__PURE__*/React.createElement(_Button.default, {
    onClick: () => handleReaction({
      reject: true
    }),
    autoFocus: true
  }, rejectBttTxt))));
}