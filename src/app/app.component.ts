import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { AuthState } from "./shared/store/auth.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @Select(AuthState.user) user$: firebase.User;
}
