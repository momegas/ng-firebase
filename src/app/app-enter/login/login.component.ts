import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import { Select } from "@ngxs/store";
import { AuthState } from "../../shared/store/auth.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  @Select(AuthState.user) user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
