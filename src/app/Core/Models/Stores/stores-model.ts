export class StoresModel {
    manual: boolean = true;
    isActive: boolean = true;
    storeCode: string;
    storeNameAr: string;
    storeNameEn: string;
    isAllowSupplierTrans: boolean;
    storePrivilege: number;
    isScrapStore: boolean = true;
    mainStoreId: number;
    departmentId: number
    appUserId: string;
    branchId: number;
}
