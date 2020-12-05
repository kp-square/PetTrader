import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPetAdditional } from 'src/app/models/ipet-additional';
import { PetsService } from 'src/app/services/pets.service';


@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  adopting = true;
  pets: Array<IPetAdditional>;

  filterAttrib = '';
  filterString = '';
  sortAttrib = '';
  sortOrder = '';

  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private petservice: PetsService) { }

  ngOnInit(): void {
    this.petservice.getAllData().subscribe(
      data => {
        this.pets = data;
      },
      error => {
        console.log(error);
      }
    );
    this.initializeForm();
  }

  initializeForm(): void{
    this.filterForm = this.fb.group({
      filterBy: [null],
      filterName: [null],
      sortBy: [null],
      sortOrder: [null]
    });
  }



  onFilter(): void{
    this.filterAttrib = this.filterForm.value.filterBy;
    this.filterString = this.filterForm.value.filterName;
    this.sortAttrib = this.filterForm.value.sortBy;
    this.sortOrder = this.filterForm.value.sortOrder;
  }

  onClear(): void{
    this.filterAttrib = '';
    this.filterString = '';
    this.sortAttrib = '';
    this.sortOrder = '';
  }

}
