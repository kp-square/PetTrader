import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, petAttribute: string): any[] {
    if (value.length === 0 || filterString === '' || petAttribute === ''){
      return value;
    }

    const filteredList = [];

    for (const item of value){
      if (item[petAttribute] === filterString.toLowerCase()){
        filteredList.push(item);
      }
    }

    return filteredList;
  }

}
