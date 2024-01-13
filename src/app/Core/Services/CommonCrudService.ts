import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseModel } from '../Models/ResponseModels/ResponseModel';
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { PaginationResponseModel } from "../Models/ResponseModels/PaginationResponseModel";
import { PaginationParam } from "../Models/ResponseModels/PaginationParam";


@Injectable({
  providedIn: 'root'
})
export class CommonCrudService {
    private apiUrl = environment.apiURL

  constructor(private _http: HttpClient,private _router: Router) { }
  public post = (url:string,body: any,data:any) => {
    return this._http.post<ResponseModel<typeof data>>(this.apiUrl + url, body)
    .pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      })) 
    }

  public delete = (url: string) => {
    return this._http.delete<ResponseModel<boolean>>(this.apiUrl +url);
  }

  public getAll = (url: string, paginationParams: PaginationParam, data : any)=> {
      const params = new HttpParams()
        .set('PageNumber',  paginationParams.PageNumber)
        .set('PageSize', paginationParams.PageSize);
  
      return this._http.get<PaginationResponseModel<typeof data>>(`${this.apiUrl}${url}`, { params })
      .pipe(
            tap((response: any) => {   if (response.statusCode == 401) {
                      this._router.navigateByUrl("/auth/login");
                  }
          })
      );
    }

  public get = (url: string,data:any) => {
    return this._http.get<ResponseModel<typeof data>>(this.apiUrl + url)
    .pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }))
  }
  public postFile = (url: string,model:any) => {
    return this._http.post(this.apiUrl +url, model,{
      reportProgress: true,
      responseType: 'blob'
    }).pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }));
  }
  public  getFile = (url: string) => {
    return this._http.get(this.apiUrl +url,{
      reportProgress: true,
      responseType: 'blob'
    }).pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }));
  }
  public postFileWithFormData = async (file,Id,url:string,data:any)  => {

    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    formData.append('id', Id);
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'multipart/form-data');
    _headers.append('Accept', 'application/json');

    return this._http.post<ResponseModel<typeof data>>(this.apiUrl +url, formData, { headers: _headers }).pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }))
  }
  public parseFile = async (file,url:string,data:any)  => {

    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'multipart/form-data');
    _headers.append('Accept', 'application/json');

    return this._http.post<ResponseModel<typeof data >>(url, formData, { headers: _headers }).pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }))
  }

  uploadFile(file: File, url:string, data:any) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    return this._http.post<ResponseModel<typeof data>>(this.apiUrl + url, formData).pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }));
  }

  public update = (url:string,body: any,data:any) => {
    return this._http.put<ResponseModel<typeof data>>(this.apiUrl +url, body);  //"Lockup/"+id
  }
  public getWithParam = async (url: string,params:any,data:any) => {
    return this._http.get<ResponseModel<typeof data>>(this.apiUrl +url, { params: { params} }).pipe(
      tap((response: any) => {   if (response.statusCode == 401) {
                this._router.navigateByUrl("/auth/login");
               }
      }))
  }
}