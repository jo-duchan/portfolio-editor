import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ColorSystem from "styles/color-system";
import { TitleSizePC } from "styles/typography";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import Button from "components/ui/Button";
import ImageInput from "components/create/ImageInput";
import TopicChips from "components/create/TopicChips";
import { Assets } from "type/portfolio";
import { nanoid } from "nanoid";
import { ref, update } from "firebase/database";
import { db } from "firebase-config";

function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string[]>([]);
  const [assets, setAssets] = useState<Assets>({} as Assets);

  const changeHandler = (value: string, label: string) => {
    if (label === "Title") {
      setTitle(value);
      return;
    }

    if (label === "Description") {
      setDescription(value);
      return;
    }
  };

  const cancelHandler = () => {
    setTitle("");
    setDescription("");
    setTopic([]);
    setAssets({} as Assets);
  };

  const submitHandler = async () => {
    if (title.trim() === "") {
      alert("Title을 작성해 주세요.");
      return;
    }

    if (description.trim() === "") {
      alert("Description을 작성해 주세요.");
      return;
    }

    if (topic.length === 0) {
      alert("Topic을 작성해 주세요.");
      return;
    }

    if (Object.keys(assets).find((key) => !assets[key].file)) {
      alert("Assets을 업로드해 주세요.");
      return;
    }

    const portfolioId = nanoid();
    const topVisual = {
      title,
      description,
      topic,
      assets,
    };
    console.log("Update:", topVisual);

    await update(ref(db, `/${portfolioId}`), {
      topVisual,
    })
      .then(() => {
        window.alert("프로젝트가 생성되었습니다.");
        navigate(`/edit/${portfolioId}`);
      })
      .catch((e) => {
        window.alert("프로젝트 생성에 실패했습니다.");
        console.log(e);
      });
  };
  return (
    <Container>
      <FrontEditor>
        <Title>포트폴리오 생성</Title>
        <Input
          label="Title"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={changeHandler}
        />
        <Textarea
          label="Description"
          placeholder="내용을 입력하세요."
          value={description}
          onChange={changeHandler}
        />
        <TopicChips value={topic} onUpdate={setTopic} />
        <ImageInput value={assets} onUpdate={setAssets} />
        <div className="button-wrapper">
          <Button
            label="Cancel"
            btnType="SECONDARY"
            size="MEDIUM"
            onClick={cancelHandler}
            fixedWidth
          />
          <Button
            label="Next"
            btnType="PRIMARY"
            size="MEDIUM"
            onClick={submitHandler}
            fixedWidth
          />
        </div>
      </FrontEditor>
    </Container>
  );
}

export default Create;

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
