import { animate, style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { firstValueFrom, map, zip } from 'rxjs';
import { CatRes, FactRes, FactsRes } from 'src/app/models/factRes.model';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getRandomFact() {
    const factSub = this.http.get<FactRes>('https://catfact.ninja/fact');

    const catSub = this.http.get<CatRes[]>(
      'https://api.thecatapi.com/v1/images/search'
    );

    zip(factSub, catSub)
      .pipe(
        map((x) => {
          x[0].id = this.idCounter++;
          x[0].img = x[1][0].url;
          return x[0];
        })
      )
      .subscribe(async (res) => {
        if (this.fact == undefined) {
          this.fact = await firstValueFrom(
            this.http.get<FactsRes>('https://catfact.ninja/facts')
          );

          this.fact.data = [];
        }
        this.fact.data.push(res);
      });

    console.log(this.fact?.data.length);
  }

  deleteFact(el: HTMLElement, id?: number) {
    this.mansory.remove(el);
    if (this.fact !== undefined)
      this.fact.data = this.fact.data.filter((x) => x.id !== id);
  }
}
