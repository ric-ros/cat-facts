import { Component, OnInit } from '@angular/core';
import { User } from './models/factRes.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  events: string[] = [];
  opened: boolean = false;

  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
  }

  logout() {
    this.accountService.logout();
  }
}
