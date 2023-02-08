//
// Versione 1.4
//  
//
// Funzioni pubbliche dell'Hooks:
//
//  const [ getValue,setValue] = useLocal(preferences);
//
//
//
// esempio di preferences
// {
//   root: "Buddy.expanded",          // nome della cartella di scrittura
//   prename: "filippo@localhost.it", // eventuale utente
//   key: oggetto.nome,               // nome della variabile
//   defaultIfUndef: 8327             // valore iniziale
// }
//
//
//
//

import { useEffect, useState } from 'react';
import useObj from './useObj';





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
        return (this.localList.find(s => s.master === master));
    }

    localStoreToHere(master) {
        const dataRaw = localStorage.getItem(master);
        let data = null;
        try {
            data = JSON.parse(dataRaw);
        } catch (e) {
            data = dataRaw; // è un dato non oggetto
        }
        this.localList.push({ master: master, data: data });
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
        if (!this.test(master,key)) return undefined;
        let store=this.findInStore (master); 
        if (!store) {
           store= this.localStoreToHere(master); // prova a recuperare dalla lista
        }
        // trova il dato
        let keys = key.split('.');
        if (keys.length===0) throw new Error('La "key" deve contenere un campo mentre è vuota');
        let obj = store.data;
        if (!obj) return undefined;
        for (let x = 0; x != keys.length - 1; x++) {
            if (typeof obj[keys[x]] !== 'object') {
                obj=undefined; // non esiste
                break;
            }
            obj = obj[keys[x]]; // continua la ricerca
        }
        if (obj===undefined) return undefined;
        else return obj[keys[keys.length - 1]];
    }

    set(master,key,value) {
        // trova lo store
        if (!this.test(master,key)) return undefined;
        let store=this.findInStore (master); 
        if (!store) {
           store= this.localStoreToHere(master); // prova a recuperare dalla lista
        }
         // trova il dato
         let keys = key.split('.');
         if (keys.length===0) throw new Error('La "key" deve contenere un campo mentre è vuota');
         if (!store.data) store.data={}; // se non c'è crealo
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
        if (master && (master.match(/[^A-Za-z0-9\_\-\.\@]/gm)))
            throw new Error('Il "master" deve contenere solo caratteri standard');
        if (key && (key.match(/[^A-Za-z0-9\_\-\.\@]/gm)))
            throw new Error('la "key" deve contenere solo caratteri standard');
        return (true);
    }

    isLongString(s) {
        return (s && (typeof s === 'string' || s instanceof String) && s.length > 1);
    }

    isObject(o) {

    }
}



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
export default function useLocal(prefs) {
    const [ambient, updateAmbient] = useObj({});
    const [state, setState] = useState(undefined);

    // funzione di modifica
    const setValue = (newState) => {
        //   set(master,key,value)
        ReactLocalStorage.set(ambient.master,ambient.key, newState); // set to browser localStorage
        setState(newState); // set interno
    };

    const getValue = (...question) => {
        const args=question;
        // no parameters return value widhout reload
        if (args.length === 0) return state;
        let newAmbient = {...ambient,...{}};
        // one parameters is key or object
        if (args.length === 1) {
            if (typeof args[0] === 'object') newAmbient= {...ambient,...args[0]};
            else newAmbient = { ...ambient, ...{ key: args[0] } };
        }
        // two parameters is master/key
        if (args.length === 2) newAmbient = { ...ambient, ...{ master: args[0], key: args[1] } };
        // tree parameters is master/key/predef
        if (args.length === 3) newAmbient = { ...ambient, ...{ master: args[0], key: args[1], predef: args[2] } };
        // recupera il nuovo valore
        let newValue = ReactLocalStorage.get(newAmbient.master,newAmbient.key);
        if (newValue==undefined && newAmbient.predef!==undefined) newValue=newAmbient.predef; // forza al predefinito se manca il dato
        if (newValue !== state) {
            // console.log("update state!");
            setState(newValue);
        }
        if (newAmbient!==ambient) {
            // console.log("update ambient!");
            updateAmbient(newAmbient);
        }
        return newValue;
    }


    // onMount / unMount
    useEffect(() => {
        // MOUNT
        if (prefs && (Object.keys(prefs).length > 0)) getValue(prefs); // se c'è un oggetto fai il tuo dovere e aggiorna state
    }, []);

    return [state, setValue];
};

