export class SetUser {
  static type = "[Auth] Set User";
  constructor(public user: any) {}
}

export class Logout {
  static type = "[Auth] Logout";
}
