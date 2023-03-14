import React, { useEffect, useState } from "react";
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
  const [isSelect, setIsSelect] = useState<string>("");

  const onCreateHandler = (createData: ContentItem) => {
    const copyData = data;
    const selectIndex = copyData.findIndex((item) => item.id === isSelect);
    const startPoint = isSelect ? selectIndex + 1 : copyData.length;
    copyData.splice(startPoint, 0, createData);
    setIsSelect(createData.id);
    setContentData(copyData);
  };

  const onSetIdHandler = (id: string) => {
    setIsSelect(id);
  };

  useEffect(() => {
    const clearIdHandler = () => setIsSelect("");

    window.addEventListener("click", clearIdHandler);

    return () => {
      window.removeEventListener("click", clearIdHandler);
    };
  }, []);

  return (
    <Container>
      <Viewer>
        {data.map((item) => (
          <Assign
            key={item.id}
            data={item}
            onSetIdHandler={onSetIdHandler}
            isFocus={item.id === isSelect}
          />
        ))}
      </Viewer>
      <Editor
        data={data}
        isSelect={isSelect}
        onCreateHandler={onCreateHandler}
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
