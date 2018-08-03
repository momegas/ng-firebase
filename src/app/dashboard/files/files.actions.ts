import { File } from "./file";

const from = "Files";

export class Set {
  static type = `[${from}] Set`;
  constructor(public files: File[]) {}
}

export class Upload {
  static type = `[${from}] Upload`;
  constructor(public file: File) {}
}

export class Add {
  static type = `[${from}] Add`;
  constructor(public file: File) {}
}
export class Remove {
  static type = `[${from}] Remove`;
  constructor(public id: string, public name: string) {}
}

export class Edit {
  static type = `[${from}] Edit`;
  constructor(public file: File) {}
}
