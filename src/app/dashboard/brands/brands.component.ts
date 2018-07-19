import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.css"]
})
export class BrandsComponent {
  brandForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.brandForm = this.fb.group({
      name: ["", Validators.required],
      slug: ["", Validators.required]
    });
  }
}
