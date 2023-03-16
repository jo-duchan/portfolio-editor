import React from "react";
import styled from "styled-components";

// Components
import Creator from "components/edit/Creator";
import Editor from "components/edit/Editor";

function ToolsPanel() {
  return (
    <Container>
      <Creator />
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
