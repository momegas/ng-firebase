import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Add } from "../../brands.actions";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent {
  public brandForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<FormComponent>
  ) {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
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
}
