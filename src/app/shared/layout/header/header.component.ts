import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Logout } from "../../store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(Logout);
  }
}
