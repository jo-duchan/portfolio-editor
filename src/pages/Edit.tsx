import React, { useEffect, useRef, useState } from "react";
import { json, useLoaderData } from "react-router-dom";
import { ref, child, get, update } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import useContentValue from "context/useContentValue";
import ColorSystem from "styles/color-system";
import TopVisualElement from "components/edit/TopVisual";
import Viewer from "components/edit/Viewer";
import Creator from "components/edit/Creator";
import Editor from "components/edit/Editor";
import { Root } from "type/option";
import { TopVisual, ContentList } from "type/portfolio";

interface StyledProps {
  fill: string;
  color: string;
}

type LoaderData = {
  topVisual: TopVisual;
  portfolioId: string;
};

function Edit() {
  const { topVisual, portfolioId } = useLoaderData() as LoaderData;
  const data = useContentValue();
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [rootOption, setRootOption] = useState({} as Root);
  const viewRef = useRef<HTMLDivElement>(null);

  const clearIdHandler = () => setCurrentItemId(null);

  useEffect(() => {
    viewRef.current?.addEventListener("click", clearIdHandler);
    document.body.style.background = ColorSystem.Neutral[800];

    return () => {
      document.body.style.background = "";
    };
  }, []);

  const submitHandler = async (option: Root, data: ContentList) => {
    const contentList = JSON.parse(JSON.stringify(data));
    await update(ref(db, `${portfolioId}`), {
      option,
      contentList,
    })
      .then(() => {
        window.alert("업데이트가 완료되었습니다.");
        // navigate("/");
      })
      .catch((e) => {
        window.alert("업데이트에 실패했습니다.");
        console.log(e);
      });
  };

  return (
    <Container>
      <CanvasPanel
        ref={viewRef}
        fill={rootOption.fill!}
        color={rootOption.color!}
      >
        <TopVisualElement data={topVisual} />
        {data.map((item) => (
          <Viewer
            key={item.id}
            data={item}
            currentItemId={currentItemId}
            setCurrentItemId={setCurrentItemId}
          />
        ))}
      </CanvasPanel>
      <ToolsPanel>
        <Creator
          currentItemId={currentItemId}
          setCurrentItemId={setCurrentItemId}
        />
        <Editor
          rootOption={rootOption}
          setRootOption={setRootOption}
          currentItemId={currentItemId}
          setCurrentItemId={setCurrentItemId}
          onSubmit={submitHandler}
        />
      </ToolsPanel>
      <Background onClick={clearIdHandler} />
    </Container>
  );
}

export default Edit;

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

  return { topVisual: data.topVisual, portfolioId };
}

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 30px;
  box-sizing: border-box;
`;

const CanvasPanel = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  width: calc(100% - 330px);
  height: fit-content;
  min-height: calc(100vh - 60px);
  background: ${(props) =>
    props.fill ? `#${props.fill}` : `${ColorSystem.Neutral[0]}`};
  color: ${(props) =>
    props.color ? `#${props.color}` : `${ColorSystem.Neutral[900]}`};
  border-radius: 6px;
  overflow: hidden;
  z-index: 100;
`;

const ToolsPanel = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 280px;
  height: fit-content;
  z-index: 100;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
`;
