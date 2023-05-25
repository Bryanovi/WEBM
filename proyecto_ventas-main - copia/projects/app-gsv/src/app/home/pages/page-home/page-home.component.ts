import { Component } from '@angular/core';
import { IMenu, MenuService } from '../../../helper/services/menu.service';

@Component({
  selector: 'gsv-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent {
  listaMenu: IMenu[];
  // @Input() sideNavStatus: boolean = false;

  constructor(private menuServicio: MenuService) {
    this.listaMenu = menuServicio.getMenu();
  }
}
