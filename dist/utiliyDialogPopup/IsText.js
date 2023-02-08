import * as React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';

export default function IsText({ item }) {
    return (
        <Box sx={{ mt: 1, minWidth: 120 }}>
            <DialogContentText>{item.variable}</DialogContentText>
        </Box>);
}
