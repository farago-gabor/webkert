

import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
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
/**
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

  async fetchUserWithDevicesAndAppointments(userId) */

  getUserProfile(): Observable<{
    user: User | null;
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({ user: null });
        }

        return from(this.fetchUsers(authUser.uid));
      })
    );
  }

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
}


