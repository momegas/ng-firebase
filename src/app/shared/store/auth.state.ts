import { State, Selector, Action, Store, StateContext, NgxsOnInit } from "@ngxs/store";
import * as actions from "./auth.actions";
import { AngularFireAuth } from "angularfire2/auth";
import { Router, ActivatedRoute } from "@angular/router";

export interface AuthStateModel {
  user: firebase.User;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: { user: null }
})
export class AuthState implements NgxsOnInit {
  constructor(
    private store: Store,
    private afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngxsOnInit() {
    this.afAuth.user.subscribe((user: firebase.User) => {
      this.store.dispatch(new actions.SetUser(user));
      if (!this.activatedRoute.snapshot.firstChild.routeConfig.path.includes("dashboard")) {
        this.router.navigateByUrl("dashboard/home");
      }
    });
  }

  @Selector()
  static user(state: AuthStateModel): firebase.User {
    return state.user;
  }

  @Action(actions.SetUser)
  setUser(ctx: StateContext<AuthStateModel>, { user }: actions.SetUser) {
    ctx.patchState({ user });
  }
}
