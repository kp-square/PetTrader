import { IPetAdditional } from './ipet-additional';

export class Pet implements IPetAdditional {
  id: number;
  adopt: boolean;
  type: string;
  breed?: string;
  counts: number;
  price: number;
  age: string;
  image?: string;
  description?: string;
  country: string;
  city: string;
  additionalImages?: Array<string>;
  addedBy: number;
  addedOn: string;
}
