import * as React from 'react';
import Box from '@mui/material/Box';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function IsSelect({ item, notifyChange }) {
  // recupera il nome della variabile da item.variable se c'è e da questa dentro state
  const [attuale, setAttuale] = React.useState(item.selected);

  const handleChange = (event) => {
    let update = {};
    update[item.variable] = event.target.value;
    notifyChange(update); // aggiorna lo stato
    setAttuale(event.target.value);
  };

  return (
    <Box sx={{ mt: 2, minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={attuale}
          label={item.label}
          onChange={handleChange}
        >
          {item.list.map((entry) => (
            <MenuItem value={entry.id} key={entry.id}>{entry.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}