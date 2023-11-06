import {
  css,
  FlattenSimpleInterpolation,
  ThemedCssFunction,
  DefaultTheme,
  StyledInterface,
  CSSProp,
  CSSObject,
  CSSProperties,
  BaseThemedCssFunction,
} from "styled-components";

// export const media = (key: string) => {
//   return (style: string) =>
//     `@media (min-width: ${breakpoints[key]}em) { ${style} }`;
// };

// const media = (key: keyof typeof breakpoints) => {
//   console.log(path);
//   return (style: TemplateStringsArray | String) =>
//     `${breakpoints[key]} { ${style} }`;
// };

export const breakpoints: { [key: string]: string } = {
  S: "@media (max-width: 639px)",
  M: "@media (max-width: 1047px)",
  L: "@media (max-width: 1000px)",
};

function useMedia(key: keyof typeof breakpoints, style: CSSProp) {
  // return (style: TemplateStringsArray | String) => ``;
  console.log(style);
  // return () => `${breakpoints[key]} { ${css`${style}}`}}`;
  return `${breakpoints[key]} { ${css`${style}}`}}`;
}

// export default useMedia;

//https://jsramblings.com/how-to-use-media-queries-with-styled-components/
//https://dev.to/cagatayunal/how-to-use-css-media-query-breakpoint-in-styled-components-9of
const size = {
  xs: "320px",
  sm: "768px",
  lg: "1200px",
};
const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  lg: `(min-width: ${size.lg})`,
};
export default { size, device };
