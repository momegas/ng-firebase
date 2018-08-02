import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AppEnterModule } from "./app-enter/app-enter.module";
import { RouterModule, Route } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const routes: Route[] = [{ path: "", redirectTo: "login", pathMatch: "full" }];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot({ collapsed: true }),

    RouterModule.forRoot(routes),

    AppEnterModule,
    DashboardModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
