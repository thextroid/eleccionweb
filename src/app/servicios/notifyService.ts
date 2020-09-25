import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';

@Injectable({
	providedIn: 'root'
})
export class NotifyService {
	constructor(private $notifier:SnotifyService){}
	
	show(content:string,title:string,tipo){
		if(tipo==0)
		this.$notifier.success(title,content, {
			timeout: 2000,
			showProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			position:SnotifyPosition.rightTop
		});
		if(tipo==1)
		this.$notifier.warning(title,content, {
			timeout: 2000,
			showProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			position:SnotifyPosition.rightTop
		});
		if(tipo==2)
		this.$notifier.info(title,content, {
			timeout: 2000,
			showProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			position:SnotifyPosition.rightTop
		});
		if(tipo==3)
		this.$notifier.error(title,content, {
			timeout: 2000,
			showProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			position:SnotifyPosition.rightTop
		});
	}
}