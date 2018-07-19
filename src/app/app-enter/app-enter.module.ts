import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "../shared/store/auth.state";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxsModule.forFeature([AuthState])],
  declarations: [LoginComponent, RegisterComponent]
})
export class AppEnterModule {}
