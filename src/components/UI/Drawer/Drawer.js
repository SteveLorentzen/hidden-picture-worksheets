import React from "react";
import classes from "./Drawer.module.css";
import Background from "../Background/Background";

const Drawer = ({ children, drawerIsOpen, setDrawerIsOpen }) => {
  let drawerClasses = [classes.Drawer].join(" ");
  if (drawerIsOpen) {
    drawerClasses = [classes.Drawer, classes.DrawerOpen].join(" ");
  }

  return (
    <>
      <div className={drawerClasses}>{children}</div>
      {drawerIsOpen ? (
        <Background closeModalHandler={() => setDrawerIsOpen(false)} />
      ) : null}
    </>
  );
};

export default Drawer;
