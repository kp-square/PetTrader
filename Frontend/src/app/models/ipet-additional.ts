import { IPetBasic } from './ipet-basic';

export interface IPetAdditional extends IPetBasic {
  counts?: number;
  size?: number;
  weight?: number;
  color?: string;
  description?: string;
  additionalImages?: Array<string>;
}
