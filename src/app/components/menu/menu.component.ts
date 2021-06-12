import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline',
    },
    {
      title: 'Cases',
      link: 'cases',
      icon: 'briefcase-outline',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];

}
