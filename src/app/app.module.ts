import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { PeertopeerComponent } from "./peertopeer/peertopeer.component";

const routes: Routes = [
  { path: "peer-to-peer", component: PeertopeerComponent }
];

@NgModule({
  declarations: [AppComponent, PeertopeerComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
