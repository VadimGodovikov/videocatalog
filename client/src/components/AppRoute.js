import React from 'react';
import {Redirect, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { publicRoutes } from '../routes';
import { MAIN_ROUTE } from '../utils/consts';

const AppRoute = () => {
    return (
        <Router>
            <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={MAIN_ROUTE}/>
            </Routes>
        </Router>
    )
}

export default AppRoute;