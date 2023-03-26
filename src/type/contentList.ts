export type ContentSort = "TITLE" | "TEXT" | "IMG" | "GAP";
export type FontSize = "XL" | "L" | "M" | "S" | "XS";
export type MarginSize = "XL" | "L" | "M" | "S" | "XS" | "NONE";
export type Aline = "LEFT" | "CENTER" | "RIGHT";
export type Gap = "XL" | "L" | "M" | "S" | "XS";
export type Image = {
  file: File;
  preview: string;
  type: string;
};
export type Colume = "1" | "2";

export interface ContentItem {
  id: string;
  sort: ContentSort;
  content: {
    text: string | undefined | null;
    image: Image[] | undefined;
  };
  option: {
    size: FontSize | undefined;
    margin: MarginSize | undefined;
    aline: Aline | undefined;
    gap: Gap | undefined;
    color: string | undefined;
    fill: string | undefined;
    column: Colume | undefined;
  };
}

export type ContentList = ContentItem[];

// export interface PortfolioItem {
//   id: string;
//   topVisual: TopVisual;
//   contentList: ContentList;
// }
