import React from "react";
import styled from "styled-components";

// Type
import { ContentList } from "type/contentDataType";

interface Props {
  data: ContentList;
}

function Home({ data }: Props) {
  return <Container>Home : {data[0].id}</Container>;
}

export default Home;

const Container = styled.div``;
