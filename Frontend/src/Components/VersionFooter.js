import React from "react";
import { Box } from "@chakra-ui/react";
import { Colors } from "../Constants";

const VersionFooter = () => {
  return (
    <Box
      p="0.5"
      bgColor={Colors.GREY1}
      fontSize={11}
      textAlign="center"
      fontFamily="arial"
      color={Colors.LIGHT_WHITE}
    >
      Version 17.05.21
    </Box>
  );
};

export default VersionFooter;
