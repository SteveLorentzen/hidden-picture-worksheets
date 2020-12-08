import React from "react";
import Header from "../../components/common-components/Header/Header";
import { Box, Heading, List, ListItem, Button, Image } from "@chakra-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import hiddenPictureDemo from "../../assets/hidden-picture-demo.png";

const Welcome = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Header isHeaderForWelcomePage={true} />
      <Box
        margin="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          as="h3"
          size="xl"
          margin="30px auto"
          minWidth="250px"
          maxWidth="600px"
        >
          A <strong style={{ color: "tomato" }}>free</strong> resource where
          teachers can make fun worksheets!
        </Heading>
        <Box width="60%" minWidth="625px" margin="0 0 20px 0">
          <Image src={hiddenPictureDemo} />
        </Box>

        <Box display="flex" margin="20px" justifyContent="center" w="60%">
          <Box
            width="40%"
            minWidth="205px"
            margin="0 20px 0 0 "
            display="flex"
            flexDirection="column"
          >
            <Heading
              style={{ color: "teal" }}
              color="teal"
              as="h4"
              size="md"
              marginBottom="15px"
            >
              Students answer questions to reveal a picture. Use any picture you
              want.
            </Heading>
            <p>
              Students can save work, and submit assignments online. Worksheets
              are graded automatically. When the assignment is due you receive a
              report about who completed it and how they did.
            </p>
          </Box>
          <Box
            w="55%"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            minWidth="390px"
            border="2px solid grey"
            boxShadow="2px 4px 8px #888888"
            borderRadius="5px"
            padding="10px"
          >
            <Heading margin="0 auto 0 auto" as="h4">
              We make it easy to:
            </Heading>
            <Box bg="teal" textAlign="left" padding="0 0 10px 15px">
              <List as="ul" styleType="disc">
                <ListItem color="grey" fontSize="1.2rem">
                  Share worksheets with other teachers
                </ListItem>
                <ListItem color="grey" fontSize="1.2rem">
                  Automatically generate math problems
                </ListItem>
                <ListItem color="grey" fontSize="1.2rem">
                  Get notifications when students finish
                </ListItem>
              </List>
            </Box>
            <Button
              w="40%"
              variant="outline"
              variantColor="teal"
              onClick={() => loginWithRedirect()}
            >
              Login/Signup
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Welcome;
