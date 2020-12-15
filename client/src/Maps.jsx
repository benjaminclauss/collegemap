import React from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';
import MapList from './components/MapList';
import MapDialog from './components/MapDialog';
import { API } from './constants';

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      isDialogOpen: false,
    };
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  componentDidMount() {
    this.getMaps();
  }

  handleSubmit(name) {
    this.postMap(name);
  }

  handleClickButton() {
    this.setState({ isDialogOpen: true });
  }

  getMaps() {
    axios.get(`${API}/maps`)
      .then((response) => this.setState({ maps: response.data }));
  }

  postMap(name) {
    axios.post(`${API}/maps`, { name })
      .then(() => this.getMaps());
  }

  deleteMap(map) {
    axios.delete(`${API}/maps/${map._id}`)
      .then(() => this.getMaps());
  }

  render() {
    const {
      maps,
      isDialogOpen,
    } = this.state;
    return (
      <>
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickButton}>
            Add a Map
          </Button>
          <MapDialog
            open={isDialogOpen}
            onClose={() => this.setState({ isDialogOpen: false })}
            handleCancel={() => this.setState({ isDialogOpen: false })}
            handleSubmit={(name) => {
              this.postMap(name);
              this.setState({ isDialogOpen: false });
            }}
          />
        </div>
        <MapList
          onDelete={(map) => this.deleteMap(map)}
          maps={maps}
        />
      </>
    );
  }
}

export default Maps;
