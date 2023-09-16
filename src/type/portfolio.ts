import { Image } from "type/common";
import { Sort, FontSize, MarginSize, Aline, Gap, Colume } from "type/option";

export type Assets = {
  [key: string]: Image;
  clientLogo: Image;
  CoverPC: Image;
  CoverMO: Image;
};

export type TopVisual = {
  // [key: string]: string | string[] | Assets;
  title: string;
  description: string;
  topic: string[];
  assets: Assets;
};

export type ContentItem = {
  id: string;
  sort: Sort;
  content: {
    text?: string;
    image?: Image[];
  };
  option: {
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
};

export type ContentList = ContentItem[];
