"use client"

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const LocationMap = ({ latitude, longitude }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        mapRef.current = L.map('mapid').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

        const markerIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        L.marker([latitude, longitude], { icon: markerIcon }).addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [latitude, longitude]);

    return <div id="mapid" className="h-full w-full"></div>;
};

export default LocationMap;
