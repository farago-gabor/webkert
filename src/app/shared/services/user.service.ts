

import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { from, Observable, of, switchMap } from 'rxjs';

import { Device } from '../models/device.model';
import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  getUserProfile(): Observable<{
    user: User | null;
    devices: Device[];
    appointments: Appointment[];
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({ user: null, devices: [], appointments: [] });
        }

        return from(this.fetchUserWithDevicesAndAppointments(authUser.uid));
      })
    );
  }
/*
  private async fetchUsers(userId: string): Promise<{ user: User | null }> {
    const userRef = doc(this.firestore, 'Users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as User;
      return { user: { ...userData, id: userSnapshot.id } };

      

    } else {
      return { user: null };
    }
  }
*/
/*
  private async fetchUserWithDevices(userId: string): Promise<{
    user: User | null;
    devices: Device[];
  }> {
    const userRef = doc(this.firestore, 'Users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as User;
      //const devices = await this.fetchDevices(userId);
      const user = { ...userData, id: userId };

       if (!user.devices || user.devices.length === 0) {
        return {
          user,
          devices: []
        };
      }

      // Fetch devices for user
      const devicesCollection = collection(this.firestore, 'Devices');
      const q = query(devicesCollection, where('id', 'in', user.devices));
      const devicesSnapshot = await getDocs(q);

      const devices: Device[] = [];
      devicesSnapshot.forEach((doc) => {
        const deviceData = doc.data() as Device;
        devices.push({ ...deviceData, id: doc.id } as Device);
      });

      return { user: { ...userData, id: userSnapshot.id }, devices };
    } else {
      return { user: null, devices: [] };
    }
  }*/

  private async fetchUserWithDevicesAndAppointments(userId: string): Promise<{
    user: User | null;
    devices: Device[];
    appointments: Appointment[];
  }> {
    const userRef = doc(this.firestore, 'Users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      // Devices lekérdezése
      let devices: Device[] = [];
      if (user.devices && user.devices.length > 0) {
        const devicesCollection = collection(this.firestore, 'Devices');
        const q = query(devicesCollection, where('id', 'in', user.devices));
        const devicesSnapshot = await getDocs(q);
        devices = [];
        devicesSnapshot.forEach((doc) => {
          const deviceData = doc.data() as Device;
          devices.push({ ...deviceData, id: doc.id } as Device);
        });
      }

      // Appointments lekérdezése
      let appointments: Appointment[] = [];
      if (user.appointments && user.appointments.length > 0) {
        const appointmentsCollection = collection(this.firestore, 'Appointments');
        const q = query(appointmentsCollection, where('id', 'in', user.appointments));
        const appointmentsSnapshot = await getDocs(q);
        appointments = [];
        appointmentsSnapshot.forEach((doc) => {
          const appointmentData = doc.data() as Appointment;
          appointments.push({ ...appointmentData, id: doc.id } as Appointment);
        });
      }

      return { user: { ...userData, id: userSnapshot.id }, devices, appointments };
    } else {
      return { user: null, devices: [], appointments: [] };
    }
  }

}


