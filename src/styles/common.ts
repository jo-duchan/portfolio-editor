import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};

html, body {
    width: 100%;
    height: 100%;
    background: fff;
};

#root * {
    font-family: Pretendard;  
}

`;

export default GlobalStyle;
