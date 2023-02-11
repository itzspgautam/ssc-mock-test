import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
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
import { Colors } from "../../Constants";
import moment from "moment";
import { FaCalendar, FaChevronLeft } from "react-icons/fa";
import { BsAlarm, BsNewspaper, BsThreeDotsVertical } from "react-icons/bs";
import { QuestionImport } from "../../Components";
import { useState } from "react";
import { SystemAction } from "../../State/Actions";
import axios from "axios";

const ExamScreen = () => {
  const dispatch = useDispatch();
  const { exams, error, newExam, newExamLoading } = useSelector(
    (state) => state.System
  );

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [question, setQuestion] = useState("");

  const [questionError, setQuestionError] = useState([]);

  const [activeQuestionSet, setActiveQuestionSet] = useState(null);
  const [activeTitle, setActiveTitle] = useState("");
  const [loading, setLoading] = useState(null);

  const [fullView, setFullView] = useState(false);

  const createExamHandle = () => {
    if (questionError.length > 0) {
      console.log(questionError);
      return;
    }
    dispatch(SystemAction.createExam(title, date, duration, question));
  };
  const viewQuestion = async (exam) => {
    setLoading(exam._id);
    setActiveTitle(exam.title + "- " + moment(exam.date).format("DD/MM/YYYY"));
    try {
      const token = await localStorage.getItem("admin_token");

      const { data } = await axios.post(
        "/api/v1/getquestionsAdmin",
        { exam: exam._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.questions);
      setActiveQuestionSet(data.questions);
      setLoading(null);
    } catch (error) {}
  };

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(5, 1fr)"]}
    >
      <GridItem
        bg="blue.500"
        colSpan={fullView ? 0 : 2}
        display={fullView ? "none" : "block"}
      >
        <Center h="100%" p="10">
          <Card w="100%">
            <CardHeader>
              <Heading textAlign={"center"} size="md">
                {newExamLoading ? "CREATING EXAM" : "CREATE EXAM"}
              </Heading>
            </CardHeader>
            <CardBody>
              {newExamLoading ? (
                <Center flexDir={"column"} gap="5">
                  <Spinner size={"xl"} />
                  <Box>{newExamLoading ? newExam?.status : ""}</Box>
                </Center>
              ) : (
                <Stack spacing={5}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BsNewspaper color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Exam Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BsAlarm color="gray.300" />}
                    />
                    <Input
                      type="number"
                      placeholder="Exam Duration (in minutes)"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaCalendar color="gray.300" />}
                    />
                    <Input
                      type="date"
                      placeholder="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </InputGroup>

                  <Box border="1px" borderColor={Colors.DARK2}>
                    Select question excel file
                    <QuestionImport
                      setQuestion={setQuestion}
                      setQuestionError={setQuestionError}
                    />
                    <a
                      href="https://res.cloudinary.com/dtpspzd66/raw/upload/v1674682413/Excel/Demo_Questions_igl9ix.xlsx"
                      download
                    >
                      <Text
                        p="1"
                        textAlign={"right"}
                        fontSize="13"
                        fontWeight={"bold"}
                        fontFamily="arial"
                        color={"blue.500"}
                        cursor="pointer"
                      >
                        Download Demo
                      </Text>
                    </a>
                  </Box>
                  <Box color={"red"} fontSize="14" fontWeight={"medium"}>
                    <Text>{error && error}</Text>
                    <Text>
                      {questionError?.map((e) => (
                        <>
                          {e}
                          <br />
                        </>
                      ))}
                    </Text>
                  </Box>
                  <Button
                    colorScheme={"teal"}
                    onClick={() => createExamHandle()}
                  >
                    Create Exam
                  </Button>
                </Stack>
              )}
            </CardBody>
          </Card>
        </Center>
      </GridItem>
      <GridItem bg={Colors.DARK4} colSpan={fullView ? 5 : 3}>
        <Box bg={Colors.LIGHT_WHITE} h="100vh" overflowY={"auto"}>
          <Flex
            justifyContent="space-between"
            bg="gray.100"
            p="4"
            fontWeight={"bold"}
            fontSize="18"
          >
            <Text> Exam List</Text>
            <Button
              size="sm"
              colorScheme={"blue"}
              borderRadius="2"
              onClick={() => setFullView(!fullView)}
            >
              {fullView ? "Side by Side" : "Full Screen"}
            </Button>
          </Flex>
          {!activeQuestionSet ? (
            <TableContainer>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>Sl</Th>
                    <Th>Exam</Th>
                    <Th>Date</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {exams &&
                    exams.map((e, i) => (
                      <Tr key={i}>
                        <Td>
                          {i + 1} - {e._id}
                        </Td>
                        <Td>{e.title}</Td>
                        <Td>{moment(e.date).format("DD MMM, YYYY")}</Td>
                        <Td isNumeric>
                          <Button
                            colorScheme={"blue"}
                            isLoading={loading === e._id ? true : false}
                            size="sm"
                            onClick={() => viewQuestion(e)}
                          >
                            View Questions
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Box>
              <Center
                p="4"
                bg="cyan.700"
                justifyContent={"space-between"}
                position="sticky"
                top={0}
                zIndex="2"
              >
                <FaChevronLeft
                  size={25}
                  color="white"
                  onClick={() => setActiveQuestionSet(null)}
                  cursor="pointer"
                  title="Go Back"
                />
                <Text fontSize={22} fontWeight="semibold" color="white">
                  {activeTitle}
                </Text>
                <BsThreeDotsVertical size="25" color="white" />
              </Center>
              <TableContainer>
                <Table variant="striped" colorScheme="cyan">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead>
                    <Tr>
                      <Th rowSpan={2}>Sl</Th>
                      <Th rowSpan={2}>Question</Th>
                      <Th colSpan={4} textAlign="center">
                        Options
                      </Th>
                      <Th rowSpan={2} isNumeric>
                        Answer
                      </Th>
                    </Tr>
                    <Tr>
                      <Th>A</Th>
                      <Th>B</Th>
                      <Th>C</Th>
                      <Th>D</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {activeQuestionSet &&
                      activeQuestionSet.map((q, i) => (
                        <Tr key={i}>
                          <Td>{i + 1}</Td>
                          <Td
                            fontSize="sm"
                            fontWeight={"medium"}
                            maxW="600px"
                            pr={5}
                            isTruncated
                          >
                            {q?.title?.english}
                            <br />
                            {q?.title?.hindi}
                          </Td>
                          <Td
                            fontSize="sm"
                            fontWeight={"medium"}
                            maxw="250px"
                            isTruncated
                          >
                            <Badge colorScheme={"red"}>A</Badge>{" "}
                            {q?.options[0]?.english}
                            <br />
                            {q?.options[0]?.hindi}
                          </Td>

                          <Td
                            fontSize="sm"
                            fontWeight={"medium"}
                            maxw="250px"
                            isTruncated
                          >
                            <Badge colorScheme={"red"}>B</Badge>{" "}
                            {q?.options[1]?.english}
                            <br />
                            {q?.options[1]?.hindi}
                          </Td>

                          <Td
                            fontSize="sm"
                            fontWeight={"medium"}
                            maxw="250px"
                            isTruncated
                          >
                            <Badge colorScheme={"red"}>C</Badge>{" "}
                            {q?.options[2]?.english}
                            <br />
                            {q?.options[2]?.hindi}
                          </Td>

                          <Td
                            fontSize="sm"
                            fontWeight={"medium"}
                            isTruncated
                            maxw="250px"
                          >
                            <Badge colorScheme={"red"}>D</Badge>{" "}
                            {q?.options[3]?.english}
                            <br />
                            {q?.options[3]?.hindi}
                          </Td>
                          <Td>
                            <Badge fontSize={18} p="2" colorScheme={"green"}>
                              {q.correctOption}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ExamScreen;
