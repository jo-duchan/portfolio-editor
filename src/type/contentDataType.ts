export type ContentSort = "TITLE" | "TEXT" | "IMG" | "GAP";
export type FontSize = "XL" | "L" | "M" | "S" | "XS";
export type MarginSize = "XL" | "L" | "M" | "S" | "XS" | "NONE";
export type Aline = "LEFT" | "CENTER" | "RIGHT";

export interface ContentItem {
  id: string;
  sort: ContentSort;
  content: {
    text: string | undefined | null;
    url: string | undefined | null;
  };
  option: {
    size: FontSize;
    margin: MarginSize;
    aline: Aline;
  };
}

export type ContentList = ContentItem[];
