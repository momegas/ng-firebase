import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { BrandsComponent } from "./brands/brands.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
  { path: "dashboard/home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "dashboard/brands", component: BrandsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([])
  ],
  declarations: [HomeComponent, BrandsComponent]
})
export class DashboardModule {}
