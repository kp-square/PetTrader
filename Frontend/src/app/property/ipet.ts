export interface IPet {
  petId: number;
  type: string;
  price: number;
  price_type: string;
  age: number;
  image?: string;
  adopt: boolean;
}
