import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {

  transform(map: {}, args: any[] = null): { key: string, value: any }[] {
    return (!map) ?
      null :
      Object.keys(map)
        .map(key => ({ 'key': key, 'value': map[key] }));
  }

}
