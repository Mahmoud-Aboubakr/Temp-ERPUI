export class PagesModel {
    id: number;
    applicationTblId: number;
    appModuleId: number;
    appPageTypeId: number;
    pageNameEn: string;
    pageNameAr: string;
    pageUrl: string;
    sort: number;
    pageDesCription: string;
    isActive: boolean = true;
}
