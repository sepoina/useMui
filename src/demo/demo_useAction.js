import * as React from 'react';
import {  useEffect } from 'react';
import Button from '@mui/material/Button';
import { useAction }  from '../lib/index.js'; 


export default function DemoUseAction() {
  const catalog = useAction({ r: 0, z: 0 });

  // on start
  useEffect(() => {
    catalog.actions({
      //
      // delete
      resolve: (data) => {
        catalog.update(data);
      },
      //
      // clear
      clear: () => {
        catalog.update({});
      },
    });
  }, []);

  return (
    <>
          <Button
          sx={{mr:1}}
        variant="contained"
        color="secondary"
        onClick={() =>
          catalog.handle({ data: { r: parseInt(Math.random()*100) }, action: 'resolve' })
        }
      >
        useAction
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          catalog.handle({ data: { r: ++catalog.get.r }, action: 'resolve' })
        }
      >
        R+
      </Button>

      <Button
        variant="contained"
        onClick={() =>
          catalog.handle({ data: { z: --catalog.get.z }, action: 'resolve' })
        }
      >
        Z-
      </Button>

      <Button variant="contained" onClick={() => catalog.update({ d: 22 })}>
        d=22
      </Button>

      <Button variant="contained" onClick={() => catalog.update({ d: 33 })}>
        d=33
      </Button>
      <SubClass catalog={catalog} />
      <Button
        variant="contained"
        onClick={() => catalog.handle({ action: 'clear' })}
      >
        Clear
      </Button>
      <h2>
        Hai scelto: <em>"{JSON.stringify(catalog.get)}"</em>
      </h2>
    </>
  );
}

function SubClass({ catalog }) {
  return (
    <Button
      variant="contained"
      onClick={() =>
        catalog.handle({ data: { p: { sub: 54 } }, action: 'resolve' })
      }
    >
      P="sub:5"
    </Button>
  );
}
