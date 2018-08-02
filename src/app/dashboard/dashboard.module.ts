import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { routes } from "./dashboard.routes";
import { BrandsComponent } from "./brands/brands.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrandState } from "./brands/brands.state";
import { ProductsComponent } from "./products/products.component";
import { ProductsState } from "./products/products.state";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BrandState, ProductsState])
  ],
  declarations: [HomeComponent, BrandsComponent, ProductsComponent]
})
export class DashboardModule {}
