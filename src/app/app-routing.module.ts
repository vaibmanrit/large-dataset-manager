import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' }, // Redirect to items
  {
    path: 'items',
    loadChildren: () =>
      import('./features/items/items.module').then((m) => m.ItemsModule), // Lazy load ItemsModule
  },
  { path: '**', redirectTo: '/items' }, // Wildcard route to redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
