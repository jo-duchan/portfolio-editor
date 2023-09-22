import React from "react";
import styled from "styled-components";
import IconSet from "components/ui/IconSet";
import ColorSystem from "styles/color-system";
import { TitlePC, TextPC } from "styles/typography";
import { TopVisual } from "type/portfolio";
import { MarginPC } from "styles/margin";

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
          <img className="client" src={assets.ClientLogo.file} alt="client" />
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
  max-height: 67.5rem;
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
  height: 1.875rem;
  margin-top: 9.375rem;
  padding-inline: 18.25rem;
  box-sizing: border-box;

  & :is(img, svg) {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
`;
const Title = styled.div`
  width: 100%;
  margin-top: 9.375rem;
  ${TitlePC["XL"]}
  padding-inline: ${MarginPC["S"]};
  box-sizing: border-box;
`;
const Description = styled.div`
  width: 100%;
  margin-top: 3.5rem;
  ${TextPC["XL"]}
  white-space: break-spaces;
  padding-inline: ${MarginPC["S"]};
  box-sizing: border-box;
`;
const Topic = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 12.5rem;
  margin-bottom: auto;
  & span {
    ${TextPC["M"]}
  }
`;
