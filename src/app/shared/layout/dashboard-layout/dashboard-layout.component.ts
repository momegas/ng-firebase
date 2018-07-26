import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Logout } from "../../store/auth.actions";
import { Store, Select } from "@ngxs/store";
import { AuthState } from "../../store/auth.state";

@Component({
  selector: "app-shared/layout/dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.css"]
})
export class DashboardLayoutComponent {
  @Select(AuthState.user) user$: Observable<firebase.User>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {}

  logout() {
    this.store.dispatch(Logout);
  }
}
