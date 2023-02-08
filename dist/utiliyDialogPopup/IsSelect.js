"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IsSelect;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _material = require("@mui/material");
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Select = _interopRequireDefault(require("@mui/material/Select"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function IsSelect(_ref) {
  let {
    item,
    notifyChange
  } = _ref;
  // recupera il nome della variabile da item.variable se c'è e da questa dentro state
  const [attuale, setAttuale] = React.useState(item.selected);
  const handleChange = event => {
    let update = {};
    update[item.variable] = event.target.value;
    notifyChange(update); // aggiorna lo stato
    setAttuale(event.target.value);
  };
  return /*#__PURE__*/React.createElement(_Box.default, {
    sx: {
      mt: 2,
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement(_FormControl.default, {
    fullWidth: true
  }, /*#__PURE__*/React.createElement(_material.InputLabel, {
    id: "demo-simple-select-label"
  }, item.label), /*#__PURE__*/React.createElement(_Select.default, {
    labelId: "demo-simple-select-label",
    id: "demo-simple-select",
    value: attuale,
    label: item.label,
    onChange: handleChange
  }, item.list.map(entry => /*#__PURE__*/React.createElement(_MenuItem.default, {
    value: entry.id,
    key: entry.id
  }, entry.label)))));
}