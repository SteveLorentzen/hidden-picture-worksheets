import * as React from "react";
import { Box } from "@chakra-ui/core";
import classes from "./Path.module.css";

const Path = ({ selectedFolder }) => {
  return (
    <Box className={classes.Path}>
      <span>{`Selected Path: `}</span>
      {selectedFolder && selectedFolder.path.length < 3 ? (
        <span>Root</span>
      ) : (
        <span>Root>...</span>
      )}
      {selectedFolder && selectedFolder.path.length < 3
        ? selectedFolder.path.map((parentFolder) => {
            return <span key={parentFolder.id}>{">" + parentFolder.name}</span>;
          })
        : selectedFolder && selectedFolder.path.length >= 3
        ? selectedFolder.path.slice(-2).map((parentFolder) => {
            return <span key={parentFolder.id}>{">" + parentFolder.name}</span>;
          })
        : null}
    </Box>
  );
};

export default Path;
