import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {

  getPropertyNames<T>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }
}
