import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useTopVisualValue from "context/useTopVisualValue";
import useTopVisualAction from "context/useTopVisualAction";

// Style
import ColorSystem from "styles/color-system";
import { TitleSizePC } from "styles/typography";

// Components
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import Button from "components/ui/Button";
import ImageInput from "components/home/ImageInput";
import WorkChips from "components/home/WorkChips";

// Type
import { Image } from "type/topVisual";

function Home() {
  const navigate = useNavigate();
  const value = useTopVisualValue();
  const action = useTopVisualAction();
  const onChangeHandler = (value: string, label: string) => {
    switch (label) {
      case "Title": {
        action((prev) => {
          return { ...prev, title: value };
        });
        break;
      }
      case "Description": {
        action((prev) => {
          return { ...prev, description: value };
        });
        break;
      }
      // case "work": {
      //   action((prev) => {
      //     return { ...prev, work: e.target.value };
      //   });
      //   break;
      // }
    }
  };

  const onCancelHandler = () => {
    action({
      title: "",
      description: "",
      work: "",
      assets: {
        clientLogo: {
          label: "Client Logo",
        } as Image,
        visualPC: {
          label: "Visual PC",
        } as Image,
        visualMO: {
          label: "Visual MO",
        } as Image,
      },
    });
  };

  const onSubmitHandler = () => {
    console.log("TopVisual :", value);
    navigate("/edit");
  };
  return (
    <Container>
      <FrontEditor>
        <Title>포트폴리오 생성</Title>
        <Input
          label="Title"
          placeholder="제목을 입력하세요."
          value={value.title}
          onChange={onChangeHandler}
        />
        <Textarea
          label="Description"
          placeholder="내용을 입력하세요."
          value={value.description}
          onChange={onChangeHandler}
        />
        <WorkChips />
        <ImageInput />
        <div className="button-wrapper">
          <Button
            label="Cancel"
            btnType="SECONDARY"
            size="MEDIUM"
            onClick={onCancelHandler}
            fixedWidth
          />
          <Button
            label="Next"
            btnType="PRIMARY"
            size="MEDIUM"
            // states={currentItem ? "DEFAULT" : "DISABLED"}
            onClick={onSubmitHandler}
            fixedWidth
          />
        </div>
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

const Title = styled.h3`
  ${TitleSizePC("S")}
`;

const FrontEditor = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 600px;
  height: fit-content;
  border-radius: 6px;
  padding: 30px 20px;
  box-sizing: border-box;
  background: ${ColorSystem.Neutral[0]};
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 30px;

  & .button-wrapper {
    display: flex;
    gap: 10px;
  }
`;
