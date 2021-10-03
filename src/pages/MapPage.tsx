import React, { FC, useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN_MAPBOX || '';

const initialPoint = {
    lng: 5,
    lat: 34,
    zoom: 2
};

const MapPage: FC = () => {

    const mapDiv = useRef<HTMLDivElement>(null);

    const [, setsMap] = useState<Map>()

    useEffect(() => {
        
        const map = new mapboxgl.Map({
            container: mapDiv.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ initialPoint.lng, initialPoint.lat ],
            zoom: initialPoint.zoom
        });

        setsMap(map);

    }, []);


    return (
        <>
            <div 
                ref={ mapDiv }
                className="mapContainer"
            />
        </>
    )
};

export default MapPage;