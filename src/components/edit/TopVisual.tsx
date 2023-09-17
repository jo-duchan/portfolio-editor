import React from "react";
import styled from "styled-components";
import IconSet from "components/ui/IconSet";
import ColorSystem from "styles/color-system";
import { TitleSizePC, TextSizePC } from "styles/typography";
import { TopVisual } from "type/portfolio";

type Data = {
  topVisual: TopVisual;
};

interface Props {
  data: TopVisual;
}

function TopVisualElement({ data }: Props) {
  const { title, description, topic, assets } = data;
  console.log("data", data, data.title);
  if (!assets || !topic) {
    return <>Not Found Top Visual Data</>;
  }

  return (
    <Container>
      <Content>
        <LogoSection>
          <img className="client" src={assets.clientLogo.file} alt="client" />
          <IconSet type="WACKY" />
        </LogoSection>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Topic>
          {topic.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Topic>
      </Content>
      <Background src={assets.CoverPC.file} alt="이미지" />
    </Container>
  );
}

export default TopVisualElement;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  max-height: 1080px;
  background: ${ColorSystem.Neutral[100]};
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 100;
`;

const Background = styled.img`
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  object-fit: cover;
  z-index: 0;
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 150px;
  padding-inline: 292px;
  box-sizing: border-box;

  & :is(img, svg) {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
`;
const Title = styled.div`
  margin-top: 150px;
  ${TitleSizePC("XL")}
`;
const Description = styled.div`
  margin-top: 56px;
  ${TextSizePC("XL")}
  white-space: break-spaces;
`;
const Topic = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 200px;
  margin-bottom: auto;
  & span {
    ${TextSizePC("M")}
  }
`;
