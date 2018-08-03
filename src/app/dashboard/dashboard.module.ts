import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { routes } from "./dashboard.routes";
import { BrandsComponent } from "./brands/brands.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrandsState } from "./brands/brands.state";
import { ProductsComponent } from "./products/products.component";
import { ProductsState } from "./products/products.state";
import { FilesComponent } from "./files/files.component";
import { FilesState } from "./files/files.state";

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";
import { FormComponent as BrandsFormComponent } from "./brands/components/form/form.component";
import { FormComponent as ProductsFormComponent } from "./products/components/form/form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BrandsState, ProductsState, FilesState]),

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  declarations: [
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    FilesComponent,
    ProductsFormComponent,
    BrandsFormComponent
  ],
  entryComponents: [ProductsFormComponent, BrandsFormComponent]
})
export class DashboardModule {}
