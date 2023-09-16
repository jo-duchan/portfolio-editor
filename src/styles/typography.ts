import { css } from "styled-components";
import { FontSize } from "type/option";

function TitleSizePC(size: FontSize) {
  switch (size) {
    case "XS": {
      return css`
        font-size: 24px;
        line-height: 1.193em;
        font-weight: 700;
      `;
    }
    case "S": {
      return css`
        font-size: 36px;
        line-height: 1.193em;
        font-weight: 700;
      `;
    }
    case "M": {
      return css`
        font-size: 48px;
        line-height: 1.193em;
        font-weight: 700;
      `;
    }

    case "L": {
      return css`
        font-size: 60px;
        line-height: 1.193em;
        font-weight: 600;
      `;
    }

    case "XL": {
      return css`
        font-size: 72px;
        line-height: 1.193em;
        font-weight: 600;
      `;
    }
    default: {
      return css`
        font-size: 24px;
        line-height: 1.193em;
      `;
    }
  }
}

function TextSizePC(size: FontSize) {
  switch (size) {
    case "XS": {
      return css`
        font-size: 14px;
        line-height: 1.429em;
        font-weight: 400;
      `;
    }
    case "S": {
      return css`
        font-size: 16px;
        line-height: 1.5em;
        font-weight: 400;
      `;
    }
    case "M": {
      return css`
        font-size: 18px;
        line-height: 1.444em;
        font-weight: 400;
      `;
    }
    case "L": {
      return css`
        font-size: 20px;
        line-height: 1.4em;
        font-weight: 400;
      `;
    }

    case "XL": {
      return css`
        font-size: 24px;
        line-height: 1.417em;
        font-weight: 400;
      `;
    }
    default: {
      return css`
        font-size: 14px;
        line-height: 1.429em;
        font-weight: 400;
      `;
    }
  }
}

export { TitleSizePC, TextSizePC };
