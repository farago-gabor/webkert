import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, collection, addDoc, doc, updateDoc, arrayUnion, deleteDoc, arrayRemove } from '@angular/fire/firestore';
import { Device } from '../models/device.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private authService: AuthService, private firestore: Firestore) { }

  async addDevice(device: Omit<Device, 'id'>): Promise<void> {
    // 1. Lekérjük a bejelentkezett felhasználót
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }

    // 2. Eszköz hozzáadása a Devices kollekcióhoz
    const devicesCollection = collection(this.firestore, 'Devices');
    const deviceRef = await addDoc(devicesCollection, {
      ...device,
      // id-t Firestore generál, azt később használjuk
    });

    await updateDoc(deviceRef, { id: deviceRef.id });

    // 3. Az új eszköz ID-jának hozzáadása a felhasználó devices tömbjéhez
    const userRef = doc(this.firestore, 'Users', user.uid);
    await updateDoc(userRef, {
      devices: arrayUnion(deviceRef.id)
    });
  }

  async deleteDevice(deviceId: string): Promise<void> {
    // 1. Lekérjük a bejelentkezett felhasználót
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }

    // 2. Eszköz törlése a Devices kollekcióból
    const deviceRef = doc(this.firestore, 'Devices', deviceId);
    await deleteDoc(deviceRef);

    // 3. Eszköz ID eltávolítása a felhasználó devices tömbjéből
    const userRef = doc(this.firestore, 'Users', user.uid);
    await updateDoc(userRef, {
      devices: arrayRemove(deviceId)
    });
  }
}