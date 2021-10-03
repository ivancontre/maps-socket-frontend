import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLat, Map, Marker } from 'mapbox-gl';
import { v4 as uuid} from 'uuid'
import { Subject } from 'rxjs';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN_MAPBOX || '';

type Coords = {
    lng: string;
    lat: string;
    zoom: string;
};

type CustomMarker = Marker & {
    id: string;
}

const useMapbox = (initialPoint: Coords) => {

    // Referencia al DIV del mapa
    const mapDiv = useRef<HTMLDivElement | null>();
    // useCallback memoriza la función
    const setRef = useCallback(node => {
        mapDiv.current = node;
    }, []);

    const map = useRef<Map>();
    const [coords, setCoords] = useState<Coords>(initialPoint);

    // Referencia a los marcadores
    const markers = useRef<any>({});

    // Observables de Rxjs
    const moveMarker = useRef<Subject<unknown>>(new Subject());
    const newMarker = useRef<Subject<unknown>>(new Subject());    

    const addMarker = useCallback((event) => {

        const { lng, lat } = event.lngLat;
        const marker = new Marker() as CustomMarker;
        marker.id = uuid();
        marker.setLngLat([lng, lat]);
        marker.addTo(map.current as Map);
        marker.setDraggable(true);

        markers.current[marker.id] = marker;

        newMarker.current.next({
            id: marker.id,
            lng,
            lat
        });

        // Escuchar movimientos del marker
        marker.on('drag', (event: any) => {
            
            const { id } = event?.target;
            const { lng, lat } = event?.target.getLngLat();

            moveMarker.current.next({
                id,
                lng,
                lat
            })

        });

    }, []);

    useEffect(() => {
        
        map.current = new mapboxgl.Map({
            container: mapDiv.current || '',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ Number(initialPoint.lng), Number(initialPoint.lat) ],
            zoom: Number(initialPoint.zoom)
        });

    }, [initialPoint]);

    // Cuando se mueve el mapa
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

    // Agrega marcadores cuando se hace clic
    useEffect(() => {
        
        map.current?.on('click', addMarker);

    }, [addMarker]);

    return {
        coords,
        setRef,
        markers,
        addMarker,
        newMarker$: newMarker.current,
        moveMarker$: moveMarker.current
    }
}

export default useMapbox;