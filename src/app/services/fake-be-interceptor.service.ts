import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  delay,
  dematerialize,
  materialize,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { User } from '../models/factRes.model';

// array in local storage for registered users
const usersKey = 'allRegisteredUsers';
let users: User[] = localStorage.getItem(usersKey)
  ? JSON.parse(localStorage.getItem(usersKey)!)
  : [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    const timeDelayed: number = 500; //fake a request delay

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token',
      });
    }

    function register() {
      const user = body;

      if (users.find((x) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map((x) => x.id || 0)) + 1 : 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find((x) => x.id === idFromUrl());
      return ok(basicDetails(user));
    }

    function updateUser() {
      if (!isLoggedIn()) return unauthorized();

      let params = body;
      let user = users.find((x) => x.id === idFromUrl());

      // only update password if entered
      if (!params.password) {
        delete params.password;
      }

      // update and save user
      user = new User(params);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    // helper functions

    function ok(body?: User | User[]) {
      return of(new HttpResponse({ status: 200, body })).pipe(
        delay(timeDelayed)
      ); // delay observable to simulate server api call
    }

    function error(message: string) {
      return throwError({ error: { message } }).pipe(
        materialize(),
        delay(timeDelayed),
        dematerialize()
      ); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function unauthorized() {
      return throwError({
        status: 401,
        error: { message: 'Unauthorized' },
      }).pipe(materialize(), delay(timeDelayed), dematerialize());
    }

    function basicDetails(user: User | undefined) {
      if (user) {
        const { id, username, firstName, lastName } = user;
        return { id, username, firstName, lastName };
      }

      return;
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
