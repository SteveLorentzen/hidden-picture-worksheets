import React from "react";
import classes from "./Drawer.module.css";
import Background from "../Background/Background";

const Drawer = ({ children, drawerIsOpen, setDrawerIsClosed }) => {
  let drawerClasses = [classes.Drawer].join(" ");
  if (drawerIsOpen) {
    drawerClasses = [classes.Drawer, classes.DrawerOpen].join(" ");
  }

  return (
    <>
      <div className={drawerClasses}>{children}</div>
      {drawerIsOpen ? (
        <Background closeModalHandler={setDrawerIsClosed} />
      ) : null}
    </>
  );
};

export default Drawer;
