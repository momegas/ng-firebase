import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { ProductsState } from "./products.state";
import { Observable } from "rxjs";
import { Product } from "./product";
import { Add, Remove } from "./products.actions";
import { BrandsState } from "../brands/brands.state";
import { Brand } from "../brands/brand";
import { AngularFireStorage, AngularFireStorageReference } from "angularfire2/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  public productForm: FormGroup;
  public uploadPercent: Observable<number>;
  @Select(ProductsState.products) public products$: Observable<Product[]>;
  @Select(BrandsState.brands) public brands$: Observable<Brand[]>;

  constructor(private fb: FormBuilder, private store: Store, private storage: AngularFireStorage) {
    this.createForm();
  }

  private createForm() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      slug: ["", Validators.required],
      brand: ["", Validators.required],
      images: this.fb.array([])
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => this.updateImages(ref)))
      .subscribe();
  }

  private updateImages(ref: AngularFireStorageReference) {
    const downloadURL = ref.getDownloadURL();
    downloadURL.subscribe(url =>
      this.productForm.setControl(
        "images",
        this.fb.array([...this.productForm.value.images, { url, isMain: false }])
      )
    );
  }

  onSubmit() {
    this.store.dispatch(new Add(this.productForm.value));
    this.resetForm();
  }

  private resetForm() {
    this.productForm.reset();
    this.productForm.setControl("images", this.fb.array([]));
  }

  onDelete(id: string) {
    this.store.dispatch(new Remove(id));
  }

  onSubmitEdit() {}
}
