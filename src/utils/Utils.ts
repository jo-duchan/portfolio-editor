const convertBase64 = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

const Utils = { convertBase64 };

export default Utils;
