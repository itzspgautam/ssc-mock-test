import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VersionFooter } from "../Components";
import { Colors, Images } from "../Constants";
import { QuestionAction } from "../State/Actions";

const InstructionScreen = () => {
  const dispatch = useDispatch();
  const { assignCandidate } = useSelector((state) => state.System);
  const [insLang, setInsLang] = useState("english");

  useEffect(() => {
    if (assignCandidate) {
      dispatch(QuestionAction.getQuestion(assignCandidate?.exam?._id));
    }
  }, [assignCandidate, dispatch]);

  return (
    <Grid
      templateAreas={[
        `"header header"
                  "body body"
                  "user user"
                  "footer footer"`,
        `"header header"
                  "body body"
                  "user user"
                  "footer footer"`,
        `"header header"
                  "body user"
                  "footer footer"`,
      ]}
      gridTemplateRows={"50px 1fr"}
      h="100vh"
    >
      <GridItem bg={Colors.BLUE_PRIMARY} area={"header"} />

      <GridItem area={"body"}>
        <Flex h="full" flexDir="column" justifyContent={"flex-start"}>
          <Box p={2} bgColor={Colors.BLUE_SECONDARY}>
            <Text
              fontSize={20}
              fontFamily="arial"
              fontWeight={"bold"}
              color={Colors.DARK1}
            >
              Instruction
            </Text>
          </Box>
          <Box height={"65vh"} overflowY={"auto"} px="10" py="5">
            <Flex gap={2} justifyContent="flex-end" alignItems={"center"}>
              <Text fontFamily={"arial"} fontSize={14}>
                View in
              </Text>
              <Select
                borderRadius={4}
                width={100}
                size="sm"
                onChange={(e) => setInsLang(e.target.value)}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </Select>
            </Flex>
            <Image
              src={
                insLang === "english"
                  ? Images.INSTRUCTION_ENGLISH
                  : insLang === "hindi"
                  ? Images.INSTRUCTION_HINDI
                  : ""
              }
            />
          </Box>
          <Flex
            px="4"
            py="3"
            justifyContent={"space-between"}
            borderTop="1px"
            borderTopColor={Colors.DARK2}
            flexDir={["column", "column", "row"]}
            gap="2"
          >
            <Box w="100%">
              <Flex gap={2} alignItems={"center"}>
                <Text fontFamily={"arial"} fontSize={12}>
                  Choose your default language :
                </Text>
                <Select
                  borderRadius={4}
                  width={100}
                  size="sm"
                  onChange={(e) => setInsLang(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </Select>
              </Flex>
              <Text
                fontFamily={"arial"}
                fontSize={12}
                color={Colors.DANGER_DARK}
              >
                Please note all questions will appear in your default language.
                This language can be changed for a particular question later on.
              </Text>
              <Checkbox defaultChecked>
                <Text fontSize={12}>
                  {insLang === "hindi"
                    ? "मैं निर्देश पढ़ लिया है और समझ लिया है। मुझे आवंटित किए गए सभी कंप्यूटर हार्डवेयर उचित कार्यशील स्थिति में हैं। मैं घोषणा करता / करती हूं कि मैं मोबाइल फोन, ब्लूटूथ डिवाइस आदि जैसे किसी प्रतिबंधित मोबाइल गैजेट को नहीं पहनने / न रखने / परीक्षा हॉल में मेरे साथ कोई निषिद्ध सामग्री नहीं ले रहा हूं। मैं मानता हूं कि निर्देशों का पालन न करने के मामले में, मैं इस टेस्ट और / या अनुशासनात्मक कार्यवाही से वंचित होने के लिए उत्तरदायी होगा, जिसमें भावी टेस्ट / परीक्षाओं से प्रतिबंध शामिल हो सकता है।"
                    : insLang === "english"
                    ? "I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall.I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action which may include ban from future Tests / Examinations"
                    : null}
                </Text>
              </Checkbox>
            </Box>
            <Link to="/test">
              <Button
                w="100%"
                borderRadius={2}
                rightIcon={">"}
                colorScheme="gray"
                variant="outline"
                _hover={{
                  bgColor: Colors.BUTTON_SECONDARY,
                  color: Colors.LIGHT_WHITE,
                }}
              >
                I am ready to begin
              </Button>
            </Link>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem area={"user"}>
        <Flex justifyContent={"center"} p="8">
          <Image src={assignCandidate?.avatar} h="200" w="150" />
        </Flex>
      </GridItem>
      <GridItem area={"footer"}>
        <VersionFooter />
      </GridItem>
    </Grid>
  );
};

export default InstructionScreen;
