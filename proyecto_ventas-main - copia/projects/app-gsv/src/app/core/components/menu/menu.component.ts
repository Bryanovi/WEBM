import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMenu, MenuService } from '../../../helper/services/menu.service';

@Component({
  selector: 'gsv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  listaMenu: IMenu[];
  @Input() sideNavStatus: boolean = false;

  constructor(private menuServicio: MenuService) {
    this.listaMenu = menuServicio.getMenu();
  }
}
