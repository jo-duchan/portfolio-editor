import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Components
import Editor from "components/edit/Editor";
import Assign from "components/edit/Assign";

// Type
import { ContentList, ContentItem } from "type/contentDataType";

interface Props {
  data: ContentList;
  setContentData: React.Dispatch<React.SetStateAction<ContentList>>;
}

function Edit({ data, setContentData }: Props) {
  const viewRef = useRef<HTMLDivElement | null>(null);
  const [selectItem, setSelectItem] = useState<ContentItem | null>(null);

  const onCreateHandler = (createData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex(
      (item) => item.id === selectItem?.id
    );
    const startPoint = selectItem ? selectIndex + 1 : copyData.length;
    copyData.splice(startPoint, 0, createData);
    setSelectItem(createData);
    setContentData(copyData);
  };

  const onUpdateHandler = (updateData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex(
      (item) => item.id === selectItem?.id
    );
    copyData[selectIndex] = updateData;
    setContentData(copyData);
    console.log("update:", data);
  };

  const onSetIdHandler = (id: string, item: ContentItem) => {
    setSelectItem(item);
  };

  useEffect(() => {
    if (viewRef.current) {
      const clearIdHandler = () => setSelectItem(null);
      viewRef.current.addEventListener("click", clearIdHandler);
    }
  }, []);

  return (
    <Container>
      <Viewer ref={viewRef}>
        {data.map((item) => (
          <Assign
            key={item.id}
            data={item}
            onSetIdHandler={onSetIdHandler}
            isFocus={item.id === selectItem?.id}
            onUpdateHandler={onUpdateHandler}
          />
        ))}
      </Viewer>
      <Editor
        data={data}
        // isSelect={isSelect}
        onCreateHandler={onCreateHandler}
        // onUpdateHandler={onUpdateHandler}
      />
    </Container>
  );
}

export default Edit;

const Container = styled.div`
  display: flex;
`;

const Viewer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
