import React from 'react';
// import { useHistory } from 'react-router-dom';
import Login from '../../components/Auth/Login/Login';
import Logout from '../../components/Auth/Logout/Logout';
import { useAuth0 } from '@auth0/auth0-react'

const Auth = () => {

    const { isAuthenticated } = useAuth0();

    return (
        <>
            <h3>Welcome to </h3>
            <h1>HiddenPictureWorkSheets.com!</h1>
            {isAuthenticated ? <Logout /> : <Login />}
        </>
    )
}

export default Auth;