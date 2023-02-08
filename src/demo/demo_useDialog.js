import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDialog } from '../lib/index.js';

export default function DemoUseDialog() {
  const [RenderDialog, setDialog] = useDialog();
  const [state, setState] = useState("Niente");

  const handleSimple = () => {
    setDialog(
      {
        dialogHeader: 'Scegli qualcosa',
        content: [
          {
            kind: 'isText',
            variable: 'Cancello Sanremo 2099?'
          }
        ],
        confirmBttTxt: 'Conferma',
        rejectBttTxt: 'Annulla',
        onReaction: (reaction) => setState(JSON.stringify(reaction)),
      }
    );
  };

  const handle = (e) => {
    setDialog({
      anchorEl: e.currentTarget, // obj receive
      position: {
        eventObj: 'bottom-right', // position around anchor Element
        panel: 'bottom-left', // position of the panel
      },
      dialogHeader: 'Aggiungi alla rubrica',
      content: [
        {
          kind: 'isCheck',
          variable: 'buddy',
          selected: true,
          label: 'Segui le variazioni di presenza'
        },
        {
          kind: 'isSelect',
          variable: 'selected',
          selected: 12,
          label: 'Categoria',
          list: [
            { id: 12, label: "Casa" },
            { id: 13, label: "Ufficio" },
            { id: 17, label: "Al Mare" },
            { id: 15, label: "Stai senza pensare" },
          ]
        },
      ],
      confirmBttTxt: 'Salva',
      rejectBttTxt: 'Annulla',
      onReaction: (reaction) => setState(JSON.stringify(reaction)),
    });
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button color="secondary"
          variant="contained"
          onClick={handle}>
          useDialog
        </Button>
        <Button variant="contained" onClick={handleSimple}>
          Simple
        </Button>
        <Button variant="contained" onClick={handle}>
          Complex
        </Button>
      </Stack>
      <h2>
        Hai scelto: <em>{state}</em>
      </h2>
      <RenderDialog />
    </>
  );
}

