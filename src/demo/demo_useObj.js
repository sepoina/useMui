import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useObj } from '../lib/index.js';

export default function DemoUseObj() {

    const [obj, updateObj] = useObj({});

    const handle = () => {
        const casualObject = "{\"" + String.fromCharCode(65 + parseInt(4 * Math.random())) + "\":" + parseInt(1006 * Math.random()) + "}"; // es {"K":322}
        updateObj(JSON.parse(casualObject)); // aggiunge questo oggetto
    };

    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color="secondary" onClick={handle}>
                    useObj
                </Button>
            </Stack>
            {Object.keys(obj)?.length>0 &&
                <h2>
                    Oggetto manipolato: <em>"{JSON.stringify(obj)}"</em>
                </h2>}
            {obj.A && <h2>
                A è stato definito ed è: <em>{obj.A}</em>
            </h2>}

        </>
    );
}

