import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPetAdditional } from 'src/app/models/ipet-additional';
import { PetsService } from 'src/app/services/pets.service';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  adopting = true;
  properties: Array<IPetAdditional>;

  filterAttrib = '';
  filterString = '';
  sortAttrib = '';
  sortOrder = '';

  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private petservice: PetsService) { }

  ngOnInit(): void {
    this.petservice.getAllData().subscribe(
      data => {
        this.properties = data;
        // console.log(data);
        console.log(this.route.snapshot.url.toString());
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
    console.log(this.filterForm.value);
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
