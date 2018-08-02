import { State, NgxsOnInit, Store, Selector, Action, StateContext } from "@ngxs/store";
import { Product } from "./product";
import * as actions from "./products.actions";
import { ProductsService } from "./products.service";

export interface productsStateModel {
  products: Product[];
}

@State<productsStateModel>({
  name: "products",
  defaults: { products: [] }
})
export class ProductsState implements NgxsOnInit {
  constructor(private store: Store, private service: ProductsService) {
    service
      .getAll()
      .subscribe((products: Product[]) => this.store.dispatch(new actions.Set(products)));
  }

  ngxsOnInit() {}

  @Selector()
  static products(state: productsStateModel): Product[] {
    return state.products;
  }

  @Action(actions.Set)
  set(ctx: StateContext<productsStateModel>, { products }: actions.Set) {
    ctx.setState({ products });
  }

  @Action(actions.Add)
  add(ctx: StateContext<productsStateModel>, { product }: actions.Add) {
    this.service.add(product);
  }

  @Action(actions.Remove)
  remove(ctx: StateContext<productsStateModel>, { id }: actions.Remove) {
    this.service.delete(id);
  }
}
