import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Add, Edit } from "../../brands.actions";
import { Brand } from "../../brand";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class BrandsFormComponent {
  public brandForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<BrandsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public brand: Brand
  ) {
    this.createForm(brand);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(brand: Brand) {
    this.brandForm = this.fb.group({
      name: [(brand && brand.name) || "", Validators.required],
      slug: [(brand && brand.slug) || "", Validators.required]
    });
  }

  onSubmit() {
    if (this.brand) {
      this.store.dispatch(new Edit({ id: this.brand.id, ...this.brandForm.value }));
      this.brandForm.reset();
      this.dialogRef.close();
      return;
    }
    this.store.dispatch(new Add(this.brandForm.value));
    this.brandForm.reset();
  }
}
