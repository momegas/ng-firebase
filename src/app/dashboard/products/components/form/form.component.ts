import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Store, Select } from "@ngxs/store";
import { AngularFireStorage, AngularFireStorageReference } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import * as filesActions from "../../../files/files.actions";
import * as productsActions from "../../products.actions";
import { BrandsState } from "../../../brands/brands.state";
import { Brand } from "../../../brands/brand";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Product } from "../../product";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class ProductFormComponent {
  public productForm: FormGroup;
  public uploadPercent: Observable<number>;
  @Select(BrandsState.brands) public brands$: Observable<Brand[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    this.createForm(product);
  }

  private createForm(product: Product) {
    this.productForm = this.fb.group({
      name: [(product && product.name) || "", Validators.required],
      slug: [(product && product.slug) || "", Validators.required],
      brand: [(product && product.brand) || "", Validators.required],
      images: this.fb.array((product && product.images) || [])
    });
  }

  onRemoveImage(url: string) {
    this.productForm.setControl(
      "images",
      this.fb.array([...this.productForm.value.images.filter(i => i.url !== url)])
    );
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
    if (this.product) {
      this.store.dispatch(
        new productsActions.Edit({ id: this.product.id, ...this.productForm.value })
      );
      this.productForm.reset();
      this.dialogRef.close();
      return;
    }
    this.store.dispatch(new productsActions.Add(this.productForm.value));
    this.resetForm();
  }

  private resetForm() {
    this.productForm.reset();
    this.productForm.setControl("images", this.fb.array([]));
  }
}
