import { Box } from "@chakra-ui/react";
import React from "react";
import { Colors, Images } from "../Constants";

const badgeStyle = {
  cursor: "pointer",
  float: "left",
  fonSize: "1.417em",
  fontWeight: "normal",
  height: "43px",
  lineHeight: " 42px",
  marginBottom: "10px",
  marginRight: "2px",
  textAlign: "center",
  width: "50px",
};

const Answered = ({ title }) => {
  return (
    <Box
      style={{ ...badgeStyle, color: Colors.LIGHT_WHITE }}
      backgroundImage={Images.BADGE}
      backgroundPosition="-4px -5px"
    >
      {title}
    </Box>
  );
};

const NotAnswered = ({ title }) => {
  return (
    <Box
      style={{
        ...badgeStyle,
        width: "49px",
        height: "43px",
        color: Colors.LIGHT_WHITE,
      }}
      backgroundImage={Images.BADGE}
      backgroundPosition="-57px -6px"
    >
      {title}
    </Box>
  );
};

const Review = ({ title }) => {
  return (
    <Box
      style={{
        ...badgeStyle,
        height: "50px",
        lineHeight: "50px",
        marginBottom: "3px",
        color: Colors.LIGHT_WHITE,
      }}
      backgroundImage={Images.BADGE}
      backgroundPosition="-108px -2px"
    >
      {title}
    </Box>
  );
};

const ReviewAnswered = ({ title }) => {
  return (
    <Box
      style={{
        ...badgeStyle,
        height: "53px",
        lineHeight: "51px",
        marginBottom: "0",
        marginRight: "5px",
        width: "49px",
        color: Colors.LIGHT_WHITE,
      }}
      backgroundImage={Images.BADGE}
      backgroundPosition="-66px -178px"
    >
      {title}
    </Box>
  );
};

const Visited = ({ title }) => {
  return (
    <Box
      style={{
        ...badgeStyle,
        height: "43px",
        lineHeight: "43px",
      }}
      backgroundImage={Images.BADGE}
      backgroundPosition="-208px -4px"
    >
      {title}
    </Box>
  );
};

const NotVisited = ({ title }) => {
  return (
    <Box
      style={{
        ...badgeStyle,
        color: "#474747",
        height: "43px",
        lineHeight: "43px",

        width: "49px",
      }}
      backgroundImage={Images.BADGE}
      backgroundPosition="-157px -4px"
    >
      {title}
    </Box>
  );
};

const QuestionBadge = {
  Answered,
  NotAnswered,
  Review,
  ReviewAnswered,
  Visited,
  NotVisited,
};

export default QuestionBadge;
