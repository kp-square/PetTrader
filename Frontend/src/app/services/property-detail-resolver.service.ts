import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pet } from '../models/pet';
import { PetsService } from './pets.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Pet>{

  constructor( private router: Router, private petService: PetsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet> | Pet{
    const petId = +route.params['id'];
    console.log(petId);
    console.log('worrking');
    return this.petService.getPetWithId(petId)
    .pipe(catchError(
      error => this.router.navigate(['/'])
    ));
  }
}
