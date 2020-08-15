import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
    
        <Route 
            {...rest}
            render={() => {

        if (localStorage.getItem('auth-token')) {
            // console.log('auth token present')
            return <Component />;
         
        }
            // console.log('missing auth token')
            return <Redirect to='/' />
       
    }}
    />
    );
};

export default PrivateRoute;