import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const options: PushOptions = {
        android: {},
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        }
     };
     
     const pushObject: PushObject = this.push.init(options);
     
     
     pushObject.on('notification').subscribe((notification: any) => {
       
     });
     
     pushObject.on('registration').subscribe((registration: any) => {
      let alert = this.alertCtrl.create({
        title: 'Registration',
        subTitle: registration.registrationId,
        buttons: ['Dismiss']
      });
      alert.present();
     });
     
     pushObject.on('error').subscribe(error => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error.message,
        buttons: ['Dismiss']
      });
      alert.present();
     });

    });
  }
}

