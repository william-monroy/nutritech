import { Row, Spacer, Text } from "@nextui-org/react";
import React from "react";

const Legend = ({ color, label, num }) => {
  const colorStyle = {
    backgroundColor: color,
    width: "20px",
    height: "20px",
    borderRadius: "5px",
  };
  return (
    <>
      <Row>
        <div style={colorStyle} />
        <Spacer x={0.3}/>
        <Text h2 color="gray" size={14}>
          {label}:
        </Text>
        <Spacer x={0.2} />
        <Text h1 size={16} css={{}}>
          {num}
        </Text>
      </Row>
    </>
  );
};

export default Legend;
