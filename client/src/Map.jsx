import mapboxgl from 'mapbox-gl';
import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    // eslint-disable-next-line no-unused-vars
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });
  }

  render() {
    return (
      <>
        <div>
          {/* eslint-disable-next-line no-return-assign */}
          <div ref={(el) => this.mapContainer = el} className="mapContainer" />
        </div>
      </>
    );
  }
}
