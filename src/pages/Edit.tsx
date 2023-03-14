import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Components
import Editor from "components/edit/Editor";
import Assign from "components/edit/Assign";

// Type
import { ContentList, ContentItem, ContentSort } from "type/contentDataType";

interface Props {
  data: ContentList;
  setContentData: React.Dispatch<React.SetStateAction<ContentList>>;
}

function Edit({ data, setContentData }: Props) {
  const [isSelect, setIsSelect] = useState<string>("");

  const onCreateHandler = (sort: ContentSort) => {
    // TEXT
    let dataId = Math.random().toString();
    const updateData: ContentItem = {
      id: dataId,
      sort: sort,
      content: {
        text: "Enter the content here.",
        url: "",
      },
      option: {
        size: "S",
        margin: "NONE",
        aline: "LEFT",
      },
    };

    if (!isSelect) {
      setContentData((prev) => {
        return [...prev, updateData];
      });
    } else {
      const updateArray = data;
      const selectIndex = updateArray.findIndex((item) => item.id === isSelect);
      updateArray.splice(selectIndex + 1, 0, updateData);
      setIsSelect(dataId);
      setContentData(updateArray);
    }
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
        {data.map((item, index) => (
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
