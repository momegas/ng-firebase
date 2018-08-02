import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "angularfire2/firestore";
import { Product } from "./product";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private itemsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Product>("products");
  }

  public add(product: Product): void {
    this.itemsCollection.add(product);
  }

  public delete(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public edit(product: Product): void {}

  public getAll(): Observable<Product[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map((products: DocumentChangeAction<Product>[]) =>
        products.map(
          (b: DocumentChangeAction<Product>): Product => {
            const id = b.payload.doc.id;
            const data = b.payload.doc.data();
            return { id, ...data };
          }
        )
      )
    );
  }
}
