import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { BrandsComponent } from "./brands/brands.component";

const routes: Routes = [
  { path: "dashboard/home", component: HomeComponent },
  { path: "dashboard/brands", component: BrandsComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxsModule.forFeature([])],
  declarations: [HomeComponent, BrandsComponent]
})
export class DashboardModule {}
