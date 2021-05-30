import classes from "./NewWorksheetDetails.module.css";
import * as React from "react";
import { Input, Select, Button, Box } from "@chakra-ui/core";
import axios from "axios";
import { IoIosArrowUp } from "react-icons/io";

const NewWorksheetDetails = ({
  closeHandler,
  selectedFolder,
  setWorksheetNames,
  worksheetNames,
  newlyCreatedWorksheet,
  setNewlyCreatedWorksheet,
}) => {
  const [worksheetName, setWorksheetName] = React.useState("");
  const [panelNumber, setPanelNumber] = React.useState();
  const [mainImageUrl, setMainImageUrl] = React.useState("");
  const [panelImageUrl, setPanelImageUrl] = React.useState("");
  const [mainImage, setMainImage] = React.useState([]);

  const newWorksheetHandler = async () => {
    // let startingMessage = "Creating New Worksheet...";
    // if (activeWorksheet) {
    //   startingMessage = "Applying changes...";
    // }
    // setTimedMessage({ message: startingMessage, showing: true });
    console.log("updating/creating worksheet");

    const formData = new FormData();
    formData.append("worksheetName", worksheetName);
    formData.append("panelNumber", panelNumber);
    formData.append("mainImageUrl", mainImageUrl);
    formData.append("panelImageUrl", panelImageUrl);
    formData.append("mainImage", mainImage[0]);
    if (selectedFolder.id) {
      formData.append("parent", selectedFolder.id);
    }
    try {
      const result = await axios("/worksheet", {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);
      closeHandler();
      //   setTimedMessage({ message: "New Worksheet Created :)", showing: true });
      //   setTimeout(() => setTimedMessage({ message: "", showing: false }), 1500);
      // openWorksheetHandler(resData.worksheet._id);
      const updatedWorksheetNames = [...worksheetNames];
      updatedWorksheetNames.push(result.data.newWorksheetName);
      setNewlyCreatedWorksheet({
        worksheetName: result.data.newWorksheetName.worksheetName,
        id: result.data.newWorksheetName._id,
        parent: result.data.newWorksheetName.parent,
      });
      setWorksheetNames(updatedWorksheetNames);
    } catch (err) {
      console.log(err);
    }
  };

  let mainImageUrlInputIsDisabled = false;

  if (mainImage.length > 0) {
    mainImageUrlInputIsDisabled = true;
  }

  let mainImageInputIsDisabled = false;

  if (mainImageUrl !== "") {
    mainImageInputIsDisabled = true;
  }

  return (
    <div className={classes.NewWorksheetDetailsBox}>
      <div className={classes.InputContainer}>
        <Input
          className={classes.Input}
          variant="outline"
          type="text"
          name="worksheet-name"
          placeholder="Worksheet Name"
          value={worksheetName}
          onChange={(event) => setWorksheetName(event.target.value)}
        />
      </div>
      <div className={classes.InputContainer}>
        <Select
          className={classes.Input}
          variant="outline"
          name="panel-number"
          placeholder="Number of Panels/questions"
          value={panelNumber}
          onChange={(event) => setPanelNumber(+event.target.value)}
        >
          <option value="4">4 panels/questions</option>
          <option value="9">9 panels/questions</option>
          <option value="16">16 panels/questions</option>
          <option value="25">25 panels/questions</option>
          <option value="36">36 panels/questions</option>
          <option value="49">49 panels/questions</option>
          <option value="64">64 panels/questions</option>
          <option value="81">81 panels/questions</option>
          <option value="100">100 panels/questions</option>
          <option value="121">121 panels/questions</option>
        </Select>
      </div>
      <div className={classes.MainImageContainer}>
        <div className={classes.InputContainer}>
          <Input
            className={classes.Input}
            isDisabled={mainImageUrlInputIsDisabled}
            variant="outline"
            type="text"
            name="main-image-url"
            placeholder="Main Image Url"
            value={mainImageUrl}
            onChange={(event) => setMainImageUrl(event.target.value)}
          />
        </div>
        <h4 style={{ fontWeight: "bolder", margin: "10px auto" }}>Or</h4>
        <div className={classes.InputContainer}>
          <Input
            className={classes.Input}
            variant="outline"
            type="file"
            onChange={(event) => setMainImage(event.target.files)}
            isDisabled={mainImageInputIsDisabled}
          />
        </div>
      </div>
      <div className={classes.mainImageContainer}>
        <div className={classes.InputContainer}>
          <Input
            className={classes.Input}
            name="panel-image-url"
            placeholder="Panel Image Url"
            value={panelImageUrl}
            onChange={(event) => setPanelImageUrl(event.target.value)}
          />
        </div>
      </div>
      <div className={classes.ButtonBox}>
        <Box className={classes.ButtonBox}>
          <IoIosArrowUp className={classes.ArrowUp} />
          <Button width="150px" onClick={newWorksheetHandler}>
            Create Worksheet
          </Button>
          <IoIosArrowUp className={classes.ArrowUp} />
        </Box>
      </div>
    </div>
  );
};

export default NewWorksheetDetails;
