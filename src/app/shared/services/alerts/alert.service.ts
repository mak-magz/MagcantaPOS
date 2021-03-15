import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AlertService {

	constructor(
		private alertCtrl: AlertController
	) { }

	async messageAlert({ header, message }: { header: string, message: string }) {
		const alert = await this.alertCtrl.create({
			header: header.toLocaleUpperCase(),
			message: message,
			buttons: ['OK']
		});

		await alert.present();
	}

	async confirmAlert(message: string) {
		let resolver: (confirm: boolean) => void;

		const promise = new Promise<boolean>(resolve => { resolver = resolve })

		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Confirm!',
			message: message,
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: async () => {
						console.log('Cancelled');
						await alert.dismiss()
						resolver(false)
					}
				}, {
					text: 'Okay',
					handler: async () => {
						console.log('Confirm Okay');
						await alert.dismiss();
						resolver(true)
					}
				}
			]
		})

		await alert.present()
		return promise;
	}
}
