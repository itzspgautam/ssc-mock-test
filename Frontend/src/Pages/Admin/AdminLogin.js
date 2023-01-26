import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Constants";
import { FaLock, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AdminAction } from "../../State/Actions";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.Admin);

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const adminLoginHandle = async () => {
    setLoading(true);
    await dispatch(AdminAction.adminLogin(id, password));
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      bg={Colors.DARK5}
    >
      <Card w={["90vw", "80vw", "40vw"]}>
        <CardHeader>
          <Heading textAlign={"center"} size="md">
            ADMIN LOGIN
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
                placeholder="Username"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="gray.300" />}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Text color={"red"} fontSize="14" fontWeight={"medium"}>
              {error && error}
            </Text>
            <Button colorScheme={"teal"} onClick={() => adminLoginHandle()}>
              Login
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AdminLogin;
