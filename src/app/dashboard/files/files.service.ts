import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from "angularfire2/firestore";
import { File } from "./file";
import { map, finalize, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage, AngularFireStorageReference } from "angularfire2/storage";

@Injectable({
  providedIn: "root"
})
export class BrandsService {
  private itemsCollection: AngularFirestoreCollection<File>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.itemsCollection = afs.collection<File>("files");
  }

  public upload(file: any) {
    const { name } = file;
    const path = `files/${name}`;
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    task
      .snapshotChanges()
      .pipe(finalize(() => this.updateFiles(fileRef, name)))
      .subscribe();
  }

  private updateFiles(ref: AngularFireStorageReference, name: string) {
    const downloadURL = ref.getDownloadURL();
    downloadURL.pipe(filter(url => !!url)).subscribe(url => this.add({ url, name }));
  }

  public add(file: File): void {
    this.itemsCollection.add(file);
  }

  public delete(id: string, name: string): void {
    this.storage
      .ref(`files/${name}`)
      .delete()
      .subscribe(() => {}, e => console.log(e), () => this.itemsCollection.doc(id).delete());
  }

  public edit(file: File): void {}

  public getAll(): Observable<File[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map((files: DocumentChangeAction<File>[]) =>
        files.map(
          (b: DocumentChangeAction<File>): File => {
            const id = b.payload.doc.id;
            const data = b.payload.doc.data();
            return { id, ...data };
          }
        )
      )
    );
  }
}
