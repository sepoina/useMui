import * as React from 'react';
import AlertPopup from './utiliyDialogPopup/ShowPopup';

export default function usePopup() {
  const [state, setState] = React.useState(null);

  // funzione di Rendering componente
  const renderPopup = () => {
    return (
      <>
        {state !== null && (
          <AlertPopup
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
  const setPopup = (params) => {
    setState(params);
  };

  // onMount / unMount
  React.useEffect(() => {
    return () => {
      // unmount
    };
  }, []);
  return [renderPopup, setPopup];
}
