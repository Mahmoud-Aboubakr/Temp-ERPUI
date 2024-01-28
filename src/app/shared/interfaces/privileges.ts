export interface PageNode {
    pageId: number;
    pageNameEn: string;
    pageNameAr: string;
    pageUrl: string;
    sort: number;
    pageDesCription: string;
}
  
  export interface TypeNode {
    typeId: number;
    pageType: string;
    pages: PageNode[];
  }
  
  export interface ModuleNode {
    moduleId: number;
    moduleName: string;
    types: TypeNode[];
    pages: PageNode[];
  }
  
  export interface PrivilegeNode {
    parent: string;
    modules: ModuleNode[];
  }
