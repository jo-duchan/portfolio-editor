import React from "react";
import styled from "styled-components";

// Components
import Assign from "components/Assign";

// Type
import { ContentList } from "type/contentDataType";

interface Props {
  data: ContentList;
}

function Home({ data }: Props) {
  return (
    <Container>
      HOME List :
      {data.map((item) => (
        <Assign key={item.id} data={item} />
      ))}
    </Container>
  );
}

export default Home;

const Container = styled.div``;
