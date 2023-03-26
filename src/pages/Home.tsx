import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useTopVisualValue from "context/useTopVisualValue";
import useTopVisualAction from "context/useTopVisualAction";

// Style
import ColorSystem from "styles/color-system";

// Type
import { Image } from "type/topVisual";

function Home() {
  const navigate = useNavigate();
  const value = useTopVisualValue();
  const action = useTopVisualAction();
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "title": {
        action((prev) => {
          return { ...prev, title: e.target.value };
        });
        break;
      }
      case "description": {
        action((prev) => {
          return { ...prev, description: e.target.value };
        });
        break;
      }
      case "work": {
        action((prev) => {
          return { ...prev, work: e.target.value };
        });
        break;
      }
    }
  };
  const onCreateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getFile = e.target.files;
    if (!getFile) return;
    const url = URL.createObjectURL(getFile[0]);
    const typeLength = getFile[0].type.length;
    const newImage = {
      file: getFile[0],
      preview: url,
      type: getFile[0].type.slice(6, typeLength),
    } as Image;
    action((prev) => {
      return { ...prev, backgroundPC: newImage };
    });
  };

  const onCancelHandler = () => {
    action({
      title: "",
      description: "",
      work: "",
      clientLogo: undefined,
      backgroundPC: undefined,
      backgroundMO: undefined,
    });
  };

  const onSubmitHandler = () => {
    console.log("TopVisual :", value);
    navigate("/edit");
  };
  return (
    <Container>
      <FrontEditor>
        <input
          type="text"
          name="title"
          value={value.title}
          onChange={onChangeHandler}
        />
        <textarea
          value={value.description}
          name="description"
          onChange={onChangeHandler}
        />
        <textarea value={value.work} name="work" onChange={onChangeHandler} />
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/webp"
          onChange={onCreateImage}
        />
        <button type="button" onClick={onCancelHandler}>
          Cancel
        </button>
        <button type="button" onClick={onSubmitHandler}>
          go
        </button>
      </FrontEditor>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${ColorSystem.Neutral[900]};
    opacity: 0.4;
  }
`;

const FrontEditor = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 400px;
  height: 400px;
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 30px;

  & input,
  textarea {
    margin: 0 20px;
    border: 1px solid #000;
    white-space: pre;
  }
`;
