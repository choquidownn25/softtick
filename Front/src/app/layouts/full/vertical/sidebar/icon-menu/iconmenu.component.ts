import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { menuItems } from './iconmenu-data';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatListItem, MatNavList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { navItems } from '../sidebar-data';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-iconmenu',
  standalone: true,
  templateUrl: './iconmenu.component.html',
  imports: [TablerIconsModule, MatListItem, MatNavList, MatButtonModule, MatTooltipModule],
})
export class IconMenuComponent implements OnInit {
  options = this.settings.getOptions();
  menuItems = menuItems;
  getFlattenedItems(items: any[]): any[] {
    let result: any[] = [];
    for (let item of items) {
      result.push(item);
      if (item.subItems) {
        result = result.concat(this.getFlattenedItems(item.subItems));
      }
    }
    return result;
  }
  findId: any;
  selectedMenu: any;
  @Output() toggleCollapsed = new EventEmitter<void>();
  @Output() openClosedMenu = new EventEmitter<void>();
  @Output() iconSelected = new EventEmitter<number>();
  constructor(
    private settings: CoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectIcon(icon: number) {
    this.iconSelected.emit(icon);
    this.selectedMenu = icon;
  }
  findParentRouteId(routes: any, url: any): any {
    for (const route of routes) {
      if (route.route === url) {
        return route.id;
      }
      if (route.children) {
        for (const child of route.children) {
          if (child.route === url) {
            return route.id;
          }
        }
      }
    }
    return null;
  }
  ngOnInit(): void {
    // Get the current URL

    this.selectedMenu = this.findParentRouteId(navItems, this.router.url);
    console.log(this.selectedMenu);
  }
}
