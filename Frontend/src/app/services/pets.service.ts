import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
          // // read data from localstorage and add to petList
          // const localData = JSON.parse(localStorage.getItem('pets'));
          // if (localData){
          //   const allPets = petList.concat(localData);
          //   return allPets;
          // } else {
          //   return petList;
          // }
          return petList;
        }
      )
    );
  }

  addPet(newPet: Pet): boolean{
    let localData = JSON.parse(localStorage.getItem('pets'));
    if (localData){
      localData = [newPet, ...localData];
    } else{
      localData = [newPet];
    }
    localStorage.setItem('pets', JSON.stringify(localData));
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
}
