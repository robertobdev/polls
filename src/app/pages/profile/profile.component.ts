import { Component } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  menus = [
    {
      name: 'Dados principais',
      router: '/profile/user',
    },
    {
      name: 'Endereços',
      router: '/profile/addresses',
    },
    {
      name: 'Contatos',
      router: '/profile/contacts',
    },
    {
      name: 'Documentos',
      router: '/profile/documents',
    },
    {
      name: 'Alterar Senha ',
      router: '/profile/change-password',
    },
  ];
}
