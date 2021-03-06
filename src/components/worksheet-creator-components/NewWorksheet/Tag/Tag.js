import * as React from "react";
import classes from "./Tag.module.css";

const Tag = ({ deleteTagHandler, tag }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <span
      className={classes.Tag}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={classes.TagEnd}>
        <p
          className={hovered ? classes.DeleteTagX : null}
          onClick={() => deleteTagHandler(tag)}
        >
          {hovered ? "x" : ""}
        </p>
      </div>
      <p>{tag}</p>
      <div className={classes.TagEnd}></div>
    </span>
  );
};

export default Tag;
