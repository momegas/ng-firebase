import { Brand } from "./brand";

const from = "Brands";

export class Set {
  static type = `[${from}] Set`;
  constructor(public brands: Brand[]) {}
}

export class Add {
  static type = `[${from}] Add`;
  constructor(public brand: Brand) {}
}

export class Remove {
  static type = `[${from}] Remove`;
  constructor(public id: string) {}
}

export class Edit {
  static type = `[${from}] Edit`;
  constructor(public brand: Brand) {}
}
