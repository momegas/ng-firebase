export class SetUser {
  static type = "[Auth] Set User";
  constructor(public user: any) {}
}

export class RemoveUser {
  static type = "[Auth] Remove User";
}

export class NavigateToHome {
  static type = "[Auth] Navigate to Home";
}
