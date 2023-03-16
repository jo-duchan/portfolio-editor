import React, { useEffect } from "react";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import useContentAction from "context/useContentAction";

function Editor() {
  // const setData = useContentAction();
  // const data = useContentValue();

  // useEffect(() => {
  //   console.log("data", data);
  //   setData([
  //     {
  //       id: "0",
  //       sort: "TITLE",
  //       content: {
  //         text: "dd",
  //         url: "",
  //       },
  //       option: {
  //         size: "X",
  //         margin: "XL",
  //         aline: "CENTER",
  //       },
  //     },
  //   ]);
  // }, []);
  // console.log("data", data);
  return <Container>Editor</Container>;
}

export default Editor;

const Container = styled.div`
  padding: 10px;
  color: #fff;
`;
