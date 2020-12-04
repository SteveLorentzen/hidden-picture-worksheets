import React from 'react';
import { Button } from '@chakra-ui/core'

const MyButton = ({ children, clicked }) => {
    return (
        <Button
            onClick={clicked}
            minWidth='175px'
            margin='10px'
            variantColor='teal'
            variant='outline'>
            {children}
        </Button>
    )
}

export default MyButton