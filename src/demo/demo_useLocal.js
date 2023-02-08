import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocal } from '../lib/index.js';

export default function DemoUseLocal() {

    const [note, setNote] = useLocal(
     {
       master: "filippo@piccoli.it",        // eventuale proprietario
       key: "concert.strument.diapason",    // nome della variabile
       predef: "non definito"               // valore iniziale
     }
    );

    const handleRandom = () => {
        setNote(parseInt(Math.random()*3000));
    };

    const handleQuattro = () => {
        setNote(440);
    };

    return (
        <>
            <Stack spacing={2} direction="row">
                <Button           sx={{mr:1}} variant="contained" color="secondary" onClick={handleRandom}>
                    useLocal
                </Button>
                <Button variant="contained" onClick={handleRandom}>
                    setta random
                </Button>
                <Button variant="contained" onClick={handleQuattro}>
                    setta 440
                </Button>
            </Stack>
            {note &&
            <>
                <h2>
                    Oggetto salvato in locale (ricarica pagina): <em>{JSON.stringify(note)}</em><br/>
                    Per vedere le variabili salvate: F12 per aprire console - Applicazione - Archiviazione locale
                </h2>
                </>
                }

        </>
    );
}