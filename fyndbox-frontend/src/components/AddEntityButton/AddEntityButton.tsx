import { FC } from 'react';
import { Stack, Typography, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddEntityButton: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Stack
        direction="row"
        textAlign={'center'}
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 4 }}
      >
        {/* Text for "Lägg till enhet" */}
        <Typography variant="h6" sx={{ color: 'gray' }}>
          Lägg till enhet
        </Typography>

        {/* Add Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333', // Darken the hover color
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Stack>
    </Box>
  );
};

export default AddEntityButton;
