import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FaCheckCircle, FaIdBadge, FaUser } from "react-icons/fa";
import { AdmitCard, AvatarUpdate } from "../../Components";
import { Colors, Images } from "../../Constants";
import { CandidateAction } from "../../State/Actions";
import { PDFDownloadLink } from "@react-pdf/renderer";
const CandidateScreen = () => {
  const dispatch = useDispatch();
  const { exams } = useSelector((state) => state.System);
  const { candidates } = useSelector((state) => state.Candidate);
  const { uploadedImage, uploadingImage, newCandidate, uploadError } =
    useSelector((state) => state.Candidate);

  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [dob, setDob] = useState("");
  const [selectExam, setSelectExam] = useState("");

  const registerHandle = () => {
    if (!uploadedImage) {
      alert("Please upload image");
      return;
    }
    //const reg = moment(new Date()).format("DDMMYYYYHHmmSS");
    dispatch(
      CandidateAction.createCandidate({
        name,
        birthdate: dob,
        exam: selectExam,
        avatar: uploadedImage.data.secure_url,
        reg,
      })
    );
  };

  const voidCurrentCandidate = () => {
    setDob("");
    setName("");
    setSelectExam("");
    dispatch(CandidateAction.voidCandidateOnState());
  };

  useEffect(() => {
    dispatch(CandidateAction.getCandidates());
  }, []);

  return (
    <Grid
      h="100vh"
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(5, 1fr)"]}
    >
      <GridItem colSpan={2} bg="blue.500">
        <Center h="100%" p="10">
          <Card w="100%">
            <CardHeader>
              <Heading textAlign={"center"} size="md">
                {newCandidate ? "REGISTERED" : "REGISTER CANDIDATE"}
              </Heading>
            </CardHeader>
            <CardBody>
              {newCandidate ? (
                <Center gap={5} flexDir="column">
                  <FaCheckCircle size="100" color="green" />
                  <Text>{newCandidate.name} is registered sucessfully</Text>
                  {/* <PDFViewer>
                <AdmitCard
                  data={newCandidate}
                  exam={exams?.filter(function (e) {
                    return e._id === selectExam;
                  })}
                />
              </PDFViewer> */}

                  <PDFDownloadLink
                    document={
                      <AdmitCard
                        data={newCandidate}
                        exam={exams?.filter(function (e) {
                          return e._id === selectExam;
                        })}
                      />
                    }
                    fileName={
                      newCandidate.name.replace(" ", "_") +
                      "_" +
                      newCandidate.reg +
                      ".pdf"
                    }
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading Admit card" : "Download now!"
                    }
                  </PDFDownloadLink>

                  <Button
                    colorScheme={"green"}
                    w="100%"
                    onClick={() => voidCurrentCandidate()}
                  >
                    Register New Candidate
                  </Button>
                </Center>
              ) : (
                <Stack spacing={5}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaUser color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Candidate Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaIdBadge color="gray.300" />}
                    />
                    <Input
                      type="number"
                      placeholder="Registration Number"
                      value={reg}
                      onChange={(e) => setReg(e.target.value)}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Badge colorScheme={"blue"}>DOB</Badge>}
                    />
                    <Input
                      type="date"
                      placeholder="DOB"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </InputGroup>
                  <Select
                    placeholder="Select Exam"
                    onChange={(e) => setSelectExam(e.target.value)}
                  >
                    {exams?.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.title} - {moment(e.date).format("DD/MM/YY")}
                      </option>
                    ))}
                  </Select>
                  <Center>
                    <AvatarUpdate>
                      <Flex flexDir={"column"} p="2" bg={Colors.DARK3}>
                        <Image
                          w="100"
                          h="120px"
                          src={
                            uploadedImage?.data?.secure_url
                              ? uploadedImage?.data?.secure_url
                              : Images.DEFAULT_AVATAR
                          }
                        />
                        <Text>Upload Image</Text>
                      </Flex>
                    </AvatarUpdate>
                  </Center>
                  <Text fontSize={14} color="red" fontWeight={"medium"}>
                    {uploadError && uploadError}
                  </Text>
                  <Button
                    isLoading={uploadingImage ? true : false}
                    colorScheme={"green"}
                    onClick={() => registerHandle()}
                  >
                    Register Candidate
                  </Button>
                </Stack>
              )}
            </CardBody>
          </Card>
        </Center>
      </GridItem>
      <GridItem colSpan={3} h="100vh" overflowY={"auto"}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Candidate</Th> <Th>Registration</Th> <Th>DOB</Th>
                <Th>Exam</Th>
                <Th isNumeric>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates &&
                candidates.candidates.map((can) => (
                  <Tr key={can._id}>
                    <Td>
                      <Center justifyContent={"flex-start"} gap="2">
                        <Avatar src={can.avatar} />
                        {can.name}
                      </Center>
                    </Td>
                    <Td>
                      <Badge colorScheme={"blue"}>{can.reg}</Badge>
                    </Td>
                    <Td>{moment(can.birthdate).format("DD/MM/YYYY")}</Td>
                    <Td>
                      {exams.filter((exam) => exam._id === can.exam)[0].title}
                    </Td>

                    <Td isNumeric>
                      {moment(
                        exams.filter((exam) => exam._id === can.exam)[0].date
                      ).format("DD/MM/YYYY")}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
    </Grid>
  );
};

export default CandidateScreen;
