import React from "react";
import { Box, Image, Heading } from "@chakra-ui/core";
import { IoIosMore } from "react-icons/io";
import { IconContext } from "react-icons";
import classes from "./Student.module.css";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";

const Student = ({ name, email, profilePicture, removeHandler }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        border="1px solid black"
        borderRadius="5px"
        margin="5px auto"
      >
        <div>
          <Image h="50px" src={profilePicture} />
        </div>
        <Heading as="h2" size="md">
          {name}
        </Heading>
        <Box>{email}</Box>
        <Box textAlign="center" padding="0 10px">
          <Menu>
            <MenuButton>
              <IconContext.Provider
                value={{ size: "2em", className: `${classes.MoreButton}` }}
              >
                <IoIosMore />
              </IconContext.Provider>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={removeHandler}>Remove from Classroom</MenuItem>
              <MenuItem>Message Student</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Student;
