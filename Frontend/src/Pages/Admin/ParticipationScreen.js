import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionBadge } from "../../Components";
import { CandidateAction } from "../../State/Actions";

const ParticipationScreen = () => {
  const dispatch = useDispatch();

  const [participation, setParticipation] = useState(null);
  const getParticipation = async () => {
    try {
      const token = await localStorage.getItem("admin_token");

      const { data } = await axios.post(
        "/api/v1/admin/participation",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setParticipation(data);
    } catch (error) {}
  };
  useEffect(() => {
    getParticipation();
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Candidate</Th> <Th>Registration</Th> <Th>Exam</Th>
              <Th>Submission Date</Th>
              <Th textAlign={"center"}>
                Attempts
                <br />
              </Th>
              <Th>Result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participation &&
              participation?.participation?.map((part) => (
                <Tr key={part._id}>
                  <Td>
                    <Center justifyContent={"flex-start"} gap="2">
                      <Avatar src={part.candidate.avatar} />
                      {part.candidate.name}
                    </Center>
                  </Td>
                  <Td>
                    <Badge colorScheme={"blue"}>{part.candidate.reg}</Badge>
                  </Td>
                  <Td fontSize={"sm"}>
                    {part.exam.title}-{" "}
                    {moment(part.exam.date).format("DD MMM, YYYY")}
                  </Td>
                  <Td>
                    {moment(part.createdDate).format("DD MMM, YYYY (h:m a)")}
                  </Td>

                  <Td style={{ transform: `scale(0.8)` }}>
                    <Flex justifyContent={"center"}>
                      <QuestionBadge.Answered
                        title={
                          part.answered.filter(
                            (ans) => ans.status === "answered"
                          ).length
                        }
                      />

                      <QuestionBadge.NotAnswered
                        title={
                          part.answered.filter(
                            (ans) => ans.status === "not_answered"
                          ).length
                        }
                      />

                      <QuestionBadge.ReviewAnswered
                        title={
                          part.answered.filter(
                            (ans) => ans.status === "review_answered"
                          ).length
                        }
                      />

                      <QuestionBadge.Review
                        title={
                          part.answered.filter((ans) => ans.status === "review")
                            .length
                        }
                      />
                      <QuestionBadge.NotVisited
                        title={
                          part.answered.filter(
                            (ans) => ans.status === "not_visited"
                          ).length
                        }
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Button size="sm" colorScheme={"green"} borderRadius="2">
                      View Result
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParticipationScreen;
