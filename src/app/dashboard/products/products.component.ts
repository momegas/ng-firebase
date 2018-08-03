import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { ProductsState } from "./products.state";
import { Observable } from "rxjs";
import { Product } from "./product";
import { BrandsState } from "../brands/brands.state";
import { Brand } from "../brands/brand";
import { AngularFireStorage, AngularFireStorageReference } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import * as filesActions from "./../files/files.actions";
import * as productsActions from "./products.actions";

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
    const filePath = `files/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(finalize(() => this.updateImages(ref, file.name)))
      .subscribe();
  }

  private updateImages(ref: AngularFireStorageReference, name: string) {
    const downloadURL = ref.getDownloadURL();
    downloadURL.subscribe(url => {
      this.store.dispatch(new filesActions.Add({ name, url }));
      this.productForm.setControl(
        "images",
        this.fb.array([...this.productForm.value.images, { url, isMain: false }])
      );
    });
  }

  onSubmit() {
    this.store.dispatch(new productsActions.Add(this.productForm.value));
    this.resetForm();
  }

  private resetForm() {
    this.productForm.reset();
    this.productForm.setControl("images", this.fb.array([]));
  }

  onDelete(id: string) {
    this.store.dispatch(new productsActions.Remove(id));
  }

  onRemoveImage(url: string) {
    this.productForm.setControl(
      "images",
      this.fb.array([...this.productForm.value.images.filter(i => i.url !== url)])
    );
  }

  onSubmitEdit() {}
}
