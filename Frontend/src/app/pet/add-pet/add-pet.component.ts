import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { first } from 'rxjs/operators';
import { Pet } from 'src/app/models/pet';
import { AlertifyService } from 'src/app/services/alertify.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  addPetForm: FormGroup;
  newPet = new Pet();
  basicInfoSubmitted: boolean;
  addLocationSubmitted: boolean;
  formSubmitted: boolean;
  isAddMode: boolean;
  id: number;
  petImagePath: string;

  constructor(private fb: FormBuilder, private petService: PetsService, private route: ActivatedRoute,
    private router: Router, private alertify: AlertifyService, private jwtDecoder: JwtServiceService) { }

  @ViewChild('staticTabs', { static: false })
  staticTabs: TabsetComponent;

  selectTab(tabId: number): void {
    if (tabId === 1) {
      this.basicInfoSubmitted = true;
      if (this.basicInfo.valid) {
        this.staticTabs.tabs[tabId].active = true;
      }
    }

    else if (tabId === 2) {
      this.addLocationSubmitted = true;
      if (this.addLocation.valid) {
        this.staticTabs.tabs[tabId].active = true;
      }
    }

    else {
      this.staticTabs.tabs[tabId].active = true;
    }
  }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.createPetAddForm();

    if (!this.isAddMode) {
      console.log('not working');
      const pet = this.petService.getPetWithId(this.id)
        .pipe(first())
        .subscribe(x => {
          this.addPetForm.patchValue(
            {
              basicInfo: {
                radio: x.radio === true ? 'adopt' : 'sell',
                type: x.type,
                breed: x.breed,
                counts: x.counts,
                age: x.age,
                price: x.price,
                description: x.description
              },
              addLocation: {
                country: x.country,
                city: x.city
              },
              addPhotos: {
                petImage: x.image,
                extraImage: x.extraImages
              }
            }
          );
          this.petImagePath = 'https://localhost:44316/' + x.image;
        });
    }
  }

  createPetAddForm(): void {
    this.addPetForm = this.fb.group({
      basicInfo: this.fb.group({
        radio: [null, Validators.required],
        type: [null, Validators.required],
        breed: [null],
        counts: [null, Validators.required],
        age: [null, Validators.required],
        price: [null, Validators.required],
        description: [null, Validators.required]
      }),

      addLocation: this.fb.group({
        country: [null, Validators.required],
        city: [null, Validators.required]
      }),

      addPhotos: this.fb.group({
        petImage: [null],
        extraImages: [null]
      })
    });
  }

  onSubmit(): void {
    if (this.basicInfo.invalid) {
      this.basicInfoSubmitted = true;
      this.staticTabs.tabs[0].active = true;
    }
    else if (this.addLocation.invalid) {
      this.addLocationSubmitted = true;
      this.staticTabs.tabs[1].active = true;
    }
    else {
      this.mapPet();

      if (this.isAddMode) {
        const success = this.petService.addPet(this.newPet);
        if (success) {
          this.alertify.success('new pet has been added');
          this.router.navigate(['/']);
        }else{
          this.alertify.error('Sorry, pet could not be added');
        }
      }
      else {
        const success = this.petService.updatePet(this.id, this.newPet);
        if (success) {
          this.alertify.success('pet has been updated');
          this.router.navigate(['/']);
        }else{
          this.alertify.error('Sorry, pet could not be updated');
        }
      }
    }
  }



  // GETTER Methods

  getUserId(): number {
    const token = localStorage.getItem('jwtToken');
    const jwt = this.jwtDecoder.decodeToken(token);
    return +jwt.nameid;
  }

  get basicInfo(): FormGroup {
    return this.addPetForm.controls.basicInfo as FormGroup;
  }

  get addLocation(): FormGroup {
    return this.addPetForm.controls.addLocation as FormGroup;
  }

  getRadio(): FormControl {
    return this.basicInfo.controls.radio as FormControl;
  }

  getType(): FormControl {
    return this.basicInfo.controls.type as FormControl;
  }

  getBreed(): FormControl {
    return this.basicInfo.controls.breed as FormControl;
  }

  getPrice(): FormControl {
    return this.basicInfo.controls.price as FormControl;
  }

  getCounts(): FormControl {
    return this.basicInfo.controls.counts as FormControl;
  }

  getAge(): FormControl {
    return this.basicInfo.controls.age as FormControl;
  }

  getDescription(): FormControl {
    return this.basicInfo.controls.description as FormControl;
  }

  getCountry(): FormControl {
    return this.addLocation.controls.country as FormControl;
  }

  getCity(): FormControl {
    return this.addLocation.controls.city as FormControl;
  }

  onSelected(event): any {
    this.newPet.image = event.target.files[0];
    this.petImagePath = event.target.result;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.petImagePath = reader.result as string;

    reader.readAsDataURL(file);
  }



  mapPet(): void {
    this.newPet.addedBy = this.getUserId();
    this.newPet.petId = this.petService.generateId();
    this.newPet.type = this.getType().value;
    this.newPet.adopt = this.getRadio().value === 'adopt' ? true : false;
    this.newPet.breed = this.getBreed().value;
    this.newPet.counts = this.getCounts().value;
    this.newPet.price = this.getPrice().value;
    this.newPet.age = this.getAge().value;
    this.newPet.description = this.getDescription().value;
    this.newPet.country = this.getCountry().value;
    this.newPet.city = this.getCity().value;
    this.newPet.addedOn = new Date().toString();
  }
}
