import { Component, Input } from '@angular/core';
import { IPetBasic } from 'src/app/models/ipet-basic';



@Component({
  selector: 'app-pet-card',
  // template:'<h1>hello world it is pet card component</h1>'
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})


export class PetCardComponent{

  @Input() petName: IPetBasic;

}
