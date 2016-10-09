import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'team/:id', component: TeamComponent}
];


 
// const appRoutes: RouterConfig = [
//   { path: '', component: HomeComponent },
//   { path: 'ODA', component: HomeComponent },
//   { path: 'VOJS', component: vOJSComponent, children: [
//       {path: '', component: VOJS},
//       {path: 'report', component: VOJSReport}
//     ]
//   },
//   { path: 'Profile', component: profileComponent},
//   { path: 'CAM', component: CAMComponent, children: [
//       { path: '', component: CAMDetailComponent}
//     ]
//   }
//   ,{ path: 'POJS', component: POJSRouterOutletComponent , children: [
//       {path: '', component: POJSListComponent},
//       {path: 'report', component: POJSReportComponent}
//     ]
//   }
// ];

export const applicationRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);