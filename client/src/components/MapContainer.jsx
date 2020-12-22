import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapService from "../services/MapService";

export default function MapContainer() {
  const { mapId } = useParams();
  console.log(mapId);
  const [map, setMap] = useState(null);

  useEffect(() => {
    MapService.get(mapId).then((response) => setMap(response.data));
  }, [mapId]);

  if (!map) return null;

  return (
    <div>
      <h1>{map.name}</h1>
    </div>
  );
}
