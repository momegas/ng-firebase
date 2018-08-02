import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { Add, Remove } from "./brands.actions";
import { BrandsState } from "./brands.state";
import { Observable } from "rxjs";
import { Brand } from "./brand";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.css"]
})
export class BrandsComponent {
  public brandForm: FormGroup;
  @Select(BrandsState.brands) public brands$: Observable<Brand[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.brandForm = this.fb.group({
      name: ["", Validators.required],
      slug: ["", Validators.required]
    });
  }

  onSubmit() {
    this.store.dispatch(new Add(this.brandForm.value));
    this.brandForm.reset();
  }

  onDelete(id: string) {
    this.store.dispatch(new Remove(id));
  }

  onSubmitEdit() {}
}
