import * as React from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import MapService from "../services/MapService";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      viewport: {
        width: "100%",
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
      },
    };
    this._updateViewport.bind(this);
  }

  componentDidMount() {
    this.getMaps();
  }

  getMaps() {
    MapService.getAll().then((response) =>
      this.setState({ maps: response.data })
    );
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { maps, viewport } = this.state;
    console.log(maps[0]);
    return (
      <div className="mapContainer">
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={this._updateViewport}
        >
          <NavigationControl />
          {maps.length > 0 && <Pins data={maps[0].attendees} />}
        </MapGL>
      </div>
    );
  }
}

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
  const { data, onClick } = props;

  return data.map((attendee) => {
    console.log("Am I even here?");
    console.log(attendee);
    console.log(attendee.college.latitude);
    console.log(attendee.college.longitude);
    return (
      <Marker
        key={attendee.name}
        longitude={attendee.college.coordinates.longitude}
        latitude={attendee.college.coordinates.latitude}
      >
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
            fill: "#d00",
            stroke: "none",
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
          }}
          onClick={() => onClick()}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    );
  });
}
