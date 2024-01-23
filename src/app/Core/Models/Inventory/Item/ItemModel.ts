import { CurrencyModel } from "../../Currencies/CurrencyModel";
import { ItemCategoryModel } from "../ItemCategory/ItemCategoryModel";
import { ItemClassificationModel } from "../ItemClassification/ItemClassificationModel";
import { ItemTypeModel } from "../ItemType/ItemTypeModel";
import { Stocked } from "./Stocked";

export class ItemModel{
	Id : number;
    ServiceName :string
    ItemCode :string
    BarCode :string
    EnglishName :string
    ArabicName :string
    IsPermenant : boolean
    IsActive:boolean
    HasExpiredDate :boolean
    ItemCategoryId :number
    ItemCategory: ItemCategoryModel
    ItemTypeId :number
    ItemType : ItemTypeModel
    ItemClassificationId :number
    ItemClassification: ItemClassificationModel
    Wholesale : number;
    WholesaleCurrencyId : number;
    WholesaleCurrency: CurrencyModel;
    Retail : number;
    RetailCurrencyId : number;
    RetailCurrency : CurrencyModel; 
    CostPrice : number;
    CostPriceCurrencyId : number;
    CostPriceCurrency : CurrencyModel
    ItemImage :string; 
    Stocked : Stocked;
    Instruction :string; 
    InstructionDescription :string; 
    Notes :string; 
    NotesDescription :string; 
}