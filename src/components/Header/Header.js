import React from "react";
import { Box, Heading, Image } from "@chakra-ui/core";
import { NavLink, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import classes from "./Header.module.css";
import Login from "../Auth/Login/Login";
import { IoIosAddCircle, IoIosMenu } from "react-icons/io";
import { IconContext } from "react-icons";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import CustomDrawer from "../UI/Drawer/Drawer";

const Header = ({
  children,
  openNewWorksheetModal,
  isHeaderForWelcomePage,
  isHeaderForJoinPage,
  isHeaderForWorksheetsPage,
  drawerIsOpen,
  setDrawerIsOpen,
  setDrawerIsClosed,
}) => {
  const { isAuthenticated, user, logout } = useAuth0();

  const openNewWorksheetModalHandler = () => {
    setDrawerIsClosed();
    openNewWorksheetModal(true);
  };

  return (
    <Box className={classes.Header}>
      <Box padding="10px" w="100%" bg="tomato">
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
              {isAuthenticated && isHeaderForWorksheetsPage ? (
                <>
                  <IconContext.Provider
                    value={{ size: "3em", className: `${classes.Icons}` }}
                  >
                    <IoIosMenu
                      className={classes.MenuButton}
                      onClick={() => setDrawerIsOpen(true)}
                    />
                  </IconContext.Provider>
                  <CustomDrawer
                    drawerIsOpen={drawerIsOpen}
                    setDrawerIsOpen={setDrawerIsOpen}
                    setDrawerIsClosed={setDrawerIsClosed}
                  >
                    <Heading as="h3" size="xl" marginTop="15px">
                      Worksheets
                    </Heading>
                    <Button
                      margin="15px 0"
                      variant="outline"
                      onClick={openNewWorksheetModalHandler}
                    >
                      <IconContext.Provider value={{ size: "1.5rem" }}>
                        <IoIosAddCircle className={classes.NewWorksheetIcon} />
                      </IconContext.Provider>
                      New Worksheet
                    </Button>
                    <Box className={classes.WorksheetNameBox}>
                      <Box>{children}</Box>
                      <Button
                        variant="outline"
                        mr={3}
                        bottom="10px"
                        onClick={setDrawerIsClosed}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </CustomDrawer>
                </>
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
              <ul className={classes.NavLinks}>
                {isHeaderForWelcomePage || isHeaderForJoinPage ? (
                  <li className={classes.NavLink}>
                    <NavLink to="/join" activeClassName={classes.ActiveNavLink}>
                      Join With Code
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li className={classes.NavLink}>
                      <NavLink
                        to="/"
                        exact
                        activeClassName={classes.ActiveNavLink}
                      >
                        Worksheets
                      </NavLink>
                    </li>
                    <li className={classes.NavLink}>
                      <NavLink
                        activeClassName={classes.ActiveNavLink}
                        exact
                        to="/classrooms"
                      >
                        Classrooms
                      </NavLink>
                    </li>
                    <li className={classes.NavLink}>
                      <NavLink
                        activeClassName={classes.ActiveNavLink}
                        exact
                        to="/assignments"
                      >
                        Assignments
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

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
    </Box>
  );
};

export default Header;
