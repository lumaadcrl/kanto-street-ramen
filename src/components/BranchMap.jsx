import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { branches, openingHours } from '../data.js';

const branchMarker = L.divIcon({
  className: 'branch-marker-wrap',
  html: '<span class="branch-marker" aria-hidden="true"></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 34],
  popupAnchor: [0, -30],
});

export default function BranchMap() {
  const bounds = useMemo(() => branches.map((branch) => branch.coordinates), []);

  return (
    <div className="map-frame" role="group" aria-label="Interactive map of Kanto Street Ramen branches">
      <MapContainer bounds={bounds} boundsOptions={{ padding: [30, 30] }} scrollWheelZoom={false} className="branch-map" aria-label="Map showing four Kanto Street Ramen branches in Cebu">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {branches.map((branch) => (
          <Marker
            key={branch.id}
            position={branch.coordinates}
            icon={branchMarker}
            title={`${branch.name}, ${branch.area}`}
            alt={`Map marker for Kanto Street Ramen in ${branch.name}, ${branch.area}`}
          >
            <Popup>
              <strong>{branch.name}</strong><br />{branch.area}<br />{openingHours}<br />
              <a href={`https://www.openstreetmap.org/directions?to=${branch.coordinates[0]}%2C${branch.coordinates[1]}`} target="_blank" rel="noreferrer" aria-label={`Get directions to the ${branch.name} branch`}>Get directions</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <span className="map-credit">Map data &copy; OpenStreetMap</span>
    </div>
  );
}