import { Route } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { BrandsComponent } from "./brands/brands.component";
import { ProductsComponent } from "./products/products.component";
import { FilesComponent } from "./files/files.component";

export const routes: Route[] = [
  { path: "dashboard/home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "dashboard/brands", component: BrandsComponent, canActivate: [AuthGuard] },
  { path: "dashboard/products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "dashboard/files", component: FilesComponent, canActivate: [AuthGuard] }
];
