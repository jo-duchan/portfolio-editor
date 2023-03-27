import React from "react";
import styled from "styled-components";
import useTopVisualValue from "context/useTopVisualValue";

// Components
import IconSet from "components/ui/IconSet";

// Style
import ColorSystem from "styles/color-system";
import { TitleSizePC, TextSizePC } from "styles/typography";

// Type

function TopVisual() {
  const value = useTopVisualValue();

  return (
    <Container>
      <Content>
        <LogoSection>
          <img
            className="client"
            src={value.assets.clientLogo?.preview}
            alt="client"
          />
          <IconSet type="WACKY" />
        </LogoSection>
        <Title>{value.title}</Title>
        <Description>{value.description}</Description>
        <Work>
          모션,
          <br /> 개발,
          <br /> 디자인
        </Work>
      </Content>
      <Background src={value.assets.visualPC?.preview} alt="이미지" />
    </Container>
  );
}

export default TopVisual;

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
  object-fit: contain;
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
    object-fit: contain;
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
const Work = styled.div`
  margin-top: 200px;
  ${TextSizePC("M")}
  margin-bottom: auto;
  white-space: break-spaces;
`;
