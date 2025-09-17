import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'textFormatter'
})
export class TextFormatterPipe implements PipeTransform {

    transform(value: string, split: any): unknown {
        return value.split(split).map(r => {
            r = r.toUpperCase();
            let t = r.slice(1).toLowerCase();
            r = r.charAt(0) + t;
            return r;
        }).join(" ")

    }

}