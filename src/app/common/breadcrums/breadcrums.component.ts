import { Component, OnInit, Input } from '@angular/core';
import { AuthGuard } from '../../auth/shared/auth.guard';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.scss']
})
export class BreadcrumsComponent implements OnInit {

  @Input() isAdmin;
  @Input() breadCrumsItems: string[] = [];
  activePage: string;

  constructor() { }

  ngOnInit() {
    this.activePage = this.breadCrumsItems[this.breadCrumsItems.length -1];
    
  }

}
