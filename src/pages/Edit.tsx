import React, { useEffect, useRef, useState } from "react";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { ref, child, get, update } from "firebase/database";
import { db } from "firebase-config";
import styled from "styled-components";
import useContent from "context/useContent";
import ColorSystem from "styles/color-system";
import TopVisualElement from "components/common/TopVisual";
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
  portfolioId: string;
  date: number;
  option: Root;
  front: TopVisual;
  content: ContentList;
};

function EditPage() {
  const { portfolioId, date, option, front, content } =
    useLoaderData() as LoaderData;
  const data = useContent.Value();
  const action = useContent.Action();
  const navigate = useNavigate();
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [rootOption, setRootOption] = useState({} as Root);
  const viewRef = useRef<HTMLDivElement>(null);

  const clearIdHandler = () => setCurrentItemId(null);

  useEffect(() => {
    // init
    if (content) {
      action.init(content);
    } else {
      action.init([]);
    }

    if (option) {
      setRootOption(option);
    } else {
      setRootOption({} as Root);
    }
  }, [content]);

  useEffect(() => {
    const setRem = () => {
      if (!viewRef.current) return;
      document.documentElement.style.fontSize = `${
        (viewRef.current.clientWidth / 1920) * 100
      }%`;
    };

    setRem();

    window.addEventListener("resize", setRem);
    viewRef.current?.addEventListener("click", clearIdHandler);
    document.body.style.background = ColorSystem.Neutral[800];

    return () => {
      window.removeEventListener("resize", setRem);
      viewRef.current?.removeEventListener("click", clearIdHandler);
      document.body.style.background = "";
    };
  }, []);

  const submitHandler = async (option: Root, data: ContentList) => {
    const content = JSON.parse(JSON.stringify(data));
    const editDate = Date.now();

    await update(ref(db, `${portfolioId}`), {
      date: editDate,
      option,
      content,
    })
      .then(() => {
        window.alert("업데이트가 완료되었습니다.");
        navigate("/");
      })
      .catch((e) => {
        window.alert("업데이트에 실패했습니다.");
        console.log(e);
      });
  };

  return (
    <Container>
      <CanvasPanel
        className="??"
        ref={viewRef}
        fill={rootOption.fill!}
        color={rootOption.color!}
      >
        <TopVisualElement data={front} />
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

export default EditPage;

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
  console.log(data);
  return {
    portfolioId,
    date: data.date,
    option: data.option,
    front: data.front,
    content: data.content,
  };
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
