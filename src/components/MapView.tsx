import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

interface MapViewProps {
  sourceLat: number;
  sourceLon: number;
  destinationLat: number;
  destinationLon: number;
  sourceName: string;
  destinationName: string;
  route: any;
  routeMarkers: any[];
}

interface ChangeMapViewProps {
  sourceLat: number;
  sourceLon: number;
  destinationLat: number;
  destinationLon: number;
  route: any;
}

function ChangeMapView({
  sourceLat,
  sourceLon,
  route,
}: ChangeMapViewProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([sourceLat, sourceLon], 8);

    if (route?.features?.length > 0) {
      const bounds = route.features[0].geometry.coordinates.map(
        (point: number[]) => [point[1], point[0]]
      );

      map.fitBounds(bounds);
    }
  }, [sourceLat, sourceLon, route, map]);

  return null;
}

export default function MapView({
  sourceLat,
  sourceLon,
  destinationLat,
  destinationLon,
  sourceName,
  destinationName,
  route,
  routeMarkers,
}: MapViewProps) {
  return (
    <MapContainer
      center={[sourceLat, sourceLon]}
      zoom={8}
      style={{
        height: "480px",
        width: "100%",
        borderRadius: "15px",
      }}
    >
      <ChangeMapView
        sourceLat={sourceLat}
        sourceLon={sourceLon}
        destinationLat={destinationLat}
        destinationLon={destinationLon}
        route={route}
      />

      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <TileLayer
        opacity={0.7}
        url={`https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png?key=${import.meta.env.VITE_TOMTOM_API_KEY}`}
      />

      {/* Source */}
      <Marker position={[sourceLat, sourceLon]}>
        <Popup>{sourceName}</Popup>
      </Marker>

      {/* Destination */}
      <Marker position={[destinationLat, destinationLon]}>
        <Popup>{destinationName}</Popup>
      </Marker>

      {/* Route Markers */}
      {routeMarkers?.map((marker: any, index: number) => (
        <Marker key={index} position={[marker.lat, marker.lon]}>
          <Popup>
            <b>{marker.type}</b>
            <br />
            {marker.name}
          </Popup>
        </Marker>
      ))}

      {/* Route */}
      {route?.features?.map((feature: any, index: number) => {
        const coords = feature.geometry.coordinates.map(
          (point: number[]) => [point[1], point[0]]
        );

        return (
          <Polyline
            key={index}
            positions={coords}
            pathOptions={{
              color: index === 0 ? "#7c3aed" : "#64748b",
              weight: index === 0 ? 6 : 4,
            }}
          />
        );
      })}
    </MapContainer>
  );
}