export type ContentSort = "TITLE" | "TEXT" | "IMG" | "GAP";
export type Size = "XL" | "L" | "M" | "S" | "XS" | "NONE";

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
  };
}

export type ContentList = ContentItem[];
