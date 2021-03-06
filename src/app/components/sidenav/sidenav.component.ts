import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() linkClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickLink() {
    this.linkClicked.emit();
  }
}
