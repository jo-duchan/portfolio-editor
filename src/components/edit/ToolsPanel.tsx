import React, { Dispatch } from "react";
import styled from "styled-components";
import useContentAction from "context/useContentAction";

// Components
import Creator from "components/edit/Creator";
import Editor from "components/edit/Editor";

// Type
import { ContentItem } from "type/contentDataType";

interface Props {
  selectItem: ContentItem | null;
  setSelectItem: Dispatch<React.SetStateAction<ContentItem | null>>;
}

function ToolsPanel({ selectItem, setSelectItem }: Props) {
  const action = useContentAction();

  const onCreateHandler = (createData: ContentItem) => {
    setSelectItem(createData);
    if (!selectItem) return;
    action.create(createData, selectItem.id);
  };
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
