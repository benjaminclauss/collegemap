import React from "react";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

function mapLink(id) {
  const link = `maps/${id}`;
  return <Link to={link}>{id}</Link>;
}

function MapList({ maps, onAdd, onDelete }) {
  return (
    <Grid item xs={12} md={12}>
      <div>
        <List dense>
          {maps.map((map) => (
            <ListItem key={map._id}>
              <ListItemText primary={map.name} secondary={mapLink(map._id)} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => onAdd(map)}
                  edge="end"
                  aria-label="delete"
                >
                  <Add />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(map)}
                  edge="end"
                  aria-label="delete"
                >
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
