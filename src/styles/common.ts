import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// Style
import ColorSystem from "styles/color-system";

const GlobalStyle = createGlobalStyle`
${reset};

html, body {
    width: 100%;
    height: 100%;
    background: ${ColorSystem.Neutral[800]};
};

#root * {
    font-family: Pretendard;  
}

button, input {
    all: unset;
};

`;

export default GlobalStyle;
