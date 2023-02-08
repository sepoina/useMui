import { useReducer } from 'react';

export default function useObj(objZero) {
  if (typeof objZero !== 'object') {
    throw new Error('Devi inserire un oggetto per inizializzare useObj');
  }
  // funzione di reading dei dati
  // funzione di setting dei dati
  const [get, update] = useReducer((p, u) => {
    // se l'update è un oggetto vuoto resetta allo stato iniziale
    return Object.keys(u).length === 0 ? objZero : { ...p, ...u };
  }, objZero);
  return [get, update];
}
