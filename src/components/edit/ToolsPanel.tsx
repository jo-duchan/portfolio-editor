import React from "react";
import styled from "styled-components";

// Components
import Creator from "components/edit/Creator";
import Editor from "components/edit/Editor";

function ToolsPanel() {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Creator />
      <Editor />
    </Container>
  );
}

export default ToolsPanel;

const Container = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 200px;
  height: fit-content;
`;
