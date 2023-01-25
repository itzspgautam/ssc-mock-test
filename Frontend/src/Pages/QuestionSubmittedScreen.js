import {
  Box,
  Card,
  CardHeader,
  Center,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { QuestionBadge } from "../Components";

const QuestionSubmittedScreen = () => {
  const { answers } = useSelector((state) => state.Quiz);
  return (
    <Center h="100vh">
      <Card w={"50vw"} overflow="hidden">
        <CardHeader bg="whatsapp.600" textAlign={"center"}>
          <Text fontSize={"23"} fontWeight="bold" color="white">
            Answeres submitted successfully!
          </Text>
        </CardHeader>

        <Grid templateColumns="repeat(2, 1fr)" gap={6} p="4" mt="4">
          <GridItem w="100%" display="flex" alignItems={"center"} gap="2">
            <QuestionBadge.answered
              title={
                answers?.filter(function (q) {
                  return q.status === "answered";
                }).length
              }
            />
            <Text fontWeight={"bold"} color={"green"}>
              Answered
            </Text>
          </GridItem>

          <GridItem w="100%" display="flex" alignItems={"center"} gap="2">
            <QuestionBadge.notAnswered
              title={
                answers?.filter(function (q) {
                  return q.status === "not_answered";
                }).length
              }
            />
            <Text fontWeight={"bold"} color={"red"}>
              Not Answered
            </Text>
          </GridItem>

          <GridItem w="100%" display="flex" alignItems={"center"} gap="2">
            <QuestionBadge.review
              title={
                answers?.filter(function (q) {
                  return q.status === "review";
                }).length
              }
            />
            <Text fontWeight={"bold"} color={"green"}>
              Reviewed
            </Text>
          </GridItem>

          <GridItem w="100%" display="flex" alignItems={"center"} gap="2">
            <QuestionBadge.not_visited
              title={
                answers?.filter(function (q) {
                  return q.status === "not_visited";
                }).length
              }
            />
            <Text fontWeight={"bold"} color={"green"}>
              Not Visited
            </Text>
          </GridItem>

          <GridItem w="100%" display="flex" alignItems={"center"} gap="2">
            <QuestionBadge.review_answered
              title={
                answers?.filter(function (q) {
                  return q.status === "review_answered";
                }).length
              }
            />
            <Text fontWeight={"bold"} color={"green"} flex="1">
              Answered and marked for review (Considered as answered)
            </Text>
          </GridItem>
        </Grid>
      </Card>
    </Center>
  );
};

export default QuestionSubmittedScreen;
