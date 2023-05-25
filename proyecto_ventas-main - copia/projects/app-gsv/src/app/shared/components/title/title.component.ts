import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMenu, MenuService } from '../../../helper/services/menu.service';

@Component({
  selector: 'gsv-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent {
  path: IMenu;

  constructor(
    private menuServicio: MenuService,
    private activatedRoute: ActivatedRoute
  ) {
    const urlActiva =
      '/' + this.activatedRoute.snapshot.pathFromRoot[1].routeConfig?.path;
    this.path = this.menuServicio.getMenuByUrl(urlActiva);
    console.log(urlActiva);
    console.log(this.path.icon);
  }
}
