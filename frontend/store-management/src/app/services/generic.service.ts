import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GenericService<T> {
  constructor(protected http: HttpClient, protected apiUrl: string) { }

  public create(item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}`, item);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`);
  }

  public update(item: T, id: number): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}