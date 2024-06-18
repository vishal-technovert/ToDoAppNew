import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

export const routes: Routes = [
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    // { path: 'dashboard', component: DashboardComponent },
    // {path: 'header', component:AppHeaderComponent },
    // {path: 'side-bar', component:SidebarComponent }
    {
        path: 'dashboard',
        component: DashboardComponent,
    }
];
