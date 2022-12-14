import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, share, take} from "rxjs";

const URL = 'https://api.publicapis.org/entries';

export interface Api {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export interface ApiResponse {
  count: number;
  entries: Api[];
}

@Injectable({
  providedIn: 'root'
})
export class PublicApisService {
  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(URL).pipe(take(1), share());
  }
}
