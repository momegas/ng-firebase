import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, Select } from "@ngxs/store";
import { Add, Remove } from "./files.actions";
import { FilesState } from "./files.state";
import { Observable } from "rxjs";
import { File } from "./file";

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"]
})
export class FilesComponent {
  @Select(FilesState.files) public files$: Observable<File[]>;

  constructor(private store: Store) {}

  uploadFile(event) {
    this.store.dispatch(new Add(event.target.files[0]));
  }

  onDelete(id: string, name: string) {
    this.store.dispatch(new Remove(id, name));
  }
}
