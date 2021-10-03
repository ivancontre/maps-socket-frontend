import React, { FC, useEffect } from 'react';
import useMapbox from '../hooks/useMapbox';

type Coords = {
    lng: string;
    lat: string;
    zoom: string;
};

const initialPoint: Coords = {
    lng: '-72.1167',
    lat: '-36.6',
    zoom: '11'
};

const MapPage: FC = () => {

    
    const { setRef, coords, newMarker$, moveMarker$ } = useMapbox(initialPoint);

    // Nuevo marcador
    useEffect(() => {

        newMarker$.subscribe(marker => {
            // TODO: Nuevo marcador
        });
        
    }, [newMarker$]);

    // Movimiento marcador
    useEffect(() => {

        moveMarker$.subscribe(marker => {
            // TODO: Nuevo marcador
            console.log('MapPage', marker)
        });
        
    }, [moveMarker$]);

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