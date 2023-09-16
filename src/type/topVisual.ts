import { Image } from "type/common";

export type Assets = {
  [key: string]: Image;
  clientLogo: Image;
  CoverPC: Image;
  CoverMO: Image;
};

export type TopVisual = {
  [key: string]: string | string[] | Assets;
  title: string;
  description: string;
  topic: string[];
  assets: Assets;
};
