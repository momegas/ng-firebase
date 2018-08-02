import { State, NgxsOnInit, Store, Selector, Action, StateContext } from "@ngxs/store";
import { Brand } from "./brand";
import * as actions from "./brands.actions";
import { BrandsService } from "./brands.service";

export interface BrandsStateModel {
  brands: Brand[];
}

@State<BrandsStateModel>({
  name: "brands",
  defaults: { brands: [] }
})
export class BrandState implements NgxsOnInit {
  constructor(private store: Store, private service: BrandsService) {
    service.getAll().subscribe((brands: Brand[]) => this.store.dispatch(new actions.Set(brands)));
  }

  ngxsOnInit() {}

  @Selector()
  static brands(state: BrandsStateModel): Brand[] {
    return state.brands;
  }

  @Action(actions.Set)
  set(ctx: StateContext<BrandsStateModel>, { brands }: actions.Set) {
    ctx.setState({ brands });
  }

  @Action(actions.Add)
  add(ctx: StateContext<BrandsStateModel>, { brand }: actions.Add) {
    this.service.add(brand);
  }

  @Action(actions.Remove)
  remove(ctx: StateContext<BrandsStateModel>, { id }: actions.Remove) {
    this.service.delete(id);
  }
}
