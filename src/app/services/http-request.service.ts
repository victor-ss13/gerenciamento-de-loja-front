// src/app/services/http-request.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private _apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  /**
   * Requisição POST
   */
  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.httpRequest('post', url, { body: body, ...options });
  }

  /**
   * Requisição POST que retorna Blob (para download de arquivos)
   */
  postBlob<T>(url: string, body: any): Observable<T> {
    return this.httpRequest('post', url, { 
      body: body, 
      observe: 'response', 
      responseType: 'blob' 
    });
  }

  /**
   * Requisição POST com FormData (upload de arquivos)
   */
  postFormData<T>(url: string, formData: FormData, options?: any): Observable<T> {
    return this.httpRequest('post', url, { body: formData, ...options });
  }

  /**
   * Requisição GET
   */
  get<T>(url: string, params?: any): Observable<T> {
    return this.httpRequest('get', url, { params: params });
  }

  /**
   * Requisição GET que retorna Blob (para download de arquivos)
   */
  getBlob(url: string, params?: any): Observable<HttpResponse<Blob>> {
    return this.httpRequestBlob('get', url, { 
      params: params, 
      observe: 'response', 
      responseType: 'blob' 
    });
  }

  /**
   * Requisição PUT
   */
  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.httpRequest('put', url, { body: body, ...options });
  }

  /**
   * Requisição DELETE
   */
  delete<T>(url: string, options?: any): Observable<T> {
    return this.httpRequest('delete', url, { ...options });
  }

  /**
   * Método privado para requisições HTTP genéricas
   */
  private httpRequest(method: string, url: string, options: any): Observable<any> {
    const fullUrl = `${this._apiUrl}${url}`;
    
    if (environment.enableDebugLogs) {
      console.log(`[HTTP ${method.toUpperCase()}]`, fullUrl, options);
    }

    return this._http.request(method, fullUrl, { ...options }).pipe(take(1));
  }

  /**
   * Método privado para requisições HTTP que retornam Blob
   */
  private httpRequestBlob(method: string, url: string, options: any): Observable<any> {
    const fullUrl = `${this._apiUrl}${url}`;
    
    if (environment.enableDebugLogs) {
      console.log(`[HTTP ${method.toUpperCase()} BLOB]`, fullUrl);
    }

    return this._http.request(method, fullUrl, { ...options }).pipe(take(1));
  }
}