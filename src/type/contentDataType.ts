export type ContentSort = "TITLE" | "TEXT" | "IMG" | "GAP";
export type FontSize = "XL" | "L" | "M" | "S" | "XS";
export type MarginSize = "XL" | "L" | "M" | "S" | "XS" | "NONE";
export type Aline = "LEFT" | "CENTER" | "RIGHT";
export type Gap = "XL" | "L" | "M" | "S" | "XS";

export interface ContentItem {
  id: string;
  sort: ContentSort;
  content: {
    text: string | undefined | null;
    url: string | undefined | null;
  };
  option: {
    size: FontSize | undefined;
    margin: MarginSize | undefined;
    aline: Aline | undefined;
    gap: Gap | undefined;
    color: string | undefined;
    fill: string | undefined;
  };
}

export type ContentList = ContentItem[];
