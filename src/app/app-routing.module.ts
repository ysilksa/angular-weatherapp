    // src/app/app-routing.module.ts
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';

    // Import your components here that will be used in routes
    // import { HomeComponent } from './home/home.component';
    // import { AboutComponent } from './about/about.component';

    const routes: Routes = [
      // Define your routes here
      // { path: '', component: HomeComponent },
      // { path: 'about', component: AboutComponent },
      // { path: '**', redirectTo: '' } // Wildcard route for a 404 page or redirect
    ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }