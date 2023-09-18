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
import { format } from "date-fns";

type LoaderData = {
  [key: string]: { front: TopVisual; date: number };
};

function PortfolioListPage() {
  const data = useLoaderData() as LoaderData;
  const navigate = useNavigate();

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

  const editHandler = (key: string) => {
    navigate(`edit/${key}/front`);
  };

  const viewHandler = (key: string) => {
    console.log(key);
  };

  const deleteHandler = async (key: string) => {
    console.log(key);
  };

  return (
    <Container>
      <Title>포트폴리오 리스트 ({Object.keys(data).length})</Title>
      <div className="create-button-wrapper">
        <Button label="Create" size="MEDIUM" onClick={createHandler} />
      </div>
      <List>
        {Object.keys(data).map((key) => (
          <Item key={key}>
            <img
              className="thumbnail"
              src={data[key].front.assets.clientLogo.file}
              alt="project thumbnail"
            />
            <p className="project-title">{data[key].front.title}</p>
            <p className="date">
              {format(data[key].date, "yy. MMM. dd (ccc)")}
            </p>
            <div className="button-wrapper">
              <Button
                label="View"
                size="SMALL"
                onClick={() => viewHandler(key)}
              />
              <Button
                label="Edit"
                btnType="SECONDARY"
                size="SMALL"
                onClick={() => editHandler(key)}
              />
              <Button
                label="Delete"
                btnType="SECONDARY"
                size="SMALL"
                onClick={() => deleteHandler(key)}
              />
            </div>
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

  & .create-button-wrapper {
    margin-left: auto;
    margin-bottom: 32px;
  }
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
  gap: 32px;
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

  & .button-wrapper {
    display: flex;
    gap: 8px;
  }
`;
