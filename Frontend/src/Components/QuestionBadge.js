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

const answered = ({ title }) => {
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

const notAnswered = ({ title }) => {
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

const review = ({ title }) => {
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

const review_answered = ({ title }) => {
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

const visited = ({ title }) => {
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

const not_visited = ({ title }) => {
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

export default {
  answered,
  notAnswered,
  review,
  review_answered,
  visited,
  not_visited,
};

// .question_area span.review_marked {
// 	background-position: -203px -49px;
//     height: 53px;
//     line-height: 50px;
//     margin-bottom: 0;
//   /*  margin-right: 5px;*/
//     width: 53px;
// }

// .question_area span.visited {
// 	    background-position: -208px -4px;
//     height: 43px;
//     line-height: 43px;
// }

// .question_area span.not_visited {
//  background-position: -157px -4px;
//     color: #474747;
//     height: 43px;
//     line-height: 43px;
// }
