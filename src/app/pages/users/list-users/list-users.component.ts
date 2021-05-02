import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable, of as observableOf } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'cpf', 'email', 'actions'];
  filteredAndPagedIssues!: Observable<any>;

  formSearch: FormGroup;
  searchEmitter: BehaviorSubject<any>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _usersService: UsersService, private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      search_value: [null],
    });
    this.searchEmitter = new BehaviorSubject<null>(null);
  }

  onSearch(): void {
    this.searchEmitter.next(this.formSearch.value);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.filteredAndPagedIssues = merge(
        this.sort?.sortChange,
        this.paginator?.page,
        this.searchEmitter.pipe(debounceTime(500), distinctUntilChanged())
      ).pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._usersService.getUsers(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.searchEmitter.value
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      );
    }, 5000);
  }
  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }
}
