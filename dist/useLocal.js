"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLocal;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
var _useObj = _interopRequireDefault(require("./useObj"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// ▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
//
//                         CLASSE
//
// ▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨

// funzioni
//
//  get(item,defaultValue,prename ) ->  torna item value o defaultValue
//                                      es: get("pagina.prima","alto","rolando@mio.amico")
//
//  set(item, value,prename)       ->   setta item a value
//                                      es: set("pagina.prima","alto","rolando@mio.amico")
//

/*

Structure
LocalList = array of LocalStore
LocalStore = {
    master:string,   // es: "pippo@lubrano.it" or "root"
    data:object
}

findInStore (master) -> LocalStore
localStoreToHere(master)
hereToLocalStore(master)
get(master,key) -> data
set(master,key,value) 
unset(master,key)


*/
//
//

const ReactLocalStorage = new class ClassReactLocalStorage {
  constructor() {
    this.localList = []; // array of local copy of localStorage
  }

  findInStore(master) {
    return this.localList.find(s => s.master === master);
  }
  localStoreToHere(master) {
    const dataRaw = localStorage.getItem(master);
    let data = null;
    try {
      data = JSON.parse(dataRaw);
    } catch (e) {
      data = dataRaw; // è un dato non oggetto
    }

    this.localList.push({
      master: master,
      data: data
    });
    return this.localList[this.localList.length - 1];
  }
  hereToLocalStore(master) {
    const hereStore = this.findInStore(master);
    if (hereStore) {
      if (hereStore.data !== undefined) {
        localStorage.setItem(master, JSON.stringify(hereStore.data));
      }
    }
  }
  get(master, key) {
    // trova lo store
    if (!this.test(master, key)) return undefined;
    let store = this.findInStore(master);
    if (!store) {
      store = this.localStoreToHere(master); // prova a recuperare dalla lista
    }
    // trova il dato
    let keys = key.split('.');
    if (keys.length === 0) throw new Error('La "key" deve contenere un campo mentre è vuota');
    let obj = store.data;
    if (!obj) return undefined;
    for (let x = 0; x != keys.length - 1; x++) {
      if (typeof obj[keys[x]] !== 'object') {
        obj = undefined; // non esiste
        break;
      }
      obj = obj[keys[x]]; // continua la ricerca
    }

    if (obj === undefined) return undefined;else return obj[keys[keys.length - 1]];
  }
  set(master, key, value) {
    // trova lo store
    if (!this.test(master, key)) return undefined;
    let store = this.findInStore(master);
    if (!store) {
      store = this.localStoreToHere(master); // prova a recuperare dalla lista
    }
    // trova il dato
    let keys = key.split('.');
    if (keys.length === 0) throw new Error('La "key" deve contenere un campo mentre è vuota');
    if (!store.data) store.data = {}; // se non c'è crealo
    let obj = store.data;
    for (let x = 0; x != keys.length - 1; x++) {
      if (typeof obj[keys[x]] !== 'object') obj[keys[x]] = {}; // definisci nuova chiave
      obj = obj[keys[x]]; // continua la ricerca
    }

    if (value === undefined) delete obj[keys[keys.length - 1]]; // undefined vale come cancellazione
    else obj[keys[keys.length - 1]] = value;
    this.hereToLocalStore(master); // salva
  }

  test(master, key) {
    if (master && master.match(/[^A-Za-z0-9\_\-\.\@]/gm)) throw new Error('Il "master" deve contenere solo caratteri standard');
    if (key && key.match(/[^A-Za-z0-9\_\-\.\@]/gm)) throw new Error('la "key" deve contenere solo caratteri standard');
    return true;
  }
  isLongString(s) {
    return s && (typeof s === 'string' || s instanceof String) && s.length > 1;
  }
  isObject(o) {}
}();

// ▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
//
//                         HOOKS
//
// ▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨▨

/** //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *       Hooks che salva nell'infrastruttura bcs local storage un valore. Funziona come uno useState 
 * 
 *          @param {object} prefs - Preferenze dell'Hooks .
 *          @returns [readValue,setValue] 
 * 
 */ /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    */
function useLocal(prefs) {
  const [ambient, updateAmbient] = (0, _useObj.default)({});
  const [state, setState] = (0, _react.useState)(undefined);

  // funzione di modifica
  const setValue = newState => {
    //   set(master,key,value)
    ReactLocalStorage.set(ambient.master, ambient.key, newState); // set to browser localStorage
    setState(newState); // set interno
  };

  const getValue = function getValue() {
    for (var _len = arguments.length, question = new Array(_len), _key = 0; _key < _len; _key++) {
      question[_key] = arguments[_key];
    }
    const args = question;
    // no parameters return value widhout reload
    if (args.length === 0) return state;
    let newAmbient = _objectSpread(_objectSpread({}, ambient), {});
    // one parameters is key or object
    if (args.length === 1) {
      if (typeof args[0] === 'object') newAmbient = _objectSpread(_objectSpread({}, ambient), args[0]);else newAmbient = _objectSpread(_objectSpread({}, ambient), {
        key: args[0]
      });
    }
    // two parameters is master/key
    if (args.length === 2) newAmbient = _objectSpread(_objectSpread({}, ambient), {
      master: args[0],
      key: args[1]
    });
    // tree parameters is master/key/predef
    if (args.length === 3) newAmbient = _objectSpread(_objectSpread({}, ambient), {
      master: args[0],
      key: args[1],
      predef: args[2]
    });
    // recupera il nuovo valore
    let newValue = ReactLocalStorage.get(newAmbient.master, newAmbient.key);
    if (newValue == undefined && newAmbient.predef !== undefined) newValue = newAmbient.predef; // forza al predefinito se manca il dato
    if (newValue !== state) {
      // console.log("update state!");
      setState(newValue);
    }
    if (newAmbient !== ambient) {
      // console.log("update ambient!");
      updateAmbient(newAmbient);
    }
    return newValue;
  };

  // onMount / unMount
  (0, _react.useEffect)(() => {
    // MOUNT
    if (prefs && Object.keys(prefs).length > 0) getValue(prefs); // se c'è un oggetto fai il tuo dovere e aggiorna state
  }, []);
  return [state, setValue];
}
;