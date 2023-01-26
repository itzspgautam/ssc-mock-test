import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Colors } from "../Constants";
import { FaUser, FaSearch } from "react-icons/fa";
import { SystemAction } from "../State/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const AssignCandidateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignCandidate, logSystem } = useSelector((state) => state.System);

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);

  const [reg, setReg] = useState("");
  const [error, setError] = useState("");

  const fetchCandidate = async () => {
    setCandidate(null);
    setLoading(true);
    setError("");
    try {
      const candidateRes = await axios.get(
        "/api/v1/system/candidate?reg=" + reg
      );

      const isAlreadySubmitted = await axios.get(
        "/api/v1/answer/submition?reg=" + candidateRes.data.candidate._id
      );
      if (isAlreadySubmitted.data.submission) {
        setError("This user already submitted exam.");
        setLoading(false);
        return;
      }
      setCandidate(candidateRes.data.candidate);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const systemAssignHandle = async () => {
    setLoading(true);
    await dispatch(SystemAction.assignSystem(candidate));
    setLoading(false);
  };

  useEffect(() => {
    if (assignCandidate) navigate("/exam");
  }, [assignCandidate, navigate]);

  useEffect(() => {
    if (!logSystem) navigate("/");
  }, [logSystem, navigate]);

  return (
    <Box
      h="100vh"
      w="100vw"
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      bg={Colors.DARK5}
    >
      <Card w={["90vw", "80vw", "30vw"]} overflow={"hidden"}>
        <Box bg="teal.600" p="2">
          <Heading textAlign={"center"} color="white" size="lg">
            {logSystem?.name?.toUpperCase()}
          </Heading>
        </Box>
        <CardHeader>
          <Heading textAlign={"center"} size="md">
            ASSIGN CANDIDATE
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={5}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUser color="gray.300" />}
              />
              <Input
                type=""
                placeholder="Registration Number"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
              />
              <InputRightAddon
                cursor={"pointer"}
                onClick={() => fetchCandidate()}
                children={<FaSearch color="gray.300" />}
              />
            </InputGroup>
            <Text color={"red"} fontSize="14" fontWeight={"medium"}>
              {error ? error : " "}
            </Text>
            {candidate ? (
              <Flex gap={3} bgColor={Colors.DARK4} p="1">
                <Image src={candidate.avatar} height="100px" width="80px" />
                <Box>
                  <Text fontFamily={"arial"} fontSize={20}>
                    {candidate.name}
                  </Text>
                  <Text fontSize={12}>Reg. No: {candidate.reg}</Text>
                  <Text fontSize={12}>Exam: {candidate.exam.title}</Text>
                  <Text fontSize={12}>
                    Date: {moment(candidate.exam.date).format("DD/MM/YYYY")}
                  </Text>
                </Box>
              </Flex>
            ) : loading ? (
              <Skeleton h="100px" />
            ) : (
              ""
            )}

            <Button
              isDisabled={candidate ? false : true}
              isLoading={loading}
              colorScheme={"teal"}
              onClick={() => systemAssignHandle()}
            >
              Assign
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AssignCandidateScreen;
