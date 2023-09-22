import React from "react";
import styled from "styled-components";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { ref, child, get, update } from "firebase/database";
import { db } from "firebase-config";
import { Portfolio, ContentItem } from "type/portfolio";
import { Sort } from "type/option";
import TopVisualElement from "components/common/TopVisual";
import TextElement from "components/common/TextElement";

function PreviewPage() {
  const data = useLoaderData() as Portfolio;
  console.log(data);

  const renderElement = (item: ContentItem) => {
    switch (item.sort) {
      case "TITLE":
      case "TEXT": {
        return (
          <TextElement option={item.option} sort={item.sort}>
            {item.content?.text}
          </TextElement>
        );
      }
      case "IMG": {
        return "IMG";
      }
      case "GAP": {
        return "GAP";
      }
      default:
        return <>not found contents</>;
    }
  };
  return (
    <Container>
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
  display: block;
  width: 100%;
`;
