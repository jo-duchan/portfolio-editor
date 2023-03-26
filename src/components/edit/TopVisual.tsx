import React from "react";
import styled from "styled-components";
import useTopVisualValue from "context/useTopVisualValue";

// Style
import ColorSystem from "styles/color-system";
import { TitleSizePC, TextSizePC } from "styles/typography";

// Type

function TopVisual() {
  const value = useTopVisualValue();

  return (
    <Container>
      <Content>
        <LogoSection></LogoSection>
        <Title>{value.title}</Title>
        <Description>{value.description}</Description>
        <Work>{value.work}</Work>
      </Content>
      <Background src={value.backgroundPC?.preview} alt="이미지" />
    </Container>
  );
}

export default TopVisual;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  max-width: 1920px;
  max-height: 1080px;
  background: ${ColorSystem.Neutral[100]};
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 100;
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: contain;
  z-index: 0;
`;

const LogoSection = styled.div`
  width: 100%;
  height: 30px;
  background: ${ColorSystem.Secondary[200]};
  margin-top: 150px;
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
const Work = styled.div`
  margin-top: 200px;
  ${TextSizePC("M")}
  margin-bottom: 266px;
  white-space: break-spaces;
`;
