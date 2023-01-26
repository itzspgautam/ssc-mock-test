import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
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
import { FaCalendar } from "react-icons/fa";
import { BsAlarm, BsNewspaper } from "react-icons/bs";
import { QuestionImport } from "../../Components";
import { useState } from "react";
import { SystemAction } from "../../State/Actions";

const ExamScreen = () => {
  const dispatch = useDispatch();
  const { exams, error, newExam, newExamLoading } = useSelector(
    (state) => state.System
  );

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [question, setQuestion] = useState("");

  const createExamHandle = () => {
    dispatch(SystemAction.createExam(title, date, duration, question));
  };

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
    >
      <GridItem bg="blue.500">
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
                    <QuestionImport setQuestion={setQuestion} />
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
                  <Text color={"red"} fontSize="14" fontWeight={"medium"}>
                    {error && error}
                  </Text>
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
      <GridItem bg={Colors.DARK4}>
        <Box bg={Colors.LIGHT_WHITE} h="100vh" overflowY={"auto"}>
          <TableContainer w={["100vw", "100vw", "50vw"]}>
            <Table variant="striped" colorScheme="red">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
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
                    <Tr>
                      <Td>{i + 1}</Td>
                      <Td>{e.title}</Td>
                      <Td>{moment(e.date).format("DD/MM/YYYY")}</Td>
                      <Td isNumeric>
                        <Button size="sm">View</Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ExamScreen;
