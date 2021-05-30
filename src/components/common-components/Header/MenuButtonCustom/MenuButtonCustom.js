import * as React from "react";
import classes from "./MenuButtonCustom.module.css";
import { IconContext } from "react-icons";
import { IoIosMenu } from "react-icons/io";

const MenuButton = ({ setDrawerIsOpen }) => {
  return (
    <IconContext.Provider
      value={{ size: "3em", className: `${classes.Icons}` }}
    >
      <IoIosMenu
        className={classes.MenuButton}
        onClick={() => setDrawerIsOpen(true)}
      />
    </IconContext.Provider>
  );
};

export default MenuButton;
