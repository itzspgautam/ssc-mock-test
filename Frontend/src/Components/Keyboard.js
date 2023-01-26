import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Colors } from "../Constants";

const VirtualKeyboard = ({ setInput, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChange = (input) => {
    setInput(input);
  };

  // const onKeyPress = (button) => {
  //   console.log("Button pressed", button);
  // };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        {/* <ModalOverlay /> */}
        <ModalContent
          bg={Colors.DARK2}
          position={"fixed"}
          right={{ lg: "50px" }}
          bottom={["0px", "0px", "30px"]}
        >
          <ModalHeader p="1">Keyboard</ModalHeader>
          <ModalCloseButton />
          <Keyboard onChange={(e) => onChange(e)} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default VirtualKeyboard;
