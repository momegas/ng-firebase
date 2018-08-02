import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { ProductsState } from "./products.state";
import { Observable } from "rxjs";
import { Product } from "./product";
import { Add, Remove } from "./products.actions";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  public productForm: FormGroup;
  @Select(ProductsState.brands) public products$: Observable<Product[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      slug: ["", Validators.required]
    });
  }

  onSubmit() {
    this.store.dispatch(new Add(this.productForm.value));
    this.productForm.reset();
  }

  onDelete(id: string) {
    this.store.dispatch(new Remove(id));
  }

  onSubmitEdit() {}
}
