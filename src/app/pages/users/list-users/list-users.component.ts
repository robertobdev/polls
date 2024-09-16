import {
  Component,
  ViewChild,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';
interface Search {
  filter: string;
}
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'cpf', 'actions'];
  filteredAndPagedUsers: User[] = [];

  formSearch: FormGroup;
  searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  resultsLength = 0;
  //TODO: See this
  //TODO: See angular order in eslint variables
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _peopleService: UsersService) {
    this.formSearch = new FormGroup({
      filter: new FormControl('', []),
    });
  }

  onSearch(): void {
    this.searchEmitter.emit(this.formSearch.value);
  }

  ngAfterViewInit(): void {
    merge(
      this.sort?.sortChange,
      this.paginator?.page,
      this.searchEmitter.pipe(debounceTime(500), distinctUntilChanged())
    )
      .pipe(
        startWith([]),
        switchMap(() => {
          this.isLoadingResults = true;
          const direction = this.sort.direction as 'asc' | 'desc';
          return this._peopleService.getPeople({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...this.formSearch.value,
            field: this.sort.active,
            order: direction,
            page: this.paginator.pageIndex + 1,
          });
        }),
        map((data) => {
          const { nodes, totalCount } = data.data.people;
          this.resultsLength = totalCount;
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          return nodes;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.filteredAndPagedUsers = data));
  }
}
