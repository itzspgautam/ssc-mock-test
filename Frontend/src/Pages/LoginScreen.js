import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Colors, Images } from "../Constants";
import { FaUser } from "react-icons/fa";
import { ImKeyboard } from "react-icons/im";
import { MdLock } from "react-icons/md";
import { QuestionImport, VersionFooter, VirtualKeyboard } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { QuestionAction } from "../State/Actions";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignCandidate, logSystem } = useSelector((state) => state.System);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCandidateLogin = async () => {
    if (!userName) {
      setError("Please enter registration number.");
      return;
    }
    if (!password || password.length !== 8) {
      setError("Please enter valid password");
      return;
    }

    let d = password.substring(0, 2);
    let m = password.substring(2, 4);
    let y = password.substring(4, 8);
    let PasswordToDate = d + "/" + m + "/" + y;
    if (parseInt(userName) !== assignCandidate?.candidate?.reg) {
      setError("Invalid registration number.");
      return;
    }
    let enteredPassword = moment(assignCandidate?.candidate?.birthdate).format(
      "DD/MM/YYYY"
    );

    if (PasswordToDate !== enteredPassword) {
      setError("Invalid Password.");
      return;
    }
    setError("");
    await localStorage.setItem(
      "assignCandidateToken",
      assignCandidate.candidate._id
    );
    await dispatch(
      QuestionAction.getQuestion(assignCandidate.candidate.exam._id)
    );
    navigate("/instruction");
  };

  useEffect(() => {
    if (localStorage.getItem("assignCandidate")) return;
    else navigate("/assign");
  }, [assignCandidate]);

  useEffect(() => {
    if (localStorage.getItem("assignCandidateToken")) navigate("/instruction");
  }, [assignCandidate]);

  return (
    <Grid
      justifyContent={"space-between"}
      display="flex"
      flexDir={"column"}
      height="100vh"
    >
      <GridItem>
        <Box bg={Colors.DARK1} display="flex" justifyContent={"space-between"}>
          <Box px="20px" py="2" height={"20vh"} flex={1}>
            <Text
              color={Colors.LIGHT_WHITE}
              fontSize="18px"
              fontFamily={"arial"}
            >
              Stystem Name :
            </Text>
            <Text
              color={Colors.TEXT_YELLOW}
              fontSize="44px"
              fontFamily={"arial"}
              lineHeight="1.1"
            >
              {logSystem?.name}
            </Text>
            <Text
              color={Colors.LIGHT_WHITE}
              fontSize="15px"
              fontFamily={"arial"}
              fontWeight="light"
            >
              Kindly get in touch with the invigilator if there are any
              discrepancies in the Name and Photograph displayed on the screen
              or if the photograph is not yours
            </Text>
          </Box>
          <Box display={"flex"}>
            <Box textAlign={"right"} px="4" py="2">
              <Text
                color={Colors.LIGHT_WHITE}
                fontSize="18px"
                fontFamily={"arial"}
              >
                Candidate Name :
              </Text>
              <Text
                color={Colors.TEXT_YELLOW}
                fontSize="34px"
                fontFamily={"arial"}
                lineHeight="1.1"
                overflow={"hidden"}
                textOverflow="ellipsis"
              >
                {assignCandidate?.candidate?.name}
              </Text>

              <Text
                color={Colors.LIGHT_WHITE}
                fontSize="18px"
                fontFamily={"arial"}
              >
                Subject :{" "}
                <span style={{ color: Colors.TEXT_YELLOW, fontSize: 14 }}>
                  Mock test
                </span>
              </Text>
            </Box>
            <Box
              h={"100%"}
              bgColor={"#FAFBFC"}
              justifyContent="center"
              alignItems={"center"}
              display="flex"
              width={130}
              borderBottom="1px solid"
            >
              <Image
                src={assignCandidate?.candidate?.avatar}
                h="101"
                w="94"
                border="1px solid"
              />
            </Box>
          </Box>
        </Box>
        <Box mt="40px" justifyContent={"center"} display="flex">
          <Card
            width={"370px"}
            p={0}
            borderRadius={"5px"}
            overflow="hidden"
            boxShadow={"none"}
            border="1px"
            borderColor={Colors.DARK3}
          >
            <CardHeader
              p="0"
              bgColor={Colors.DARK2}
              fontFamily="arial"
              color={Colors.DARK_BLACK}
              fontSize="14px"
              px="22px"
              py="8px"
              fontWeight="bold"
            >
              Login
            </CardHeader>
            <CardBody bgColor={Colors.DARK5}>
              <Stack spacing={4}>
                <InputGroup size="md">
                  <InputLeftAddon
                    borderLeftRadius={4}
                    bgColor={Colors.DARK4}
                    borderColor={Colors.DARK3}
                    children={<FaUser color={Colors.DARK1} size={20} />}
                  />
                  <Input
                    placeholder="Registration No"
                    type={"number"}
                    value={userName}
                    bgColor={"transparent"}
                    borderColor={Colors.DARK3}
                    // readOnly
                    onChange={(e) => setUserName(e.target.value)}
                    _focus={{ borderColor: Colors.DARK3 }}
                  />
                  <InputRightAddon
                    borderRightRadius={4}
                    borderLeft={"none"}
                    children={
                      <VirtualKeyboard setInput={setUserName}>
                        <ImKeyboard color={Colors.DARK1} size={20} />
                      </VirtualKeyboard>
                    }
                    bgColor={Colors.DARK4}
                    borderColor={Colors.DARK3}
                  />
                </InputGroup>

                <InputGroup size="md">
                  <InputLeftAddon
                    borderLeftRadius={4}
                    bgColor={Colors.DARK4}
                    borderColor={Colors.DARK3}
                    children={<MdLock color={Colors.DARK1} size={20} />}
                  />
                  <Input
                    placeholder="Password"
                    value={password}
                    bgColor={"transparent"}
                    borderColor={Colors.DARK3}
                    //readOnly
                    onChange={(e) => setPassword(e.target.value)}
                    _focus={{ borderColor: Colors.DARK3 }}
                  />
                  <InputRightAddon
                    borderRightRadius={4}
                    borderLeft={"none"}
                    children={
                      <VirtualKeyboard setInput={setPassword}>
                        <ImKeyboard color={Colors.DARK1} size={20} />
                      </VirtualKeyboard>
                    }
                    bgColor={Colors.DARK4}
                    borderColor={Colors.DARK3}
                  />
                </InputGroup>
              </Stack>
              <Text
                fontSize={12}
                fontFamily="arial"
                color={Colors.DANGER_DARK}
                fontWeight="bold"
                mt="2"
                px="1"
              >
                {<br />}
                {error}
              </Text>

              <Button
                mt="8"
                bgColor={Colors.BUTTON_PRIMARY}
                w="100%"
                borderRadius={4}
                fontFamily="arial"
                fontWeight={"light"}
                color={Colors.LIGHT_WHITE}
                _hover={{
                  backgroundColor: Colors.BUTTON_SECONDARY,
                }}
                onClick={() => handleCandidateLogin()}
              >
                Sign In
              </Button>
            </CardBody>
          </Card>
        </Box>
        <VirtualKeyboard />
      </GridItem>
      <GridItem>
        <QuestionImport />
        <VersionFooter />
      </GridItem>
    </Grid>
  );
};

export default LoginScreen;
