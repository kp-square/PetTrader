import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Pet } from 'src/app/models/pet';
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
  constructor(private route: ActivatedRoute, private router: Router, private petService: PetsService) {

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
    const path = 'assets/images/';
    if (this.pet.image){
      this.petImg = path + this.pet.image;
      console.log(this.petImg);
      this.images = [this.pet.image, 'default.jpg', 'img-3.jpg', 'img-4.jpg'];
    } else{
      this.petImg = 'assets/images/default.jpg';
      this.images = ['img-2.png', 'default.jpg', 'img-3.jpg', 'img-4.jpg'];
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  changeImage(e): void {
    const path = 'assets/images/';
    this.petImg = path + e.target.id;
    console.log(this.petImg);
  }

}
