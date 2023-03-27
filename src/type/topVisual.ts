export type Image = {
  file: File;
  preview: string;
  type: string;
  label: string;
};

export type TopVisual = {
  title: string;
  description: string;
  work: string;
  assets: {
    [key: string]: Image;
    clientLogo: Image;
    visualPC: Image;
    visualMO: Image;
  };
};
