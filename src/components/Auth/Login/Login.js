import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/core';

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Button variant='ghost' onClick={() => loginWithRedirect()} >Login/Signup</Button>
        </>
    )
}

export default Login;