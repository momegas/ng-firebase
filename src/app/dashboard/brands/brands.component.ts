import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Remove } from "./brands.actions";
import { BrandsState } from "./brands.state";
import { Observable } from "rxjs";
import { Brand } from "./brand";
import { MatDialog } from "@angular/material";
import { FormComponent } from "./components/form/form.component";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.css"]
})
export class BrandsComponent {
  @Select(BrandsState.brands) public brands$: Observable<Brand[]>;

  constructor(private store: Store, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, { width: "450px" });
  }

  onDelete(id: string) {
    this.store.dispatch(new Remove(id));
  }

  onSubmitEdit() {}
}
