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
  const [isSelect, setIsSelect] = useState<string>("");
  const [selectItem, setSelectItem] = useState<ContentItem | null>(null);

  const onCreateHandler = (createData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex((item) => item.id === isSelect);
    const startPoint = isSelect ? selectIndex + 1 : copyData.length;
    copyData.splice(startPoint, 0, createData);
    setIsSelect(createData.id);
    setContentData(copyData);
  };

  const onUpdateHandler = (updateData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex((item) => item.id === isSelect);
    copyData[selectIndex] = updateData;
    setContentData(copyData);
    console.log("update:", data);
  };

  const onSetIdHandler = (id: string, item: ContentItem) => {
    setIsSelect(id);
    setSelectItem(item);
  };

  useEffect(() => {
    if (viewRef.current) {
      const clearIdHandler = () => setIsSelect("");
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
            isFocus={item.id === isSelect}
            onUpdateHandler={onUpdateHandler}
          />
        ))}
      </Viewer>
      <Editor
        data={data}
        isSelect={isSelect}
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
