import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { FaLaptop } from "react-icons/fa";
import AppRoutes from "./Routes";

function App() {
  return (
    <>
      <Center
        display={{ base: "none", md: "none", lg: "none" }}
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
      </Center>
      <Box display={{ base: "block", md: "block", lg: "block" }}>
        <AppRoutes />
      </Box>
    </>
  );
}

export default App;
