export type Image = {
  file: File;
  preview: string;
  type: string;
};

export type TopVisual = {
  title: string;
  description: string;
  work: string;
  clientLogo: Image;
  backgroundPC: Image;
  backgroundMO: Image;
};
