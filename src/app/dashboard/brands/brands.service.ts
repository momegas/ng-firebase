import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "angularfire2/firestore";
import { Brand } from "./brand";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BrandsService {
  private itemsCollection: AngularFirestoreCollection<Brand>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Brand>("brands");
  }

  public add(brand: Brand): void {
    this.itemsCollection.add(brand);
  }

  public delete(id: string): void {
    this.itemsCollection.doc(id).delete();
  }

  public edit(brand: Brand): void {}

  public getAll(): Observable<Brand[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map((brands: DocumentChangeAction<Brand>[]) =>
        brands.map(
          (b: DocumentChangeAction<Brand>): Brand => {
            const id = b.payload.doc.id;
            const data = b.payload.doc.data();
            return { id, ...data };
          }
        )
      )
    );
  }
}
