import * as React from "react";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { Image, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import Login from "../../../Auth/Login/Login";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = ({ isHeaderForJoinPage, isHeaderForWelcomePage }) => {
  const { logout, isAuthenticated, user } = useAuth0();

  return (
    <nav className={classes.Nav}>
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
              <NavLink to="/" exact activeClassName={classes.ActiveNavLink}>
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
    </nav>
  );
};

export default Nav;
