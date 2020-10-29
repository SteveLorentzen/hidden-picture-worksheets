import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
    const { logout } = useAuth0();
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiration');
    // localStorage.removeItem('userId');
    return <button onClick={() => logout()}>Logout</button>
}

export default Logout;