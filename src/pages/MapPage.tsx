import React, { FC } from 'react';
import useMapbox from '../hooks/useMapbox';

type Coords = {
    lng: string;
    lat: string;
    zoom: string;
};

const initialPoint: Coords = {
    lng: '5',
    lat: '34',
    zoom: '2'
};

const MapPage: FC = () => {

    
    const { setRef, coords } = useMapbox(initialPoint);

    return (
        <>
            <div className="info">
                lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div 
                ref={ setRef }
                className="mapContainer"
            />
        </>
    )
};

export default MapPage;