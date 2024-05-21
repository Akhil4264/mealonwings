import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";


import { toast } from 'react-toastify';
import './style.css'

import Routing from "./Routing";
import { useState } from "react";

export default function Map({readonly, location, onChange,companyLoc,distance,setDistance,track}) {

  const [pos, setPos] = useState(location);
  const compLoc = companyLoc ? companyLoc : {lat : "20" , lng : "20"}
  

  return (
    <>
    {!readonly &&
      <button
        type="button"
        onClick={() => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              function (position) {
                const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                setPos(currentLocation);
                onChange(currentLocation)
              },
              function (error) {
                toast.error("Location access denied. Please allow location access.");
              }
            );
          } else {
            toast.error("Geolocation is not supported by this browser.");
          }
        }}
      >
        Find My Location
      </button>
   }
      
      <div>
        Distance : {(distance/1000).toFixed(2)}Km
      </div>


      <MapContainer center={location || [0,0]} zoom={13} style={{ height: "50vh", width: "100vh" }}>
        <Routing readonly={readonly} location={pos} onChange={onChange} companyLoc={companyLoc} distance={distance} setDistance={setDistance} track={track}/>
      </MapContainer>
    </>
  );
}
