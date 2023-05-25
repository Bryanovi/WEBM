import { Injectable } from '@angular/core';

export interface IMenu {
  number: string;
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private listaMenu: IMenu[] = [
    { number: '1', title: 'Home', url: '/', icon: 'fa-solid fa-house' },
    {
      number: '2',
      title: 'Cliente',
      url: '/cliente',
      icon: 'fa-solid fa-users-line',
    },
    {
      number: '3',
      title: 'Producto',
      url: '/producto',
      icon: 'fa-solid fa-box',
    },
    {
      number: '4',
      title: 'Vendedor',
      url: '/vendedor',
      icon: 'fa-solid fa-user-tie',
    },
    {
      number: '5',
      title: 'Venta',
      url: '/venta',
      icon: 'fa-solid fa-cart-shopping',
    },
    {
      number: '6',
      title: 'Caja',
      url: '/caja',
      icon: 'fas fa-dollar-sign',
    },
  ];
  constructor() {}

  getMenu(): IMenu[] {
    return [...this.listaMenu];
  }

  getMenuByUrl(url: string): IMenu {
    return this.listaMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
