import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  // args[0] = sortAttribute
  // args[1] = sortOrder
  transform(value: Array<string>, args: any[]): any[] {
    if (value.length === 0 || args[0] === ''){
      return value;
    }

    let sortOrder = 1;

    if (args[1] === 'desc'){
      sortOrder = -1;
    }

    value.sort((a: any, b: any) => {
      if (a[args[0]] < b[args[0]]){
        return -1 * sortOrder;
      } else if (a[args[0]] > b[args[0]]){
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });

    return value;

  }
}
