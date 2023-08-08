export type Image = {
  file: string;
  type: string;
  label: string;
};

export type TopVisual = {
  title: string;
  description: string;
  topic: string[];
  assets: {
    [key: string]: Image;
    clientLogo: Image;
    CoverPC: Image;
    CoverMO: Image;
  };
};
