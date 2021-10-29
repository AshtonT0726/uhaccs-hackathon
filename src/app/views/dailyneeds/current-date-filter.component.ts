import { DatePipe } from "@angular/common";
import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currentDateFilter'
})
@Injectable()
export class CurrentDateFilter implements PipeTransform {
    
  datePipe = new DatePipe('en-US');

  transform(items: any[], field : string, value : string): any[] {  
    console.log("field", field, "value", value);
      
    if (!items) return [];
    if (!value || value.length == 0) return items;
    let date = this.datePipe.transform(value, 'yyyy-MM-dd')
    return items.filter(it => it[field] && it[field] === date);
  }
}