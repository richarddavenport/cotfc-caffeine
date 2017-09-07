import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {

  transform(map: { $value?: any }, args: any[] = null): { key: string, value: any }[] {
    return (map == null) ?
      null :
      Object.keys(map)
        .map(key => ({ 'key': key, 'value': map[key] }));
  }

}
