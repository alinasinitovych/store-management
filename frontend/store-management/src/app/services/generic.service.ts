import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export class GenericService<T> {
  protected baseUrl : string = environment.apiUrl;
  constructor(protected http: HttpClient, protected apiUrl: string) { }

  public create(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${this.apiUrl}/create`, item);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.apiUrl}/${id}`);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.apiUrl}`);
  }

  public update(item: T, id: number): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${this.apiUrl}/${id}`, item);
  }

  public delete(id: number): Observable<T> {
    console.log(`${this.baseUrl}${this.apiUrl}/${id}`);
    return this.http.delete<T>(`${this.baseUrl}${this.apiUrl}/${id}`);
}

  
}