import React, { useEffect } from "react";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { ref, child, get, update } from "firebase/database";
import { db } from "firebase-config";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { TopVisual } from "type/portfolio";
import { TitleSizePC, TextSizePC } from "styles/typography";
import ColorSystem from "styles/color-system";
import Button from "components/ui/Button";

function PortfolioListPage() {
  const data = useLoaderData() as {
    [key: string]: { front: TopVisual; date: number };
  };
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, []);

  const createHandler = async () => {
    if (window.confirm("포트폴리오가 생성을 하시겠습니까?")) {
      const portfolioId = nanoid();
      const date = Date.now();
      await update(ref(db, `/${portfolioId}`), {
        date,
      })
        .then(() => {
          window.alert("포트폴리오가 생성되었습니다.");
          navigate(`/edit/${portfolioId}/front`);
        })
        .catch((e) => {
          window.alert("포트폴리오 생성/수정에 실패했습니다.");
          console.log(e);
        });
    } else {
      window.alert("포트폴리오 생성이 취소되었습니다.");
    }
  };

  const editHandler = async (key: string) => {
    console.log(key);
    navigate(`edit/${key}/front`);
  };

  return (
    <Container>
      <Title>포트폴리오 리스트</Title>
      <button onClick={createHandler}>포트폴리오 생성</button>
      <List>
        {Object.keys(data).map((key) => (
          <Item key={key}>
            <img
              className="thumbnail"
              src={data[key].front.assets.clientLogo.file}
              alt="project thumbnail"
            />
            <p className="project-title">{data[key].front.title}</p>
            <p className="date">{data[key].date}</p>
            <Button
              label="Edit"
              size="SMALL"
              onClick={() => editHandler(key)}
            />
          </Item>
        ))}
      </List>
    </Container>
  );
}

export default PortfolioListPage;

export async function loader() {
  const dbRef = ref(db);
  const data = await get(child(dbRef, "/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "";
        // throw json({ message: "No data available" }, { status: 500 });
      }
    })
    .catch((error) => {
      throw json({ message: error }, { status: 500 });
    });

  return data;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: ${ColorSystem.Neutral[100]};
`;

const Title = styled.h3`
  ${TitleSizePC("S")};
  margin-bottom: 40px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: 100px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  background: ${ColorSystem.Neutral[200]};

  & .thumbnail {
    width: 160px;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    overflow: hidden;
  }

  & .project-title {
    flex: 1;
    ${TextSizePC("L")}
  }

  & .date {
    width: fit-content;
  }
`;
