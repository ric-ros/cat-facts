import { animate, style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { firstValueFrom, map, zip } from 'rxjs';
import { CatRes, FactRes, FactsRes } from 'src/app/models/factRes.model';
import { FactService } from 'src/app/services/fact.service';

@Component({
  selector: 'app-cat-facts',
  templateUrl: './cat-facts.component.html',
  styleUrls: ['./cat-facts.component.scss'],
})
export class CatFactsComponent implements OnInit {
  fact?: FactsRes;
  idCounter: number = 0;

  @ViewChild(NgxMasonryComponent) mansory!: NgxMasonryComponent;

  mansoryOpts: NgxMasonryOptions = {
    originTop: false,
    animations: {
      show: [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ],
      hide: [
        style({ opacity: '*' }),
        animate('400ms ease-in', style({ opacity: 0 })),
      ],
    },
  };

  constructor(private http: HttpClient, private factService: FactService) {}

  ngOnInit(): void {
    this.fact = this.factService.fact;
  }

  async getRandomFact() {
    this.fact = await this.factService.getFacts();
  }

  deleteFact(el: HTMLElement, id?: number) {
    this.mansory.remove(el);
    this.fact = this.factService.deleteFacts(id);
  }
}
