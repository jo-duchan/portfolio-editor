import React, { useState } from "react";
import styled from "styled-components";

// Components
import Viewer from "components/edit/Viewer";

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
