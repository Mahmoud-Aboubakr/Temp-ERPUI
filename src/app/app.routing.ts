import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "sessions",
        loadChildren: () =>
          import("./views/sessions/sessions.module").then(
            (m) => m.SessionsModule
          ),
        data: { title: "Session" },
      },
    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        data: { title: "Dashboard", breadcrumb: "DASHBOARD" },
      },
      {
        path: "others",
        loadChildren: () =>
          import("./views/others/others.module").then((m) => m.OthersModule),
        data: { title: "Others", breadcrumb: "OTHERS" },
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./views/forms/forms.module").then((m) => m.AppFormsModule),
        data: { title: "Forms", breadcrumb: "FORMS" },
      },

      {
        path: "search",
        loadChildren: () =>
          import("./views/search-view/search-view.module").then(
            (m) => m.SearchViewModule
          ),
      },
      {
        path: "setup",
        children: [
          {
            path: "branches",
            loadChildren: () => import("./views/setup/branches/branches.module").then(m => m.BranchesModule),
          },
          {
            path: "companies",
            loadChildren: () => import("./views/setup/companies/companies.module").then(m => m.CompaniesModule),
          },
          {
            path: "cities",
            loadChildren: () => import("./views/setup/cities/cities.module").then(m => m.CitiesModule),
          },
          {
            path: "governorates",
            loadChildren: () => import("./views/setup/governorates/governorates.module").then(m => m.GovernoratesModule),
          },
          {
            path: "countries",
            loadChildren: () => import("./views/setup/countries/countries.module").then(m => m.CountriesModule),
          },
          { 
            path: 'news',
            loadChildren: () => import('./views/setup/news/news.module').then(m => m.NewsModule)
          },
          {
            path: 'nationalities',
            loadChildren: () => import('./views/setup/nationality/nationality.module').then(m => m.NationalityModule)
          },
          {
            path: 'roles',
            loadChildren: () => import('./views/setup/roles/roles.module').then(m => m.RolesModule)
          },
          {
            path: 'identifications',
            loadChildren: () => import('./views/setup/identification-types/identification-types.module').then(m => m.IdentificationTypesModule)
          },
          {
            path: 'applicationPagePrefix',
            loadChildren: () => import('./views/setup/applicationPagePrefix/applicationPagePrefix.module').then(m => m.ApplicationPagePrefixModule)
          },
          {
            path: 'userTypes',
            loadChildren: () => import('./views/setup/userTypes/userType.module').then(m => m.userTypesModule)
          },
          {
            path: 'applicationPages',
            loadChildren: () => import('./views/setup/applicationPages/applicationPages.module').then(m => m.applicationPagesModule)
          },
          {
            path: 'currencies',
            loadChildren: () => import('./views/setup/currencies/currencies.module').then(m => m.CurrenciesModule)
          },
          {
            path: 'storeAdjustment',
            loadChildren: () => import('./views/setup/storeAdjustment/storeAdjustment.module').then(m => m.storeAdjustmentsModule)
          },
          {
            path: 'units',
            loadChildren: () => import('./views/setup/units/units.module').then(m => m.unitsModule)
          },
          {
            path: 'unitsTemplate',
            loadChildren: () => import('./views/setup/unitsTemplate/unitsTemplate.module').then(m => m.unitsTemplateModel)
          },
          ]
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'inventory',
        children: [
          {
            path:'setup', 
            children:[
              {
                path:'items',
                loadChildren: () => import('./views/inventory/setup/items/items.module').then(m => m.ItemsModule)
              },
              {
                path:'itemTypes',
                loadChildren: () => import('./views/inventory/setup/itemTypes/itemTypes.module').then(m => m.ItemTypesModule)
              },
              {
                path:'itemCategories',
                loadChildren: () => import('./views/inventory/setup/itemCategories/itemCategories.module').then(m => m.ItemCategoriesModule)
              },
              {
                path:'itemClassifications',
                loadChildren: () => import('./views/inventory/setup/itemClassifications/itemClassifications.module').then(m => m.ItemClassificationsModule)
              },
              {
                path:'contactTypes',
                loadChildren: () => import('./views/inventory/setup/contactTypes/contactTypes.module').then(m => m.ContactTypesModule)
              },
              {
                path: 'stores',
                loadChildren: () => import('./views/inventory/setup/stores/stores.module').then(m => m.StoresModule)
              }
            ]
          }
        ]
      },
      {
        path: 'suppliers',
        children: [
          {
            path:'setup', 
            children:[
              {
                path:'deliveries',
                loadChildren: () => import('./views/suppliers/setup/delivery/delivery.module').then(m => m.DeliveryModule)
              },
              {
                path:'supplierTypes',
                loadChildren: () => import('./views/suppliers/setup/supplier-types/supplier-types.module').then(m => m.SupplierTypesModule)
              },
            ]
          }
        ]
      },
      /*{
        path: 'stores',
        loadChildren: () => import('./views/stores/stores.module').then(m => m.StoresModule)
      },*/
      {
        path: 'hr',
        children:[
          { 
            path: 'setup',
            children:[
              {
                path:'employee', 
                loadChildren: () => import('./views/HR/Setup/Employee/employee.module').then(m => m.EmployeeModule)
              }
            ]
          },
        ]
        
      },
      {
        path: 'cashier',
        children:[
          { 
            path: 'setup',
            children:[
              {
                path:'paymentGroups', 
                loadChildren: () => import('./views/cashier/setup/paymentGroup/paymentGroups.module').then(m => m.PaymentGroupsModule)
              },
              {
                path:'paymentModes', 
                loadChildren: () => import('./views/cashier/setup/paymentModes/paymentModes.module').then(m => m.PaymentModesModule)
              }
            ]
          },
        ]
        
      },
      {
        path: 'settings', 
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];