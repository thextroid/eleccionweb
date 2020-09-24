import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: '404',
		component: P404Component,
		data: {
			title: 'Page 404'
		}
	},
	{
		path: '500',
		component: P500Component,
		data: {
			title: 'Page 500'
		}
	},
	{
		path: 'login',
		component: LoginComponent,
		data: {
			title: 'Login Page'
		}
	},
	{
		path: 'register',
		component: RegisterComponent,
		data: {
			title: 'Register Page'
		}
	},
	{
		path: '',
		component: DefaultLayoutComponent,
		data: {
			title: 'Inicio'
		},
		children: [
			{
				path:'usuarios',
				loadChildren:()=> import('./views/users/users.module').then(m=> m.UsersModule)
			},
			{
				path:'circunscripciones',
				loadChildren:()=> import('./views/circunscripciones/circunscripciones.module').then(m=> m.CircunscripcionesModule)
			},
			{
				path:'departamentos',
				loadChildren:()=> import('./views/departamentos/departamentos.module').then(m=> m.DepartamentosModule)
			},
			{
				path:'provincias',
				loadChildren:()=> import('./views/provincias/provincias.module').then(m=> m.ProvinciasModule)
			},
			{
				path:'municipios',
				loadChildren:()=> import('./views/municipios/municipios.module').then(m=> m.MunicipiosModule)
			},
			{
				path:'localidades',
				loadChildren:()=> import('./views/localidades/localidades.module').then(m=> m.LocalidadesModule)
			},
			{
				path:'recintos',
				loadChildren:()=> import('./views/recintos/recintos.module').then(m=> m.RecintosModule)
			},
			{
				path:'mesas',
				loadChildren:()=> import('./views/mesas/mesas.module').then(m=> m.MesasModule)
			},
			{
				path: 'base',
				loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
			},
			{
				path: 'buttons',
				loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
			},
			{
				path: 'charts',
				loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'icons',
				loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
			},
			{
				path: 'notifications',
				loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
			},
			{
				path: 'theme',
				loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
			},
			{
				path: 'widgets',
				loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
			}
		]
	},
	{ path: '**', component: P404Component }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
