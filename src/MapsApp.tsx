import React, { FC } from 'react';
import MapPage from './pages/MapPage';
import { SocketProvider } from './context/SocketContext';

const MapsApp: FC = () => {
    return (
        <SocketProvider>
            <MapPage />
        </SocketProvider>
    )
};

export default MapsApp;