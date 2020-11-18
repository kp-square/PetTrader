import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(mymessage: string): void{
    alertify.success(mymessage);
  }

  error(mymessage: string): void{
    alertify.error(mymessage);
  }

  warning(mymessage: string): void{
    alertify.warning(mymessage);
  }

  message(mymessage: string): void{
    alertify.message(mymessage);
  }
}
