import React from "react";
import { Box, Heading, Image, Button } from "@chakra-ui/core";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosArrowBack } from "react-icons/io";
import classes from "./StudentHeader.module.css";
import Login from "../Auth/Login/Login";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";

const StudentHeader = ({ isHeaderForStudentWorksheet }) => {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <Box padding="10px" w="100%" bg="tomato" className={classes.Header}>
      <header>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "30%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {isHeaderForStudentWorksheet ? (
              <Button variant="outline" display="flex">
                <IoIosArrowBack />
                <NavLink to="/">Back to Assignments</NavLink>
              </Button>
            ) : null}
          </div>

          <div>
            <Link to="/">
              <Heading as="h2" size="lg" color="white">
                HiddenPictureWorksheets.com
              </Heading>
            </Link>
          </div>

          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {isAuthenticated ? (
              <Menu>
                <MenuButton>
                  <Image src={user.picture} className={classes.Image} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Login />
            )}
          </div>
        </nav>
      </header>
    </Box>
  );
};

export default StudentHeader;
