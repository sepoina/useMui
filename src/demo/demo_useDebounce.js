import * as React from 'react';
import useMouseEvents from 'beautiful-react-hooks/useMouseEvents';
import { useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDebounce } from '../lib/index.js';


export default function DemoUseDebounce() {
  const coor = useRef({}); // meglio così immediato
  const [fast, setFast] = useState(null);
  const [slow, setSlow] = useState(null);
  const { onMouseMove } = useMouseEvents(); // gestore movimenti mouse



  // inizializzazione
  // changeEveryDebouncedUpdate = id unico progressivo ad ogni debounced update
  // debounce = classe inizializzata con due funzioni (update / unMount)
  // 1000 millisecondi tra update successivi
  const executeDebounce = useDebounce(1000);

  const callWhenPopeDie = (r) => {
    coor.d = [coor.f[0], coor.f[1], r];
    setSlow("Debounced (x:" + coor.d[0] + " / y:" + coor.d[1] + ") only "+ coor.d[2]+" update");
  }

  // ogni mouse move è un frequent event
  onMouseMove((event) => {
    if (!coor.f) coor.f = [event.clientX, event.clientY, 1];
    else coor.f = [event.clientX, event.clientY, coor.f[2] + 1]; // increment fast refresh counter
    executeDebounce(callWhenPopeDie); // indica la funzione ma esegui quando è il caso
    setFast("Immediate (x:" + coor.f[0] + " / y:" + coor.f[1] + ") "+ coor.f[2]+" update");
  });

  return (
    <div>
      <Button variant="contained" color="secondary">
        useDebounce
      </Button>
      {fast && <h2>{fast}</h2>}
      {slow && <h2>{slow}</h2>}
    </div>
  );
}