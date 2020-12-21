import React from "react";

import { Button } from "@material-ui/core";
import MapList from "../components/MapList";
import MapDialog from "../components/MapDialog";
import AddAttendeeDialog from "../components/AddPersonDialog";
import CollegeService from "../services/CollegeService";
import MapService from "../services/MapService";

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
    MapService.getAll().then((response) =>
      this.setState({ maps: response.data })
    );
  }

  getColleges() {
    CollegeService.getAll().then((response) =>
      this.setState({ colleges: response.data })
    );
  }

  postMap(name) {
    MapService.create({ name }).then(() => this.getMaps());
  }

  deleteMap(map) {
    MapService.delete(map._id).then(() => this.getMaps());
  }

  addAttendee({ name, college }) {
    const { addAttendeeMap } = this.state;
    MapService.update(addAttendeeMap._id, {
      ...addAttendeeMap,
      attendees: [
        ...addAttendeeMap.attendees,
        {
          name,
          college: college._id,
        },
      ],
    }).then(() => this.getMaps());
  }

  render() {
    const { colleges, maps, isDialogOpen, addAttendeeMap } = this.state;
    return (
      <>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickButton}
          >
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
        {addAttendeeMap && (
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
