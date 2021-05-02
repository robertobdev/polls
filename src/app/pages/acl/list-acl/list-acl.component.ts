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
import { Acl } from 'src/app/shared/interfaces/acl.interface';
import { AclService } from '../services/acl.service';

interface Search {
  filter: string;
}
@Component({
  selector: 'app-list-acl',
  templateUrl: './list-acl.component.html',
  styleUrls: ['./list-acl.component.scss'],
})
export class ListAclComponent implements AfterViewInit {
  displayedColumns: string[] = ['module_id', 'role_id', 'actions'];
  filteredAndPagedAcls: Acl[] = [];

  formSearch: FormGroup;
  searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  resultsLength = 0;
  //TODO: See this
  //TODO: See angular order in eslint variables
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _aclService: AclService) {
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
          console.log(this.sort.direction.toLocaleUpperCase());
          const direction = this.sort.direction as 'asc' | 'desc';
          return this._aclService.getAcls({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...this.formSearch.value,
            field: this.sort.active,
            order: direction,
            page: this.paginator.pageIndex + 1,
          });
        }),
        map((data) => {
          console.log('here twice?');
          const { nodes, totalCount } = data.data.acls;
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
      .subscribe((data) => (this.filteredAndPagedAcls = data));
  }
}
