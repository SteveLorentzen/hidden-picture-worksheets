import React from "react";
import {Box, Heading, Image} from "@chakra-ui/core";
import {Link, NavLink} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {IoIosArrowBack} from "react-icons/io";
import classes from "./StudentHeader.module.css";
import Login from "../../Auth/Login/Login";
import {Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/core";

const StudentHeader = ({isHeaderForStudentWorksheet}) => {
  const {isAuthenticated, user, logout} = useAuth0();

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
            <div>
              <Link to="/">
                <Heading as="h2" size="md" color="white">
                  HiddenPictureWorksheets.com
                </Heading>
              </Link>
            </div>
          </div>

          <div
            className={classes.Nav}
            style={
              isHeaderForStudentWorksheet
                ? {justifyContent: "space-between"}
                : {}
            }
          >
            {isAuthenticated ? (
              <>
                {isHeaderForStudentWorksheet ? (
                  <NavLink
                    className={classes.Back}
                    exact
                    to="/"
                    activeClassName={classes.ActiveNavLink}
                  >
                    <IoIosArrowBack />
                    Back To Assignments
                  </NavLink>
                ) : null}
                <Menu>
                  <MenuButton>
                    <Image src={user.picture} className={classes.Image} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
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
