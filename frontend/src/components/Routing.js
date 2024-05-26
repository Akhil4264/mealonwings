import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap, TileLayer } from "react-leaflet";

// Set the default icon for all markers
L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
});

export default function Routing({ readonly,location ,companyLoc,onChange,distance,setDistance,track}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !location) return;
        const startPoint = L.latLng(location.lat, location.lng);
        const endPoint = L.latLng(companyLoc.lat, companyLoc.lng)
        setDistance(startPoint.distanceTo(endPoint))

        // Fly to the start point initially with a zoom level of 13
        {!readonly&& map.flyTo(startPoint, 13)}

        // Create markers
        const startMarker = L.marker(startPoint, {
            draggable: readonly ? !readonly : true,
            icon: L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41]
            })
        }).addTo(map);

        const endMarker = L.marker(endPoint, {
            draggable: false,
            icon: L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41]
            })
        }).addTo(map);

        // Create a polyline connecting the markers
        const line = L.polyline([startPoint, endPoint], {color: 'blue'}).addTo(map);

        // Initial distance calculation
        setDistance(startPoint.distanceTo(endPoint));
        console.log(distance)

        // Ensure the polyline updates when startMarker is moved
        startMarker.on('drag', function(e) {
            line.setLatLngs([e.target.getLatLng(), endPoint]);
            // onChange(e.target.getLatLng())
            setDistance(e.target.getLatLng().distanceTo(endPoint))
        });

        return () => {
            if (map) {
                map.removeLayer(startMarker);
                map.removeLayer(endMarker);
                map.removeLayer(line);
            }
        };
    }, [map, location,companyLoc]); 

    return (
        <>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        </>
    );
}
