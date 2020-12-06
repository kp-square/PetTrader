import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecodeOptions } from 'jwt-decode';
import { IPetAdditional } from 'src/app/models/ipet-additional';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pets: Array<IPetAdditional>;

  constructor(private petService: PetsService, private tokenDecoder: JwtServiceService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token){
      const decodedToken = this.tokenDecoder.decodeToken(token);
      if (decodedToken){
        const id = decodedToken.nameid;
        console.log(id);
        this.pets = this.petService.getPetsByUserId(+id);
      }
      else{
        this.router.navigate(['/user/login']);
      }
    }else{
      this.router.navigate(['/user/login']);
    }
  }



}
