import React, { useState } from "react";
import styled from "styled-components";

// Components
import Assign from "components/edit/Assign";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

interface Props {
  data: ContentList;
}

function Home({ data }: Props) {
  return <Container>HOME</Container>;
}

export default Home;

const Container = styled.div``;
