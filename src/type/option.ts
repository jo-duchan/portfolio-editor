export type Sort = "TITLE" | "TEXT" | "IMG" | "GAP";
export type FontSize = "XL" | "L" | "M" | "S" | "XS";
export type MarginSize = "XL" | "L" | "M" | "S" | "XS" | "NONE";
export type Aline = "LEFT" | "CENTER" | "RIGHT";
export type Gap = "XL" | "L" | "M" | "S" | "XS";
export type Colume = "1" | "2";

export type Option = {
  [key: string]:
    | FontSize
    | MarginSize
    | Aline
    | Gap
    | string
    | Colume
    | undefined;
  size?: FontSize;
  margin?: MarginSize;
  aline?: Aline;
  gap?: Gap;
  color?: string;
  fill?: string;
  column?: Colume;
};
export type Root = {
  [key: string]: string | undefined;
  color: string | undefined;
  fill: string | undefined;
};
