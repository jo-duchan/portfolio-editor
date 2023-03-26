import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// Style

const GlobalStyle = createGlobalStyle`
${reset};

html, body, #root {
    width: 100%;
    height: 100%;
};

#root * {
    font-family: Pretendard;  
}

button, input {
    all: unset;
};

`;

export default GlobalStyle;
