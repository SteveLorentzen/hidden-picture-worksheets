import React from "react";
import classes from "./ControlsToggle.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ControlsToggle = ({ controlsAreOpen, setControlsAreOpen }) => {
  return (
    <>
      {controlsAreOpen ? (
        <div className={classes.ControlsToggleBox}>
          <p
            className={classes.ControlsToggle}
            onClick={() => setControlsAreOpen(false)}
          >
            <IoIosArrowUp />
            Close Controls
            <IoIosArrowUp />
          </p>
        </div>
      ) : (
        <div className={classes.ControlsToggleBox}>
          <p
            className={classes.ControlsToggle}
            onClick={() => setControlsAreOpen(true)}
          >
            <IoIosArrowDown />
            Open Controls
            <IoIosArrowDown />
          </p>
        </div>
      )}
    </>
  );
};

export default ControlsToggle;
