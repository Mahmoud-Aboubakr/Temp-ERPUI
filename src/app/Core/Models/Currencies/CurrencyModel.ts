import { CountryModel } from "../Countries/CountryModel";

export class CurrencyModel{
    ArabicName:string; 
    EnglishName:string; 
    Symbol:string; 
    CountryId:number; 
    Rate:number; 
    IsDefault:boolean; 
    Country:CountryModel;
    Id:number;
}