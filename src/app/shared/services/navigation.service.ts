import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [
    /*{
      name: 'DASHBOARD',
      state: 'dashboard/analytics',
      type: 'link',
      icon: 'dashboard',
    },*/
    {
      name: 'GENERAL',
      type: 'dropDown',
      tooltip: 'general',
      icon: 'view_carousel',
      sub: [
        { name: 'SETUP',
          type: 'dropDown',
          sub: [
            { name: 'COMPANIES', state: 'setup/companies', type: 'link' },
            { name: 'BRANCHES', state: 'setup/branches', type: 'link' },
            { name: 'COUNTRY', state: 'setup/countries', type: 'link' },
            { name: 'GOVERNORATE', state: 'setup/governorates', type: 'link' },
            { name: 'CITY', state: 'setup/cities', type: 'link' },
            { name: 'NEWS', state: 'setup/news' },
            { name: 'ROLES', state: 'setup/roles'},
            { name: 'APPLICATION_PAGE_PREFIX', state: 'setup/applicationPagePrefix'},
            { name: 'NATIONALITIES', state: 'setup/nationalities'},
            { name: 'Identifications', state: 'setup/identifications'},
            { name: 'USER_TYPES', state: 'setup/userTypes'},
            { name: 'APPLICATION_PAGES', state: 'setup/applicationPages'},
            { name: 'STORE_ADJUSTMENT', state: 'setup/storeAdjustment'},
            { name: 'UNITS', state: 'setup/units'},
            { name: 'UNITS_TEMPLATE', state: 'setup/unitsTemplate'},
            { name: 'CURRENCIES', state: 'setup/currencies'}
          ] 
        },  
        {
          name: 'USERS',
          type: 'dropDown',
          sub: [
            {name: 'Create a new user', state: 'users/createUser'},
          ]
        },
        {
          name: 'INVENTORY',
          type: 'dropDown',
          sub: [
            {
              name:"SETUP",
              type:"dropDown", 
              sub:[
                {name: 'ITEMS', state: 'inventory/setup/items'},
                {name: 'ITEM_TYPES', state: 'inventory/setup/itemTypes'},
                {name: 'ITEM_CATEGORIES', state: 'inventory/setup/itemCategories'},
                {name: 'ITEM_CLASSIFICATIONS', state: 'inventory/setup/itemClassifications'},
                {name: 'CONTACT_TYPES', state: 'inventory/setup/contactTypes'},
                {name: 'STORES', type: 'dropDown',
                  sub: [
                    {
                      name: 'Add a new store',
                      state: 'inventory/setup/stores/addStore'
                    }
                  ]
                },
              ]
            }
          ]
        },         
        {
          name: 'SUPPLIERS',
          type: 'dropDown',
          sub: [
            {
              name:"SETUP",
              type:"dropDown", 
              sub:[
                {name: 'DELIVERIES', state: 'suppliers/setup/deliveries'},
                {name: 'SUPPLIER_TYPES', state: 'suppliers/setup/supplierTypes'}
              ]
            }
          ]
        },
        /*{
          name: 'STORES',
          type: 'dropDown',
          sub: [
            {
              name: 'Add a new store',
              state: 'stores/addStore'
            }
          ]
        }    */   
      ]
    },
    {
      name: 'MODULES',
      type: 'dropDown',
      tooltip: 'general',
      icon: 'view_carousel',
      sub: [
        { name: 'SALES', state: 'modules/sles' },
        { name: 'HR',
          state: 'modules/hr', 
          type: 'dropDown',
          sub:[
            { name: 'EMPLOYEE', state: 'hr/setup/employee' },
        ] },
        { name: 'CASHIER',
          state: 'modules/cashier', 
          type: 'dropDown',
          sub:[
            { name: 'SETUP',
              state: 'setup', 
              type:'dropDown', 
              sub:[
                {
                  name:'PAYMENT_GROUPS', state:'cashier/setup/paymentGroups'
                },
                {
                  name:'PAYMENT_MODES', state:'cashier/setup/paymentModes'
                }
              ]
          },
        ] },
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      sub: [
        { name: 'GALLERY', state: 'others/gallery' },
        { name: 'PRICINGS', state: 'others/pricing' },
        { name: 'USERS', state: 'others/users' },
        { name: 'BLANK', state: 'others/blank' }
      ]
    },
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() { }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    // switch (menuType) {
    //   case 'separator-menu':
    //     this.menuItems.next(this.separatorMenu);
    //     break;
    //   case 'icon-menu':
    //     this.menuItems.next(this.iconMenu);
    //     break;
    //   default:
    //     this.menuItems.next(this.plainMenu);
    // }
  }
}
