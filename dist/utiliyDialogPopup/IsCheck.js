"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IsCheck;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _FormGroup = _interopRequireDefault(require("@mui/material/FormGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function IsCheck(_ref) {
  let {
    item,
    notifyChange
  } = _ref;
  // recupera il nome della variabile da item.variable se c'è e da questa dentro state
  const [attuale, setAttuale] = React.useState(item.selected);
  const handleChange = event => {
    let update = {};
    update[item.variable] = event.target.checked;
    notifyChange(update); // aggiorna lo stato
    setAttuale(event.target.checked);
  };
  return /*#__PURE__*/React.createElement(_Box.default, {
    sx: {
      mt: 1,
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement(_FormGroup.default, null, /*#__PURE__*/React.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/React.createElement(_Checkbox.default, {
      checked: attuale,
      onChange: handleChange
    }),
    label: item.label
  })));
}