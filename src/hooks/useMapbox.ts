import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLat, Map } from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN_MAPBOX || '';

type Coords = {
    lng: string;
    lat: string;
    zoom: string;
};

const useMapbox = (initialPoint: Coords) => {

    // Referencia al DIV del mapa
    const mapDiv = useRef<HTMLDivElement | null>();
    // useCallback memoriza la función
    const setRef = useCallback(node => {
        mapDiv.current = node;
    }, []);

    const map = useRef<Map>();

    const [coords, setCoords] = useState<Coords>(initialPoint);

    useEffect(() => {
        
        map.current = new mapboxgl.Map({
            container: mapDiv.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ Number(initialPoint.lng), Number(initialPoint.lat) ],
            zoom: Number(initialPoint.zoom)
        });

    }, [initialPoint]);

    // cuando se mueve el mapa
    useEffect(() => {
        
        map.current?.on('move', (data) => {
            const { lng, lat } = map.current?.getCenter() as LngLat;
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.current?.getZoom().toFixed(2) as string
            })
        });

        // En caso de cambiar de pantalla eliminar este listener
        // return () => {
        //     map?.off('move')
        // }

    }, []);


    return {
        coords,
        setRef
    }
}

export default useMapbox;