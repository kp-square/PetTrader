import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Pet } from 'src/app/models/pet';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { PetsService } from 'src/app/services/pets.service';


@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  petImg: string;
  images: Array<string>;
  pet = new Pet();
  constructor(private route: ActivatedRoute, private router: Router,
              private petService: PetsService, private jwtService: JwtServiceService) {
  }

  public petId: number;

  ngOnInit(): void {
    this.petId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Pet) => {
        this.pet = data['prp'];
        this.assignImages();
      }
    );



    // this.petService.getPetWithId(this.petId)
    //   .subscribe((arg: Pet) => {
    //     this.pet = arg;
    //     console.log(this.pet);
    //     this.assignImages();
    //   }, error => {
    //     this.router.navigate(['/']);
    //   });
  }

  assignImages(): void{
    if (this.pet.image){
      this.petImg = this.pet.image;
      this.images = [this.pet.image];

      if (this.pet.additionalImages){
        this.images.concat(this.pet.additionalImages);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  changeImage(e): void {
    this.petImg = e.target.id;
  }

  isEditable(): boolean{
    const userToken = localStorage.getItem('jwtToken');
    const petJSON = JSON.parse(JSON.stringify(this.pet))
    if (userToken){
      const decodedToken = this.jwtService.decodeToken(userToken);
      if (decodedToken){
        const bool = decodedToken.nameid === petJSON.petOwnerId.toString();
        return bool;
      }
    }
    return false;
  }

  onDelete(): void{
    if (this.petService.deletePet(this.petId)){
      this.router.navigate(['/']);
    }
  }

  onEdit(): void{
    this.router.navigate(['/add-pet'])
  }
}
