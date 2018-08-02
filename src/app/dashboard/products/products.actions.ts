import { Product } from "./product";

const from = "Products";

export class Set {
  static type = `[${from}] Set`;
  constructor(public products: Product[]) {}
}

export class Add {
  static type = `[${from}] Add`;
  constructor(public product: Product) {}
}

export class Remove {
  static type = `[${from}] Remove`;
  constructor(public id: string) {}
}

export class Edit {
  static type = `[${from}] Edit`;
  constructor(public product: Product) {}
}
