export type Image = {
  file: string;
  type: string;
};

export type Assets = {
  [key: string]: Image;
  clientLogo: Image;
  CoverPC: Image;
  CoverMO: Image;
};

export type TopVisual = {
  [key: string]: string | string[] | { [key: string]: Image };
  title: string;
  description: string;
  topic: string[];
  assets: Assets;
};
