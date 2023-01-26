import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaLaptop } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./Routes";
import { SystemAction } from "./State/Actions";

function App() {
  const { appLoading } = useSelector((state) => state.System);
  const dispatch = useDispatch();
  const appStart = async () => {
    await dispatch(SystemAction.appStart());
  };

  useEffect(() => {
    appStart();
  }, []);

  return (
    <>
      {/* <Center
        display={{ base: "flex", md: "flex", lg: "none" }}
        h="100vh"
        justifyContent={"center"}
        alignItems="center"
        bg="red.100"
        flexDir={"column"}
      >
        <FaLaptop size={100} color={"#9B2C2C"} />
        <Text color={"red.700"} fontFamily="arial" fontWeight={"bold"}>
          UNSUPPORTED DEVICE
        </Text>
      </Center> */}
      <Box>
        {appLoading ? (
          <Center h="80vh">
            <Spinner
              size={"xl"}
              color={"teal"}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
            />
          </Center>
        ) : (
          <AppRoutes />
        )}
      </Box>
    </>
  );
}

export default App;
