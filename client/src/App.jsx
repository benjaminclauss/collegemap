import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Colleges from "./components/Colleges";
import Maps from "./components/Maps";
import Map from "./components/Map";

const useStyles = makeStyles(() => ({
  appBar: {
    marginBottom: 30,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">College Map</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route exact path="/">
            <Redirect to="/colleges" />
          </Route>
          <Route path="/colleges" component={Colleges} />
          <Route path="/maps" component={Maps} />
          <Route path="/map" component={Map} />
        </Switch>
      </Container>
    </Router>
  );
}
