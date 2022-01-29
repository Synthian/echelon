import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import TierlistEditor from './components/TierlistEditor';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'background.default', height: '100%', width: '100%'}}>
      <AppBar enableColorOnDark >
        <Toolbar>
          <Typography variant="h4" fontWeight={'bold'}>
            Echelon
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: 1000 }}>
        <TierlistEditor />
      </Box>
    </Box>
  );
}

export default App;
