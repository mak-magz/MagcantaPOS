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
}
