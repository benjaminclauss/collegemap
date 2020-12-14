import React from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';
import CollegeList from './components/CollegeList';
import CollegeDialog from './components/CollegeDialog';
import { API } from './constants';

class Colleges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colleges: [],
      isDialogOpen: false,
    };
    this.handleClickButton = this.handleClickButton.bind(this);
    console.log(API);
  }

  componentDidMount() {
    this.getColleges();
  }

  handleSubmit(name) {
    this.postCollege(name);
  }

  handleClickButton() {
    this.setState({ isDialogOpen: true });
  }

  getColleges() {
    axios.get(`${API}/colleges`)
      .then((response) => this.setState({ colleges: response.data }));
  }

  postCollege(name) {
    axios.post(`${API}/colleges`, { name })
      .then(() => this.getColleges());
  }

  deleteCollege(college) {
    axios.delete(`${API}/colleges/${college._id}`)
      .then(() => this.getColleges());
  }

  render() {
    const {
      colleges,
      isDialogOpen,
    } = this.state;
    return (
      <>
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickButton}>
            Add a College
          </Button>
          <CollegeDialog
            open={isDialogOpen}
            onClose={() => this.setState({ isDialogOpen: false })}
            handleCancel={() => this.setState({ isDialogOpen: false })}
            handleSubmit={(name) => {
              this.postCollege(name);
              this.setState({ isDialogOpen: false });
            }}
          />
        </div>
        <CollegeList
          onDelete={(college) => this.deleteCollege(college)}
          colleges={colleges}
        />
      </>
    );
  }
}

export default Colleges;
