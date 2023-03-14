import React from "react";

// Type
import { ContentItem } from "type/contentDataType";

interface Props {
  data: ContentItem;
}

function Assign({ data }: Props) {
  switch (data.sort) {
    case "TITLE": {
      return <>TITLE</>;
    }
    case "TEXT": {
      return <>TEXT</>;
    }
    case "IMG": {
      return <>IMG</>;
    }
    case "GAP": {
      return <>GAP</>;
    }
    default:
      return <>not found contents</>;
  }
}

export default Assign;
