import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [],
  },
  {
    path: 'account-manager',
    loadChildren: './account-manager/account-manager.module#AccountManagerModule',
    canActivate: [],
  },
  {
    path: 'course',
    loadChildren: './course/course.module#CourseModule',
    canActivate: [],
  },
];

const config: ExtraOptions = {
  useHash: false,
  preloadingStrategy: PreloadAllModules,
};  

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
