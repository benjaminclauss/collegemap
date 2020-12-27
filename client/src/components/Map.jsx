import * as React from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";

const navStyle = {
  position: "absolute",
  top: 72,
  left: 0,
  padding: "10px",
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: "100%",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
      },
    };
    this.onViewportChange.bind(this);
  }

  onViewportChange = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { viewport } = this.state;
    const { map } = this.props;
    return (
      <div className="mapContainer">
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={this.onViewportChange}
        >
          <div style={navStyle}>
            <NavigationControl />
          </div>
          <Pins data={map.attendees} onClick={() => {}} />
        </MapGL>
      </div>
    );
  }
}

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
  const { data } = props;

  return data.map((attendee) => {
    return (
      <Marker
        key={attendee.name}
        longitude={attendee.college.coordinates.longitude}
        latitude={attendee.college.coordinates.latitude}
      >
        <div>
          <img
            alt="Spongebob"
            width="50px"
            height="50px"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
          />
        </div>
      </Marker>
    );
  });
}
