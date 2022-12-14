import {Component, Input, OnInit} from '@angular/core';
import {Api} from "../public-apis.service";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() api!: Api;
  @Input() showCategory: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
