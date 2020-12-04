import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPetAdditional } from '../models/ipet-additional';
import { Pet } from '../models/pet';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor( private http: HttpClient) { }


  getAllData(): Observable<IPetAdditional[]>{
    return this.http.get('https://localhost:44316/api/pet').pipe(
      map(
        data => {
          console.log(data);
          const petList: Array<IPetAdditional> = [];
          for (const id in data){
            if (data.hasOwnProperty(id)){
              petList.push(data[id]);
            }
          }
          return petList;
        }
      )
    );
  }

  addPet(newPet: Pet): boolean{
    // let pet = JSON.stringify(newPet);
    const fd = new FormData();
    // tslint:disable-next-line: forin
    for (const key in newPet){
      fd.append(key, newPet[key]);
    }
    console.log(fd);
    const token = localStorage.getItem('jwtToken');
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.post('https://localhost:44316/api/pet/', fd, { headers: header})
    .subscribe(x => {
      console.log(x);
    });
    return true;
  }

  generateId(): number{
    let getId = +localStorage.getItem('PID');
    if (getId){
      getId += 1;
      localStorage.setItem('PID', String(getId));
      return getId;
    }
    else {
      localStorage.setItem('PID', String(101));
      return 101;
    }
  }

  getPetWithId(id: number): any{
    const dat =  this.http.get('https://localhost:44316/api/pet/' + id);
    return dat;
  }

  deletePet(id: number): any{
    const token = localStorage.getItem('jwtToken');
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete('https://localhost:44316/api/pet/'+id, {headers: header, observe: 'response'}).subscribe(
      response => {
        if (response.status >= 400){
          return false;
        }
        return true;
      }
    );
  }
}
