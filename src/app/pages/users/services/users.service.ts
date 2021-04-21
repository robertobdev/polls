import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IListApi } from 'src/app/shared/interfaces/listApi.interface';

const usersData: IListApi = {
  items: [
    {
      id: 1,
      name: 'Beatriz Milena Jennifer Jesus',
      cpf: '183.158.278-39',
      birthday: '21/10/1945',
      gender: 'Feminino',
      email: 'beatrizmilenajenniferjesus@fibria.com.br',
    },
    {
      id: 2,
      name: 'Laís Julia Heloise da Rosa',
      cpf: '638.767.342-90',
      birthday: '07/02/2000',
      gender: 'Feminino',
      email: 'llaisjuliaheloisedarosa@ufscar.br',
    },
    {
      id: 3,
      name: 'Valentina Sabrina Allana Lima',
      cpf: '004.441.784-57',
      birthday: '11/12/1967',
      gender: 'Feminino',
      email: 'vvalentinasabrinaallanalima@metraseg.com.br',
    },
    {
      id: 4,
      name: 'Elaine Flávia Teixeira',
      cpf: '423.058.476-88',
      birthday: '27/03/1969',
      gender: 'Feminino',
      email: 'elaineflaviateixeira@bessa.net.br',
    },
    {
      id: 5,
      name: 'Theo Augusto Danilo Martins',
      cpf: '617.057.474-77',
      birthday: '10/08/1973',
      gender: 'Masculino',
      email: 'theoaugustodanilomartins@dinamicaconsultoria.com',
    },
    {
      id: 6,
      name: 'Isabelly Fátima Allana Lima',
      cpf: '870.277.186-18',
      birthday: '27/06/1952',
      gender: 'Feminino',
      email: 'iisabellyfatima@konzeption.com.br',
    },
    {
      id: 7,
      name: 'Nicolas Danilo Elias Martins',
      cpf: '233.477.710-28',
      birthday: '09/04/1962',
      gender: 'Masculino',
      email: 'nicolasdaniloeliasmartins-93@gmx.de',
    },
    {
      id: 8,
      name: 'Marlene Stella Mendes',
      cpf: '299.308.086-55',
      birthday: '26/10/1974',
      gender: 'Feminino',
      email: 'marlenestellamendes-81@gradu.if.ufrj.br',
    },
    {
      id: 9,
      name: 'Carlos Eduardo Luan Carlos Cardoso',
      cpf: '672.604.514-08',
      birthday: '22/11/1963',
      gender: 'Masculino',
      email: 'arloseduardoluancarloscardoso@solucao.adm.br',
    },
    {
      id: 10,
      name: 'Patrícia Sarah Melo',
      cpf: '351.921.860-72',
      birthday: '01/01/1942',
      gender: 'Feminino',
      email: 'ppatriciasarahmelo@gruposeteestrelas.com.br',
    },
  ],
  total_count: 10,
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _httpClient: HttpClient) {}

  getUsers(
    sort: string,
    order: string,
    page: number,
    search: any
  ): Observable<IListApi> {
    return of(usersData).pipe(delay(500));
  }
}
