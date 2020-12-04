import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/core';

const Logout = () => {
    const { logout } = useAuth0();
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiration');
    // localStorage.removeItem('userId');
    return <Button variant='ghost' onClick={() => logout()}>Logout</Button>
}

export default Logout;