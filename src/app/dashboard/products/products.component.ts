import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { ProductsState } from "./products.state";
import { Observable } from "rxjs";
import { Product } from "./product";
import { BrandsState } from "../brands/brands.state";
import { Brand } from "../brands/brand";
import * as productsActions from "./products.actions";
import { MatDialog } from "@angular/material";
import { ProductFormComponent } from "./components/form/form.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  @Select(ProductsState.products) public products$: Observable<Product[]>;

  constructor(private store: Store, public dialog: MatDialog) {}

  openDialog(product?: Product) {
    const width = "450px";
    if (product) {
      const dialogRef = this.dialog.open(ProductFormComponent, { width, data: product });
      return;
    }
    const dialogRef = this.dialog.open(ProductFormComponent, { width });
  }

  onDelete(id: string) {
    this.store.dispatch(new productsActions.Remove(id));
  }

  onSubmitEdit() {}
}
