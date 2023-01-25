import { Box, Card, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Colors } from "../../Constants";
import { BsNewspaper } from "react-icons/bs";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <Box h="100vh" w="100vw" bg={Colors.DARK4} p="10">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="60">
          <Link to="/admin/exam">
            <Card
              display={"flex"}
              h="100%"
              flex="1"
              justifyContent={"center"}
              alignItems="center"
              bg="red.500"
              _hover={{ bg: "red.700" }}
            >
              <BsNewspaper size={70} color={Colors.LIGHT_WHITE} />
              <Text
                fontWeight={"bold"}
                fontSize="28"
                color={Colors.LIGHT_WHITE}
              >
                EXAM
              </Text>
              <Text color={Colors.DARK3}>Create Exam | Upload Question</Text>
            </Card>
          </Link>
        </GridItem>
        <GridItem w="100%" h="60">
          <Link to="/admin/candidate">
            <Card
              display={"flex"}
              h="100%"
              flex="1"
              justifyContent={"center"}
              alignItems="center"
              bg="blue.500"
              _hover={{ bg: "blue.700" }}
            >
              <BsNewspaper size={70} color={Colors.LIGHT_WHITE} />
              <Text
                fontWeight={"bold"}
                fontSize="28"
                color={Colors.LIGHT_WHITE}
              >
                CANDIDATE
              </Text>
              <Text color={Colors.DARK3}>Enroll Candidate | Admit card</Text>
            </Card>
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminHome;
