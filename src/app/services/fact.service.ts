import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, zip } from 'rxjs';
import { CatRes, FactRes, FactsRes } from '../models/factRes.model';

@Injectable({
  providedIn: 'root',
})
export class FactService {
  private _fact?: FactsRes;
  idCounter: number = 0;

  constructor(private http: HttpClient) {}

  get fact() {
    return this._fact;
  }
  async getFacts() {
    const factSub = this.http.get<FactRes>('https://catfact.ninja/fact');

    const catSub = this.http.get<CatRes[]>(
      'https://api.thecatapi.com/v1/images/search'
    );

    const zippedSubs = zip(factSub, catSub).pipe(
      map((x) => {
        x[0].id = this.idCounter++;
        x[0].img = x[1][0].url;
        return x[0];
      })
    );

    const res: FactRes = await firstValueFrom(zippedSubs);

    if (this._fact == undefined) {
      this._fact = await firstValueFrom(
        this.http.get<FactsRes>('https://catfact.ninja/facts')
      );

      this._fact.data = [];
    }
    this._fact.data.push(res);

    return this._fact;
  }

  deleteFacts(id?: number) {
    if (this._fact !== undefined) {
      this._fact.data = this._fact.data.filter((x) => x.id !== id);
    }

    return this._fact;
  }
}
