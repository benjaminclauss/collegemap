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

function CollegeList({ colleges, onDelete }) {
  return (
    <Grid item xs={12} md={12}>
      <div>
        <List dense>
          {colleges.map((college) => (
            <ListItem key={college._id}>
              <ListItemText primary={college.name} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onDelete(college)} edge="end" aria-label="delete">
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

export default CollegeList;
