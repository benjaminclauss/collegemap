import React from 'react';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

function MapList({ maps, onDelete }) {
  return (
    <Grid item xs={12} md={12}>
      <div>
        <List dense>
          {maps.map((map) => (
            <ListItem key={map._id}>
              <ListItemText primary={map.name} secondary={`${map.colleges.length}`} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onDelete(map)} edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Grid>
  );
}

export default MapList;
