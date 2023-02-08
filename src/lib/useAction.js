import * as React from 'react';
import { useReducer } from 'react';

export default function useAction(objZero) {
  if (typeof objZero !== 'object') {
    throw new Error('Devi inserire un oggetto per inizializzare useAction');
  }

  // funzione di reading dei dati
  // funzione di setting dei dati
  const [get, update] = useReducer((p, u) => {
    // se l'update è un oggetto vuoto resetta allo stato iniziale
    return Object.keys(u).length === 0 ? objZero : { ...p, ...u };
  }, objZero);

  // funzione di Interrogazione
  const [actionStructure, actions] = React.useState(null);

  // funzione di call delle funzioni interne
  const handle = (params) => {
    if (!actionStructure) return; // no structure
    if (params?.action) {
      for (const [key, value] of Object.entries(actionStructure)) {
        if (key === params.action) actionStructure[key](params.data); // execute this
      }
    }
  };

  // onMount / unMount
  React.useEffect(() => {
    return () => {
      // unmount
    };
  }, []);
  return { handle, actions, get, update };
}
