import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersModule } from './users.module';
import { UsersComponent } from './users.component';

const routes: Routes = [
	{
		path:'',
		component:UsersComponent,
		data:{
			title:'Usuarios'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
