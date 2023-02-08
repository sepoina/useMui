import * as React from 'react';
import { useState } from 'react';
import AlertDialog from './utiliyDialogPopup/ShowDialog';

export default function useDialog() {
    const [state, setState] = useState(null);
  
    // funzione di Rendering componente
    const renderDialog = () => {
      return (
        <>
          {state !== null && (
            <AlertDialog
              params={state}
              handleReaction={(obj) => {
              state.onReaction(obj);
              setState(null);
            }}
            />
          )}
        </>
      );
    };
  
    // funzione di Interrogazione
    const setDialog = (params) => {
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
  