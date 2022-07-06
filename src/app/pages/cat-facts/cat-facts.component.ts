import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, zip } from 'rxjs';
import { CatRes, FactRes } from 'src/app/models/factRes.model';

@Component({
  selector: 'app-cat-facts',
  templateUrl: './cat-facts.component.html',
  styleUrls: ['./cat-facts.component.scss'],
})
export class CatFactsComponent implements OnInit {
  facts: FactRes[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getRandomFact() {
    const factSub = this.http.get<FactRes>(
      'https://cat-fact.herokuapp.com/facts/random'
    );

    const catSub = this.http.get<CatRes[]>(
      'https://api.thecatapi.com/v1/images/search'
    );

    zip(factSub, catSub)
      .pipe(
        map((x) => {
          x[0].img = x[1][0].url;
          return x[0];
        })
      )
      .subscribe((x) => {
        this.facts.push(x);
      });
  }

  deleteFact(factId: string) {
    this.facts = this.facts.filter((x) => x._id != factId);
  }
}
