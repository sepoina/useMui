import * as React from 'react';
import Box from '@mui/material/Box';
import DemoUseDialog from './demo_useDialog';
import DemoUsePopup from './demo_usePopup';
import DemoUseAction from './demo_useAction';
import DemoUseObj from './demo_useObj';
import DemoUseLocal from './demo_useLocal';
import DemoUseDebounce from './demo_useDebounce';

export default function BoxComponent() {
  return (
    <>
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <DemoUseDialog/>
    </Box>
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <DemoUsePopup/>
    </Box>
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <DemoUseAction/>
    </Box>
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <DemoUseObj/>
    </Box>
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <DemoUseLocal/>
    </Box>
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <DemoUseDebounce/>
    </Box>
    </>
  );
}