import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() name!: string | undefined;
  @Input() avatar!: string | undefined;
  @Output() toogle = new EventEmitter();
  @Output() logout = new EventEmitter();

  handleToogle(): void {
    this.toogle.emit();
  }

  handleLogout(): void {
    this.logout.emit();
  }
}
