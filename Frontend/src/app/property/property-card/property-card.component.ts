import { Component, Input } from '@angular/core';
import { IPet } from '../ipet';


@Component({
  selector: 'app-property-card',
  // template:'<h1>hello world it is property card component</h1>'
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})


export class PropertyCardComponent{

  @Input() propertyName: IPet;

}
