import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppLanguageService {

  constructor(private _TranslateService: TranslateService) { }

  langCode: BehaviorSubject<string> = new BehaviorSubject<string>('en-US')
  currentLanguage$ = this.langCode.asObservable();
  getLang(): string{
    return this.langCode.value
  }
}
