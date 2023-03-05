export interface ICard {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  value: number;
  suit: string;
  selected: boolean;
}
