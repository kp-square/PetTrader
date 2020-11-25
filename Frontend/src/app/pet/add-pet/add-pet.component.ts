import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Pet } from 'src/app/models/pet';
import { AlertifyService } from 'src/app/services/alertify.service';
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

  constructor(private fb: FormBuilder, private petService: PetsService,
              private router: Router, private alertify: AlertifyService) { }

  @ViewChild('staticTabs', {static: false})
  staticTabs: TabsetComponent;

  selectTab(tabId: number): void{
    if (tabId === 1){
      this.basicInfoSubmitted = true;
      if (this.basicInfo.valid){
        this.staticTabs.tabs[tabId].active = true;
      }
    }

    else if (tabId === 2){
      this.addLocationSubmitted = true;
      if (this.addLocation.valid){
        this.staticTabs.tabs[tabId].active = true;
      }
    }

    else{
      this.staticTabs.tabs[tabId].active = true;
    }
  }


  ngOnInit(): void {
    this.createPetAddForm();
  }

  createPetAddForm(): void{
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

  onSubmit(): void{
    if (this.basicInfo.invalid){
      this.basicInfoSubmitted = true;
      this.staticTabs.tabs[0].active = true;
    }
    else if (this.addLocation.invalid) {
      this.addLocationSubmitted = true;
      this.staticTabs.tabs[1].active = true;
    }
    else {
      this.mapPet();
      console.log(this.newPet);
      const success = this.petService.addPet(this.newPet);
      if (success){
        this.alertify.success('new pet has been added');
        this.router.navigate(['/']);
      }
    }
  }




// GETTER Methods
  get basicInfo(): FormGroup{
    return this.addPetForm.controls.basicInfo as FormGroup;
  }

  get addLocation(): FormGroup{
    return this.addPetForm.controls.addLocation as FormGroup;
  }

  getRadio(): FormControl{
    return this.basicInfo.controls.radio as FormControl;
  }

  getType(): FormControl{
    return this.basicInfo.controls.type as FormControl;
  }

  getBreed(): FormControl{
    return this.basicInfo.controls.breed as FormControl;
  }

  getPrice(): FormControl{
    return this.basicInfo.controls.price as FormControl;
  }

  getCounts(): FormControl{
    return this.basicInfo.controls.counts as FormControl;
  }

  getAge(): FormControl{
    return this.basicInfo.controls.age as FormControl;
  }

  getDescription(): FormControl{
    return this.basicInfo.controls.description as FormControl;
  }

  getCountry(): FormControl{
    return this.addLocation.controls.country as FormControl;
  }

  getCity(): FormControl{
    return this.addLocation.controls.city as FormControl;
  }

  onSelected(event): any{
    console.log(event);
    this.newPet.image = event.target.files[0];
    console.log(this.newPet.image);
  }



  mapPet(): void{
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
