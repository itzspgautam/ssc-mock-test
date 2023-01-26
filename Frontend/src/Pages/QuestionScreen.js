import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Colors, MyTimer } from "../Constants";
import { FaInfoCircle } from "react-icons/fa";
import { QuestionBadge, VersionFooter } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { QuestionAction } from "../State/Actions";
import { useNavigate } from "react-router-dom";

const QuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, answers, activeQuestion, isSubmit } = useSelector(
    (state) => state.Quiz
  );
  const { assignCandidate, logSystem } = useSelector((state) => state.System);

  const [lang, setLang] = useState("english");
  const [selectOption, setSelectOption] = useState(null);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * assignCandidate?.exam?.duration);

  const saveAndNext = async () => {
    const nextQuestionIndex =
      activeQuestion.index === questions.length - 1
        ? 0
        : activeQuestion.index + 1;

    const nextQuestionId =
      nextQuestionIndex === questions.length
        ? questions[0]._id
        : questions[nextQuestionIndex]._id;

    const nextQuestionAnswer =
      nextQuestionIndex === questions.length
        ? answers[0].answer
        : answers[nextQuestionIndex].answer;

    const activeQuestionIndex = activeQuestion.index;
    const activeQuestionId = activeQuestion.question;
    const activeQuestionStatus = selectOption ? "answered" : "not_answered";

    await dispatch(
      QuestionAction.setAnswer(
        activeQuestionIndex,
        activeQuestionId,
        selectOption,
        activeQuestionStatus
      )
    );
    dispatch(
      QuestionAction.setActiveQuestion(nextQuestionId, nextQuestionIndex)
    );

    setSelectOption(nextQuestionAnswer);
  };

  const markAndReview = async () => {
    const nextQuestionIndex =
      activeQuestion.index === questions.length - 1
        ? 0
        : activeQuestion.index + 1;

    const nextQuestionId =
      nextQuestionIndex === questions.length
        ? questions[0]._id
        : questions[nextQuestionIndex]._id;

    const nextQuestionAnswer =
      nextQuestionIndex === questions.length
        ? answers[0].answer
        : answers[nextQuestionIndex].answer;

    const activeQuestionIndex = activeQuestion.index;
    const activeQuestionId = activeQuestion.question;

    const activeQuestionStatus = selectOption ? "review_answered" : "review";

    await dispatch(
      QuestionAction.setAnswer(
        activeQuestionIndex,
        activeQuestionId,
        selectOption,
        activeQuestionStatus
      )
    );
    dispatch(
      QuestionAction.setActiveQuestion(nextQuestionId, nextQuestionIndex)
    );
    setSelectOption(nextQuestionAnswer);
  };

  const badgeClickHandle = (index, answered) => {
    const clickedQuestionIndex = index;
    const clickedQuestionId = answered.question;
    const selectedOption = answered.answer ? answered.answer : null;

    setSelectOption(selectedOption);

    dispatch(
      QuestionAction.setActiveQuestion(clickedQuestionId, clickedQuestionIndex)
    );

    // setSelectOption(answer.answer);

    // setSelectedQuestion({
    //   i: i,
    //   question: answer.questions,
    //   answer: answer.answer,
    //   status: answer.status,
    // });
  };

  const submitHandle = async () => {
    await dispatch(
      QuestionAction.submitAnswer(
        assignCandidate?.exam?._id,
        assignCandidate?._id,
        answers
      )
    );
  };

  useEffect(() => {
    if (questions) return;
    dispatch(QuestionAction.getQuestion(assignCandidate?.exam?._id));
  }, [assignCandidate, questions, dispatch]);

  useEffect(() => {
    if (isSubmit) {
      navigate("/submit");
    }
  }, [isSubmit, navigate]);

  useEffect(() => {
    if (!logSystem) {
      navigate("/");
    }
  }, [logSystem, navigate]);

  return (
    <Grid
      templateAreas={[
        `"header header" 
                  "user user"
                  "question question"
                  "info info"
                  "footer footer"`,
        `"header header" "user user"
                  "question question"
                  "info info"
                  "footer footer"`,
        `"header header"
                  "question user"
                  "question info"
                  "footer footer"`,
      ]}
      gridTemplateRows={"30px  1fr "}
      gridTemplateColumns={["100vw 1fr", "70vw 1fr", "80vw 1fr"]}
      h="100vh"
      color="blackAlpha.700"
      fontFamily={"arial"}
      fontWeight="medium"
    >
      <GridItem
        px="2"
        bg={Colors.DARK_BLACK2}
        area={"header"}
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Text color={Colors.TEXT_YELLOW} fontSize={14}>
          {assignCandidate?.exam?.title}
        </Text>
        <Text
          color={Colors.LIGHT_WHITE}
          fontSize={14}
          display="flex"
          alignItems={"center"}
          gap="1"
        >
          <FaInfoCircle color={Colors.BUTTON_SECONDARY} size={18} /> View
          Instructions
        </Text>
      </GridItem>

      <GridItem area={"question"} pb={["10", "0", "0"]}>
        <Flex
          p="2"
          fontFamily={"arial"}
          fontSize={14}
          color={Colors.DARK_BLACK}
          fontWeight="bold"
          display={"flex"}
          justifyContent="space-between"
        >
          <Text>Question Type: MCQ</Text>
          <MyTimer expiryTimestamp={time} submitHandle={submitHandle} />
        </Flex>

        <Flex
          p="2"
          bg={Colors.BUTTON_SECONDARY}
          gap={2}
          justifyContent="flex-end"
          alignItems={"center"}
        >
          <Text color={Colors.LIGHT_WHITE} fontFamily={"arial"} fontSize={12}>
            View in
          </Text>
          <Select
            borderRadius={0}
            bgColor={Colors.LIGHT_WHITE}
            width={100}
            size="sm"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </Select>
        </Flex>
        <Flex flexDir={"column"}>
          <Box h={{ lg: "490" }} overflowY={"auto"}>
            {questions?.map((ques, i) => (
              <Box key={ques._id}>
                {ques._id === activeQuestion.question && (
                  <Box
                    p="1"
                    h={["350", "350", "480"]}
                    borderBottom={"1px solid"}
                    borderColor={Colors.DARK3}
                  >
                    <Text
                      border={"1px solid"}
                      p="1"
                      borderColor={Colors.DARK2}
                      color={Colors.DARK_BLACK}
                      fontWeight="bold"
                      fontFamily={"arial"}
                      fontSize={14}
                    >
                      Question No: {i + 1}
                    </Text>

                    <Box px="4" pt="2">
                      <Text
                        pt="2"
                        color={Colors.DARK_BLACK}
                        fontFamily={"arial"}
                        fontSize={14}
                      >
                        {lang === "english"
                          ? ques.title.english
                          : ques.title.hindi}

                        {/* {lang === "english" ? q.title.english : q.title.hindi} */}
                      </Text>

                      <RadioGroup
                        display={"flex"}
                        flexDir={"column"}
                        gap="3"
                        mt="4"
                        value={selectOption}
                        onChange={(e) => setSelectOption(e)}
                      >
                        {ques.options.map((o) => (
                          <Radio value={o._id} key={o._id}>
                            {o.option}.{"  "}
                            {lang === "english" ? o.english : o.hindi}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDir={["column-reverse", "column-reverse", "row"]}
            gap="4"
            p="4"
          >
            <Flex gap={2}>
              <Button
                w="100%"
                variant="outline"
                colorScheme={"gray"}
                fontFamily={"arial"}
                fontWeight="regular"
                borderRadius="2"
                color={Colors.DARK_BLACK}
                _hover={{
                  bgColor: Colors.BUTTON_SECONDARY,
                  color: Colors.LIGHT_WHITE,
                }}
                onClick={() => markAndReview()}
              >
                Mark for Review & Next
              </Button>
              <Button
                w="100%"
                variant="outline"
                colorScheme={"gray"}
                fontFamily={"arial"}
                fontWeight="regular"
                borderRadius="2"
                color={Colors.DARK_BLACK}
                _hover={{
                  bgColor: Colors.BUTTON_SECONDARY,
                  color: Colors.LIGHT_WHITE,
                }}
                onClick={() => setSelectOption("")}
              >
                Clear Response
              </Button>
            </Flex>
            <Button
              w="100%"
              colorScheme={"blue"}
              fontFamily={"arial"}
              fontWeight="regular"
              borderRadius="2"
              color={Colors.LIGHT_WHITE}
              _hover={{
                bgColor: Colors.BUTTON_SECONDARY,
                color: Colors.LIGHT_WHITE,
              }}
              onClick={() => saveAndNext()}
            >
              Save & Next
            </Button>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem
        pl="2"
        area={"user"}
        display="flex"
        alignItems="center"
        border={"1px solid grey"}
        borderBottom="0px"
        h="100"
      >
        <Flex gap={2}>
          <Image
            src={assignCandidate?.avatar}
            border="1px solid"
            borderColor={Colors.DARK3}
            height="90px"
          />
          <Text
            color={Colors.DARK_BLACK}
            fontWeight={"bold"}
            fontFamily="arial"
            fontSize={"20"}
          >
            {assignCandidate?.name}
          </Text>
        </Flex>
      </GridItem>

      <GridItem area={"info"} border="1px solid grey">
        <Box p="2">
          <Grid templateColumns="repeat(2, 1fr)" gap={1}>
            <GridItem display={"flex"} gap="1">
              <QuestionBadge.Answered
                title={
                  answers?.filter(function (q) {
                    return q.status === "answered";
                  }).length
                }
              />
              <Text color={Colors.DARK_BLACK} fontSize={13} fontFamily="arial">
                Answered
              </Text>
            </GridItem>
            <GridItem display={"flex"} gap="1">
              <QuestionBadge.NotAnswered
                title={
                  answers?.filter(function (q) {
                    return q.status === "not_answered";
                  }).length
                }
              />
              <Text color={Colors.DARK_BLACK} fontSize={13} fontFamily="arial">
                Not Answered
              </Text>
            </GridItem>

            <GridItem display={"flex"} gap="1">
              <QuestionBadge.NotVisited
                title={
                  answers?.filter(function (q) {
                    return q.status === "not_visited";
                  }).length
                }
              />
              <Text color={Colors.DARK_BLACK} fontSize={13} fontFamily="arial">
                Not Visited
              </Text>
            </GridItem>

            <GridItem display={"flex"} gap="1">
              <QuestionBadge.Review
                title={
                  answers?.filter(function (q) {
                    return q.status === "review";
                  }).length
                }
              />
              <Text
                flex="1"
                color={Colors.DARK_BLACK}
                fontSize={13}
                fontFamily="arial"
              >
                Marked for Review
              </Text>
            </GridItem>
            <GridItem colSpan={2} display={"flex"} gap="1">
              <QuestionBadge.ReviewAnswered
                title={
                  answers?.filter(function (q) {
                    return q.status === "review_answered";
                  }).length
                }
              />
              <Text
                flex="1"
                color={Colors.DARK_BLACK}
                fontSize={13}
                fontFamily="arial"
              >
                Answered & Marked for Review (will be concidered for evaluation)
              </Text>
            </GridItem>
          </Grid>
        </Box>
        <Box p="1" bgColor={Colors.BUTTON_SECONDARY}>
          <Text color={Colors.LIGHT_WHITE} fontWeight="bold">
            Questions
          </Text>
        </Box>
        <Flex flexDir="column">
          <Box height={{ md: "280", lg: "280" }} overflowY="auto">
            <Grid templateColumns="repeat(5, 1fr)" gap={0} mt="2" px="2">
              {answers?.map((q, i) => (
                <GridItem key={i}>
                  {q.status === "answered" ? (
                    <Box onClick={() => badgeClickHandle(i, q)}>
                      <QuestionBadge.Answered title={i + 1} />
                    </Box>
                  ) : q.status === "not_answered" ? (
                    <Box onClick={() => badgeClickHandle(i, q)}>
                      <QuestionBadge.NotAnswered title={i + 1} />
                    </Box>
                  ) : q.status === "review" ? (
                    <Box onClick={() => badgeClickHandle(i, q)}>
                      <QuestionBadge.Review title={i + 1} />
                    </Box>
                  ) : q.status === "review_answered" ? (
                    <Box onClick={() => badgeClickHandle(i, q)}>
                      <QuestionBadge.Answered title={i + 1} />
                    </Box>
                  ) : (
                    <Box onClick={() => badgeClickHandle(i, q)}>
                      <QuestionBadge.NotVisited title={i + 1} />
                    </Box>
                  )}
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Box p="3" justifyContent={"center"} alignItems="center">
            <Button
              w="100%"
              size={"md"}
              borderRadius={2}
              colorScheme={"blue"}
              onClick={() => {
                if (window.confirm("Are you sure to submit answers?")) {
                  submitHandle();
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Flex>
      </GridItem>

      <GridItem area={"footer"}>
        <VersionFooter />
      </GridItem>
    </Grid>
  );
};

export default QuestionScreen;
