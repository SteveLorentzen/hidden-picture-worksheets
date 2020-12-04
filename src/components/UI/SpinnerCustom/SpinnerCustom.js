import React from 'react';
import { Spinner } from '@chakra-ui/core';

const SpinnerCustom = () => {
    return (
        <div style={{ textAlign: 'center', padding: '250px 0' }}>
            <Spinner size='xl' color='tomato' thickness='5px' />
        </div>
    )
}

export default SpinnerCustom;