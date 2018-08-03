import { State, NgxsOnInit, Store, Selector, Action, StateContext } from "@ngxs/store";
import { File } from "./file";
import * as actions from "./files.actions";
import { BrandsService } from "./files.service";

export interface FilesBrandsStateModel {
  files: File[];
}

@State<FilesBrandsStateModel>({
  name: "files",
  defaults: { files: [] }
})
export class FilesState implements NgxsOnInit {
  constructor(private store: Store, private service: BrandsService) {
    service.getAll().subscribe((files: File[]) => this.store.dispatch(new actions.Set(files)));
  }

  ngxsOnInit() {}

  @Selector()
  static files(state: FilesBrandsStateModel): File[] {
    return state.files;
  }

  @Action(actions.Set)
  set(ctx: StateContext<FilesBrandsStateModel>, { files }: actions.Set) {
    ctx.setState({ files });
  }

  @Action(actions.Upload)
  upload(ctx: StateContext<FilesBrandsStateModel>, { file }: actions.Upload) {
    this.service.upload(file);
  }

  @Action(actions.Add)
  add(ctx: StateContext<FilesBrandsStateModel>, { file }: actions.Add) {
    this.service.add(file);
  }

  @Action(actions.Remove)
  remove(ctx: StateContext<FilesBrandsStateModel>, { id, name }: actions.Remove) {
    this.service.delete(id, name);
  }
}
