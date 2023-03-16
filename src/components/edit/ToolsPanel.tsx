import React from "react";
import styled from "styled-components";

// Components
import Creator from "components/edit/Creator";
import Editor from "components/edit/Editor";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

interface Props {
  data: ContentList;
  onCreateHandler: (createData: ContentItem) => void;
}

function ToolsPanel({ data, onCreateHandler }: Props) {
  return (
    <Container>
      <Creator onCreateHandler={onCreateHandler} />
      <Editor />
    </Container>
  );
}

export default ToolsPanel;

const Container = styled.div`
  margin-left: auto;
  width: 200px;
  height: 100vh;
  background: blue;
`;
