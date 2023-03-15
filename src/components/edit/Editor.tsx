import React from "react";
import styled from "styled-components";

// Components
import Creator from "components/edit/Creator";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

interface Props {
  data: ContentList;
  onCreateHandler: (createData: ContentItem) => void;
}

function Editor({ data, onCreateHandler }: Props) {
  return (
    <Container>
      <Creator onCreateHandler={onCreateHandler} />
      {data[0].option.size}
    </Container>
  );
}

export default Editor;

const Container = styled.div`
  margin-left: auto;
  width: 200px;
  height: 100vh;
  background: blue;
`;
