import React, { useEffect } from "react";
import styled from "styled-components";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { db } from "firebase-config";
import { Portfolio, ContentItem } from "type/portfolio";
import TopVisualElement from "components/common/TopVisual";
import IconSet from "components/ui/IconSet";
import TextElement from "components/common/TextElement";
import GapElement from "components/common/GapElement";
import ImageElement from "components/common/ImageElement";

function PreviewPage() {
  const data = useLoaderData() as Portfolio;
  const navigate = useNavigate();

  useEffect(() => {
    const setRem = () => {
      if (window.innerWidth > 800) {
        document.documentElement.style.fontSize = `${
          (window.innerWidth / 1920) * 100
        }%`;
      }
      if (window.innerWidth < 800) {
        document.documentElement.style.fontSize = `${
          (window.innerWidth / 360) * 100
        }%`;
      }
    };

    setRem();

    window.addEventListener("resize", setRem);

    return () => {
      window.removeEventListener("resize", setRem);
    };
  }, []);

  const renderElement = (item: ContentItem) => {
    switch (item.sort) {
      case "TITLE":
      case "TEXT": {
        return <TextElement data={item} children={item.content?.text} />;
      }
      case "IMG": {
        return <ImageElement data={item} />;
      }
      case "GAP": {
        return <GapElement data={item} />;
      }
      default:
        return <>not found contents</>;
    }
  };

  const goBackHandler = () => {
    navigate("..");
  };
  return (
    <Container>
      <BackBtn onClick={goBackHandler}>
        <IconSet type="ARROW_BACK" />
      </BackBtn>
      <TopVisualElement data={data.front} />
      {data.content.map((item) => (
        <div key={item.id}>{renderElement(item)}</div>
      ))}
    </Container>
  );
}

export default PreviewPage;

export async function loader({ params }: any) {
  const portfolioId = params.portfolioId;
  const dbRef = ref(db);
  const data = await get(child(dbRef, `${portfolioId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  return data;
}

const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
  /* width: clamp(1440px, 100%, 1920px); */
  margin-inline: auto;
`;

const BackBtn = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  user-select: none;
`;
