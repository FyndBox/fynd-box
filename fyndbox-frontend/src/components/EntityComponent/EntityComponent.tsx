import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EntityComponentProps {
  name: string;
  description: string;
  iconButton?: React.ReactNode; // Optional icon button for expanding/collapsing
}

const EntityComponent: React.FC<EntityComponentProps> = ({
  name,
  description,
  iconButton,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: '#558B6E',
        borderRadius: '1px',
        marginBottom: '5px',
      }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={8} container alignItems="center">
            <Typography variant="h6" sx={{ color: 'white' }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <IconButton>
              <EditIcon sx={{ color: 'white' }} /> {/* Edit icon */}
            </IconButton>
            {iconButton && iconButton}{' '}
            {/* Optional icon button (expand/collapse) */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EntityComponent;
