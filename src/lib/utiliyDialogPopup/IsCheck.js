import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export default function IsCheck({ item, notifyChange }) {
  // recupera il nome della variabile da item.variable se c'è e da questa dentro state
  const [attuale, setAttuale] = React.useState(item.selected);

  const handleChange = (event) => {
    let update = {};
    update[item.variable] = event.target.checked;
    notifyChange(update); // aggiorna lo stato
    setAttuale(event.target.checked);
  };

  return (
    <Box sx={{ mt: 1, minWidth: 120 }}>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={attuale} onChange={handleChange}/>} label={item.label} />
      </FormGroup>
    </Box>
  );
}

