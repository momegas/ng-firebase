import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { tap, take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map(authState => !!authState),
      tap(auth => (!auth ? this.router.navigate(["/login"]) : true))
    );
  }
}
