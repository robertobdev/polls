import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnInit,
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
import { AclService } from '../services/acl.service';

@Component({
  selector: 'app-list-acl',
  templateUrl: './list-acl.component.html',
  styleUrls: ['./list-acl.component.scss'],
})
export class ListAclComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['module', 'role', 'actions'];
  filteredAndPagedIssues!: Observable<any>;

  formSearch: FormGroup;
  searchEmitter: BehaviorSubject<any>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _aclService: AclService, private _fb: FormBuilder) {
    this.formSearch = this._fb.group({
      search_value: [null],
    });
    this.searchEmitter = new BehaviorSubject<null>(null);
  }

  onSearch(): void {
    this.searchEmitter.next(this.formSearch.value);
  }

  ngOnInit(): void {
    // load the initial page
    this._aclService.getAcls();
  }

  ngAfterViewInit(): void {
    this.filteredAndPagedIssues = merge(
      this.sort?.sortChange,
      this.paginator?.page,
      this.searchEmitter.pipe(debounceTime(500), distinctUntilChanged())
    ).pipe(
      switchMap(() => {
        this.isLoadingResults = true;
        return this._aclService.getAcls();
      }),
      map(({ data }) => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        // this.resultsLength = data.total_count;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return

        return data.acls.nodes;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    );
  }
  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }
}
