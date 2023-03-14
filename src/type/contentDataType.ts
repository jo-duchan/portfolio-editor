export type ContentSort = "TITLE" | "TEXT" | "IMG" | "GAP";
export type Size = "XL" | "L" | "M" | "S" | "XS" | "NONE";
export type Aline = "LEFT" | "CENTER" | "RIGHT";

export interface ContentItem {
  id: string;
  sort: ContentSort;
  content: {
    text: string | undefined | null;
    url: string | undefined | null;
  };
  option: {
    size: Size;
    margin: Size;
    aline: Aline;
  };
}

export type ContentList = ContentItem[];
