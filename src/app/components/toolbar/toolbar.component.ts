import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() isLogged!: boolean;
  @Output() menuClicked = new EventEmitter();
  @Output() logoutClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickMenu() {
    this.menuClicked.emit();
  }

  onClickLogout() {
    this.logoutClicked.emit();
  }
}
