export interface ProductItem {
  id: number;
  name: string;
  price: string;
  description: string;
  size: string;
  stock: number;
  mvpImg: string;
  frameImg: string;
}

export const productsList = () => {
  const list = [
    {
      name: "MVP Orc Herói",
      price: "89,90",
      description: "Quadro grande",
      size: "21 cm x 29,7cm",
      stock: 3,
      mvpImg: "Orc Hero.gif",
      frameImg: "Frame-black.png",
    },
    {
      name: "MVP Eddga",
      price: "89,90",
      description: "Quadro médio",
      size: "14,8 cm x 21cm",
      stock: 3,
      mvpImg: "eddga.gif",
      frameImg: "Frame-light.png",
    },
    {
      name: "MVP Drácula",
      price: "89,90",
      description: "Quadro grande",
      size: "21 cm x 29,7cm",
      stock: 3,
      mvpImg: "Dracula.gif",
      frameImg: "Frame-black.png",
    },
    {
      name: "MVP General Tartaruga",
      price: "89,90",
      description: "Quadro grande",
      size: "21 cm x 29,7cm",
      stock: 3,
      mvpImg: "Turtle General.gif",
      frameImg: "Frame-black.png",
    },
    {
      name: "MVP Lady Tanee",
      price: "89,90",
      description: "Quadro pequeno",
      size: "14 cm x 14 cm",
      stock: 3,
      mvpImg: "Lady Tanee.gif",
      frameImg: "Frame-light-square.png",
    },
    {
      name: "MVP Thanatos",
      price: "89,90",
      description: "Quadro grande",
      size: "21 cm x 29,7cm",
      stock: 3,
      mvpImg: "Thanatos.gif",
      frameImg: "Frame-black.png",
    },
    {
      name: "MVP Boitatá",
      price: "89,90",
      description: "Quadro pequeno",
      size: "14 cm x 14 cm",
      stock: 3,
      mvpImg: "Boitata.gif",
      frameImg: "Frame-light-square.png",
    },
    {
      name: "MVP Hatii",
      price: "89,90",
      description: "Quadro grande",
      size: "21 cm x 29,7cm",
      stock: 3,
      mvpImg: "Hatii.gif",
      frameImg: "Frame-black.png",
    },
    {
      name: "MVP Senhor das Trevas",
      price: "89,90",
      description: "Quadro grande",
      size: "21 cm x 29,7cm",
      stock: 3,
      mvpImg: "Dark Lord.gif",
      frameImg: "Frame-black.png",
    },
    {
      name: "MVP Detardeurus",
      price: "89,90",
      description: "Quadro médio",
      size: "14,8 cm x 21cm",
      stock: 3,
      mvpImg: "Detardeurus.gif",
      frameImg: "Frame-light.png",
    },
  ];

  // Add ID for each product
  let i = 0;
  return list.map((item) => {
    i++;
    return { ...item, id: String(i) };
  });
};
