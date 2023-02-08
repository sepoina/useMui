import { useCallback, useEffect, useRef, useState } from 'react';

//   Originale e test
//   https://stackblitz.com/edit/react-ts-9qvcoq?file=App.tsx,useDebounceUpd.js

//
//                         period  |---------------|           |----------------|----------------|
//   updaupdateButDebounce.call()  !......!.....!..............!.!!!!............!...!....!............
//               call inside func  X...............X...........X................X................X.....
//
//
//  const [debouncedUpdate, frequentUpdate] = useDebounceUpd(1000);
//
//  Nella procedura chiamata frequentemente:
//  ----------------------------------------
//   alert("una ogni millesimo");
//   frequentUpdate.notify();
//
//  La zona di notifica de-bouncizzata
//  ----------------------------------------
//  useEffect(() => {
//    alert("uno ogni tanto");
//  }, [debouncedUpdate]);
//
//
//
class debounceUpdClass {
  constructor(milli) {
    this.lastTimeout = false; // mette qui se c'è una richiesta di esecuzione
    this.ms = 0; // millisecondi da ultima azione
    this.id = Math.floor(Math.random() * 1000) + 1000; // genera un id unico, debug funcion
    this.millisecond = milli; // max millisecond between update
    this.reaction = 0;
    this.takeBack = null;
  }

  notify(f) {
    let passed = new Date().getTime() - this.ms;
    let isDuringTimer = this.lastTimeout !== false;
    let isOverCalled = passed <= this.millisecond;
    this.takeBack=f; // pointer alla funzione
    // se ha già un timing per una verifica
    if (isDuringTimer) return;
    // se non ha un timing e non è di ritorno rapido
    if (!isOverCalled | (this.ms == 0)) {
      this.ms = new Date().getTime(); //reset
      this.masterAction();
      return;
    }
    // se non ha un timing ed è di ritorno rapido fissa la soluzione più tardi
    let rest = this.millisecond - passed > 5 ? this.millisecond - passed : 5; // minimo 5ms
    clearTimeout(this.lastTimeout);
    this.lastTimeout = setTimeout(this.masterAction.bind(this), rest); // memorizza una richiamata con timeout
  }

  masterAction() {
    this.reaction = this.reaction + 1;
    if (this.takeBack) this.takeBack(this.reaction);
    this.ms = new Date().getTime(); //reset
    this.lastTimeout = false;
  }

  unMount() {
    clearTimeout(this.lastTimeout);
    return this.id;
  }
}

/**
 * Accepts a function and returns a new debounced yet memoized version of that same function that delays
 * its invoking by the defined time.
 * If time is not defined, its default value will be 250ms.
 */
export default function useDebounce (milli) {

  const debounced = useRef();

  const callFrequenty = (f) => {
    debounced.current.notify(f);
  }

  useEffect(() => {
    // mount
    debounced.current = new debounceUpdClass(milli);
    // console.log(debounced);
    return () => {
      // unmount
      // console.log('UnMount id:' + debounced.current.unMount());
    };
  }, []);
  return callFrequenty;
};
