import React from "react";
import styled, { css } from "styled-components";
import IconSet from "components/ui/IconSet";
import ColorSystem from "styles/color-system";
import { TitlePC, TitleMO, TextPC, TextMO } from "styles/typography";
import { TopVisual } from "type/portfolio";
import { MarginPC, MarginMO } from "styles/margin";
import { GapPC, GapMO } from "styles/gap";
import { deviceWidth } from "styles/common";
import Media from "styles/Media";

interface Props {
  data: TopVisual;
}

interface StyledProps {
  type: "PC" | "MO";
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
      <Background type="PC" src={assets.CoverPC.file} alt="이미지" />
      <Background type="MO" src={assets.CoverMO.file} alt="이미지" />
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

  ${Media("L", { height: " 67.5rem" })}

  @media screen and (max-width: 1000px) {
    max-height: initial;
  }
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

const Background = styled.img<StyledProps>`
  position: relative;
  top: 0;
  left: 0;
  display: ${({ type }) => (type === "MO" ? "none" : "block")};
  width: 100%;
  min-height: 100vh;
  object-fit: cover;
  z-index: 0;

  @media screen and (max-width: ${deviceWidth}) {
    display: ${({ type }) => (type === "PC" ? "none" : "block")};
  }
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1.875rem;
  margin-top: ${GapPC["L"]};
  padding-inline: 18.25rem;
  box-sizing: border-box;

  & :is(img, svg) {
    width: auto;
    height: 100%;
    object-fit: contain;
  }

  @media screen and (max-width: ${deviceWidth}) {
    margin-top: ${GapMO["L"]};
    padding-inline: ${MarginMO["S"]};

    & img {
      height: 1.2rem;
    }

    & svg {
      height: 1rem;
    }
  }
`;
const Title = styled.div`
  width: 100%;
  margin-top: 9.375rem;
  ${TitlePC["XL"]}
  padding-inline: ${MarginPC["S"]};
  box-sizing: border-box;

  @media screen and (max-width: ${deviceWidth}) {
    margin-top: 6.375rem;
    ${TitleMO["XL"]}
    padding-inline: ${MarginMO["S"]};
  }
`;
const Description = styled.div`
  width: 100%;
  margin-top: 3.5rem;
  ${TextPC["XL"]}
  white-space: break-spaces;
  padding-inline: ${MarginPC["S"]};

  @media screen and (max-width: ${deviceWidth}) {
    margin-top: 1.5rem;
    ${TextMO["XL"]}
    padding-inline: ${MarginMO["S"]};
  }

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

  @media screen and (max-width: ${deviceWidth}) {
    margin-top: 7.5rem;
    & span {
      ${TextMO["M"]}
    }
  }
`;
