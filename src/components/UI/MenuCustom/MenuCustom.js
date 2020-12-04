import React from 'react';
import { Menu, MenuButton, MenuList, Button } from '@chakra-ui/core'

const MenuCustom = ({ menuName, menuItems }) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                variant='outline'
                variantColor='teal'
                margin='10px'
                _hover={{ bg: "gray.100" }}
                _expanded={{ bg: "red.200" }}
                rightIcon='chevron-down'>{menuName}</MenuButton>
            <MenuList style={{ zIndex: 400 }}>
                {menuItems}
            </MenuList>
        </Menu>
    )
}

export default MenuCustom;