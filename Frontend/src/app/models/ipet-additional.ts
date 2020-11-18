import { IPetBasic } from './ipet-basic';

export interface IPetAdditional extends IPetBasic {
  description?: string;
  additionalImages?: Array<string>;
}
