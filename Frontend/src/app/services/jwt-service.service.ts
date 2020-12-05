import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor() { }

  decodeToken(token: string): any{
    const jwtTemp = jwtDecode(token);
    const decodedToken =  JSON.parse(JSON.stringify(jwtTemp));
    if (this.isTokenExpired(decodedToken)){
      return false;
    }else {
      return decodedToken;
    }
  }

  isTokenExpired(token: any): boolean{
    const timeNow = Math.floor(Date.now() / 1000);
    if (token.exp <= timeNow) {
      return true;
    }
    return false;
  }

}
