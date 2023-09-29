import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", redirectTo: "sales", pathMatch: "full"
  },
  {
    path: "sales",
    loadChildren: () => import('./main-view/main-view.module')
      .then(s => s.MainViewModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
