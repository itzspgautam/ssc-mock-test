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
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Colors } from "../Constants";
import { FaLock } from "react-icons/fa";
import { SystemAction } from "../State/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { systems, logSystem, error } = useSelector((state) => state.System);

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const systemLoginHandle = async () => {
    setLoading(true);
    await dispatch(SystemAction.systemLogin(id, password));
    setLoading(false);
  };

  useEffect(() => {
    if (logSystem) navigate("/assign");
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
      <Card w={["90vw", "80vw", "30vw"]}>
        <CardHeader>
          <Heading textAlign={"center"} size="md">
            SSC EXAM PORTAL
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack spacing={5}>
            <Select
              placeholder="Select System"
              onChange={(e) => setId(e.target.value)}
            >
              {systems?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </Select>

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
              {error ? error : " "}
            </Text>
            <Button
              isLoading={loading}
              colorScheme={"teal"}
              onClick={() => systemLoginHandle()}
            >
              Login
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default HomeScreen;
