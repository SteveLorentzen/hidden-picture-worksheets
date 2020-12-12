import classes from "./NewWorksheet.module.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Heading, Input, Select, Button } from "@chakra-ui/core";

const NewWorksheet = ({
  setTimedMessage,
  closeModalHandler,
  activeWorksheet,
  openWorksheetHandler,
}) => {
  const [worksheetName, setWorksheetName] = useState("");
  const [panelNumber, setPanelNumber] = useState();
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [panelImageUrl, setPanelImageUrl] = useState("");
  const [mainImage, setMainImage] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (activeWorksheet) {
      setWorksheetName(activeWorksheet.worksheetName);
      setMainImageUrl(activeWorksheet.mainImageUrl);
      setPanelImageUrl(activeWorksheet.panelImageUrl);
    }
  }, [activeWorksheet]);

  const editWorksheetHandler = async () => {
    let startingMessage = "Creating New Worksheet...";
    if (activeWorksheet) {
      startingMessage = "Applying changes...";
    }
    setTimedMessage({ message: startingMessage, showing: true });
    console.log("updating/creating worksheet");
    let url = "http://localhost:8080/worksheet";
    let method = "POST";
    if (activeWorksheet) {
      method = "PUT";
      url = "http://localhost:8080/worksheet/" + activeWorksheet.worksheetId;
    }
    const formData = new FormData();
    formData.append("worksheetName", worksheetName);
    formData.append("panelNumber", panelNumber);
    formData.append("mainImageUrl", mainImageUrl);
    formData.append("panelImageUrl", panelImageUrl);
    formData.append("mainImage", mainImage[0]);
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();
      console.log(resData);
      closeModalHandler();
      let message = "New Worksheet Created :)";
      if (activeWorksheet) {
        message = "Changes saved :)";
      }
      setTimedMessage({ message, showing: true });
      setTimeout(() => setTimedMessage({ message: "", showing: false }), 1500);
      // openWorksheetHandler(resData.worksheet._id);
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
    <>
      <Box textAlign="center" w="100%">
        {!activeWorksheet ? (
          <Heading
            as="h3"
            size="lg"
            marginBottom="15px"
            className={classes.Title}
          >
            New Worksheet
          </Heading>
        ) : (
          <Heading
            as="h3"
            size="lg"
            marginBottom="15px"
            className={classes.Title}
          >
            Worksheet Settings
          </Heading>
        )}
      </Box>
      <hr />

      <div className={classes.InputContainer}>
        <label className={classes.Label} htmlFor="worksheet-name">
          Worksheet Name:
        </label>
        <Input
          variant="flushed"
          type="text"
          name="worksheet-name"
          placeholder="Worksheet Name"
          value={worksheetName}
          onChange={(event) => setWorksheetName(event.target.value)}
        />
      </div>
      {!activeWorksheet ? (
        <div className={classes.InputContainer}>
          <label className={classes.Label} htmlFor="panel-number">
            Number of Panels:
          </label>
          <Select
            variant="flushed"
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
      ) : (
        <div className={classes.InputContainer}>
          <label className={classes.Label} htmlFor="panel-number">
            Number of Panels:
          </label>
          <Select
            variant="flushed"
            isDisabled
            name="panel-number"
            placeholder={`${activeWorksheet.panelNumber} panels/questions`}
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
      )}

      <div className={classes.mainImageContainer}>
        <div className={classes.InputContainer}>
          <label
            className={
              mainImageUrlInputIsDisabled
                ? classes.DisabledLabel
                : classes.Label
            }
            htmlFor="main-image-url"
          >
            Main Image Url:
          </label>
          <Input
            isDisabled={mainImageUrlInputIsDisabled}
            variant="flushed"
            type="text"
            name="main-image-url"
            placeholder="Main Image Url"
            value={mainImageUrl}
            onChange={(event) => setMainImageUrl(event.target.value)}
          />
        </div>
        <h4
          style={{ color: "teal", fontWeight: "bolder", margin: "10px auto" }}
        >
          Or
        </h4>
        <div className={classes.InputContainer}>
          <Input
            variant="flushed"
            type="file"
            onChange={(event) => setMainImage(event.target.files)}
            isDisabled={mainImageInputIsDisabled}
          />
        </div>
        <p>
          <strong>(Either option is available when inputs are empty)</strong>
        </p>
      </div>

      <div className={classes.mainImageContainer}>
        <div className={classes.InputContainer}>
          <label className={classes.Label} htmlFor="panel-image-url">
            Panel Image Url:
          </label>
          <Input
            variant="flushed"
            type="text"
            name="panel-image-url"
            placeholder="Panel Image Url"
            value={panelImageUrl}
            onChange={(event) => setPanelImageUrl(event.target.value)}
          />
        </div>
      </div>
      <div className={classes.ButtonBox}>
        <Button
          margin="auto"
          variant="ghost"
          width="150px"
          onClick={closeModalHandler}
        >
          cancel
        </Button>
        <Button
          margin="auto"
          variant="outline"
          variantColor="teal"
          width="150px"
          onClick={editWorksheetHandler}
        >
          {!activeWorksheet ? "Create Worksheet" : "Update Worksheet"}
        </Button>
      </div>
    </>
  );
};

export default NewWorksheet;
