import {Component, OnInit} from '@angular/core';
import {Api, ApiResponse, PublicApisService} from "./public-apis.service";
import {map, Observable} from "rxjs";

type CategoryName = string;
type ApiMap = {[key: CategoryName]: Api[]};

interface ApisByCategory {
  count: number;
  apiMap: ApiMap;
  categories: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apisByCategory$!: Observable<ApisByCategory>;
  apiResponse$!: Observable<ApiResponse>
  category: string | null = null;
  searchTerm: string = '';

  constructor(private readonly publicApiService: PublicApisService) { }

  ngOnInit() {
    this.apiResponse$ = this.publicApiService.getAll();
    this.apisByCategory$ = this.apiResponse$.pipe(
      map((apiResponse: ApiResponse): ApisByCategory => {
        const apiMap: ApiMap = apiResponse.entries.reduce((acc: ApiMap, entry: Api) => {
          if(!acc[entry.Category]) {
            acc[entry.Category] = [];
          }
          acc[entry.Category].push(entry);
          return acc;
        }, {});
        const categories: string[] = Object.keys(apiMap).sort();
        return {apiMap, categories, count: apiResponse.count};
      })
    );
  }

  setCategoery(category: string) {
    this.searchTerm = '';
    this.category = category;
  }
}
