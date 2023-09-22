import { Image } from "type/common";
import { Sort, Option } from "type/option";

export type Assets = {
  [key: string]: Image;
  ClientLogo: Image;
  CoverPC: Image;
  CoverMO: Image;
};

export type TopVisual = {
  title: string;
  description: string;
  topic: string[];
  assets: Assets;
};

export type ContentItem = {
  id: string;
  sort: Sort;
  content?: {
    text?: string;
    image?: Image[];
  };
  option: Option;
};

export type ContentList = ContentItem[];

export type Portfolio = {
  date: number;
  front: TopVisual;
  content: ContentList;
};
