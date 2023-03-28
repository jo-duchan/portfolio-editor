import React, { Dispatch } from "react";
import styled from "styled-components";

// Components
import Creator from "components/edit/Creator";
import Editor from "components/edit/Editor";

// Type
import { RootOption } from "type/rootOption";

interface Props {
  rootOption: RootOption;
  setRootOption: Dispatch<React.SetStateAction<RootOption>>;
}

function ToolsPanel({ rootOption, setRootOption }: Props) {
  return (
    <Container>
      <Creator />
      <Editor rootOption={rootOption} setRootOption={setRootOption} />
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
  width: 280px;
  height: fit-content;
  z-index: 100;
`;
