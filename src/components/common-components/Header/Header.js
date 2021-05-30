import React from "react";
import {Heading} from "@chakra-ui/core";
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import classes from "./Header.module.css";
import CustomDrawer from "../../UI/Drawer/Drawer";
import FileTree from "./FileTree/FileTree";
import Modal from "../../UI/Modal/Modal";
import NewWorksheet from "../../worksheet-creator-components/NewWorksheet/NewWorksheet";
import MenuButtonCustom from "./MenuButtonCustom/MenuButtonCustom";
import Nav from "./Nav/Nav";

const Header = ({
  isHeaderForWelcomePage,
  isHeaderForJoinPage,
  isHeaderForWorksheetsPage,
  openWorksheetHandler,
  setTimedMessage,
  activeWorksheet,
  setActiveWorksheet,
}) => {
  const [selectedFolder, setSelectedFolder] = React.useState({
    path: [],
    id: "",
  });

  const [modalIsOpen, setModalIsOpen] = React.useState({
    newWorksheet: false,
  });

  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  const {isAuthenticated} = useAuth0();

  const openNewWorksheetModalHandler = () => {
    setDrawerIsOpen(false);
    setModalIsOpen({...modalIsOpen, newWorksheet: true});
  };

  const openActiveWorksheetHandler = (id) => {
    setDrawerIsOpen(false);
    openWorksheetHandler(id);
  };

  return (
    <>
      <header className={classes.Header}>
        <div className={classes.MenuBox}>
          {isAuthenticated && isHeaderForWorksheetsPage ? (
            <>
              <MenuButtonCustom setDrawerIsOpen={setDrawerIsOpen} />
              <CustomDrawer
                drawerIsOpen={drawerIsOpen}
                setDrawerIsOpen={setDrawerIsOpen}
              >
                <FileTree
                  openNewWorksheetModalHandler={openNewWorksheetModalHandler}
                  setDrawerIsOpen={setDrawerIsOpen}
                  openActiveWorksheetHandler={openActiveWorksheetHandler}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  activeWorksheet={activeWorksheet}
                  setActiveWorksheet={setActiveWorksheet}
                  // worksheetNames={worksheetNames}
                  // setWorksheetNames={setWorksheetNames}
                  // folders={folders}
                  // setFolders={setFolders}
                  // worksheetMenuIsLoading={worksheetMenuIsLoading}
                />
              </CustomDrawer>
            </>
          ) : null}
          <Link to="/">
            <Heading as="h2" size="md" color="white" marginLeft="1rem">
              HiddenPictureWorksheets.com
            </Heading>
          </Link>
        </div>
        <Nav
          isHeaderForJoinPage={isHeaderForJoinPage}
          isHeaderForWelcomePage={isHeaderForWelcomePage}
        />
      </header>

      {modalIsOpen.newWorksheet ? (
        <Modal
          closeModalHandler={() =>
            setModalIsOpen({...modalIsOpen, newWorksheet: false})
          }
        >
          <NewWorksheet
            closeModalHandler={() =>
              setModalIsOpen({...modalIsOpen, newWorksheet: false})
            }
            setTimedMessage={setTimedMessage}
            selectedFolderId={selectedFolder.id}
            // setWorksheetNames={setWorksheetNames}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default Header;
