"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDialog;
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _ShowDialog = _interopRequireDefault(require("./utiliyDialogPopup/ShowDialog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useDialog() {
  const [state, setState] = (0, React.useState)(null);

  // funzione di Rendering componente
  const renderDialog = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, state !== null && /*#__PURE__*/React.createElement(_ShowDialog.default, {
      params: state,
      handleReaction: obj => {
        state.onReaction(obj);
        setState(null);
      }
    }));
  };

  // funzione di Interrogazione
  const setDialog = params => {
    setState(params);
  };

  // onMount / unMount
  React.useEffect(() => {
    return () => {
      // unmount
    };
  }, []);
  return [renderDialog, setDialog];
}