import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes(props) {
    let auth = false;

    return (
        auth ? <Outlet /> : <Navigate to={'/'} replace />
    );
}

export default PrivateRoutes;