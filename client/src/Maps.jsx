import React from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';
import MapList from './components/MapList';
import MapDialog from './components/MapDialog';
import { API } from './constants';
import AddAttendeeDialog from './components/AddPersonDialog';

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      colleges: [],
      isDialogOpen: false,
      addAttendeeMap: null,
    };
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  componentDidMount() {
    this.getMaps();
    this.getColleges();
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

  getColleges() {
    axios.get(`${API}/colleges`)
      .then((response) => this.setState({ colleges: response.data }));
  }

  postMap(name) {
    axios.post(`${API}/maps`, { name })
      .then(() => this.getMaps());
  }

  deleteMap(map) {
    axios.delete(`${API}/maps/${map._id}`)
      .then(() => this.getMaps());
  }

  addAttendee({
    name,
    college,
  }) {
    const { addAttendeeMap } = this.state;
    axios.put(`${API}/maps/${addAttendeeMap._id}`,
      {
        ...addAttendeeMap,
        attendees: [...addAttendeeMap.attendees, {
          name,
          college: college._id,
        }],
      })
      .then(() => this.getMaps());
  }

  render() {
    const {
      colleges,
      maps,
      isDialogOpen,
      addAttendeeMap,
    } = this.state;
    return (
      <>
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickButton}>
            Add a Map
          </Button>
        </div>
        <MapList
          onAdd={(map) => this.setState({ addAttendeeMap: map })}
          onDelete={(map) => this.deleteMap(map)}
          maps={maps}
        />
        <MapDialog
          open={isDialogOpen}
          onClose={() => this.setState({ isDialogOpen: false })}
          handleCancel={() => this.setState({ isDialogOpen: false })}
          handleSubmit={(name) => {
            this.postMap(name);
            this.setState({ isDialogOpen: false });
          }}
        />
        {`${addAttendeeMap}`}
        {addAttendeeMap
        && (
          <AddAttendeeDialog
            colleges={colleges}
            handleClose={() => this.setState({ addAttendeeMap: null })}
            handleSubmit={(attendee) => {
              this.addAttendee(attendee);
              this.setState({ addAttendeeMap: null });
            }}
          />
        )}
      </>
    );
  }
}

export default Maps;
