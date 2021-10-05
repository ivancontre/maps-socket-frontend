import React, { FC, useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
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

    const { socket } = useContext(SocketContext);
    
    const { setRef, coords, newMarker$, moveMarker$, addMarker, updateMarker } = useMapbox(initialPoint);

    // Escuchar marcadores existentes
    useEffect(() => {

        socket?.on('active-markers', (markers) => {
            
            for (let key in markers) {

                addMarker(markers[key], key);
            }

        });
        
    }, [socket, addMarker]);

    // Nuevo marcador
    useEffect(() => {

        newMarker$.subscribe(marker => {
            socket?.emit('new-marker', marker);
        });
        
    }, [newMarker$, socket]);

    // Movimiento marcador
    useEffect(() => {

        moveMarker$.subscribe(marker => {
            socket?.emit('update-marker', marker);
        });
        
    }, [moveMarker$, socket]);

    // Escuchar nuevos marcadores
    useEffect(() => {

        socket?.on('new-marker', (marker) => {
            addMarker(marker, marker.id);
        });
        
    }, [socket, addMarker]);

    // Escuchar marcadores actualizados
    useEffect(() => {

        socket?.on('update-marker', (marker) => {
            updateMarker(marker);
        });
        
    }, [socket, updateMarker]);   

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