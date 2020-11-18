export interface IPetBasic {
  id: number;
  country: string;
  city: string;
  adopt: boolean;
  type: string;
  breed?: string;
  counts: number;
  price: number;
  age: string;
  image?: string;
}
