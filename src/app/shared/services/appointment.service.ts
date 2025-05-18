import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async addAppointment(appointment: Omit<Appointment, 'id'>): Promise<void> {
    // 1. Lekérjük a bejelentkezett felhasználót
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }

    // 2. Időpont hozzáadása az Appointments kollekcióhoz
    const appointmentsCollection = collection(this.firestore, 'Appointments');
    const appointmentRef = await addDoc(appointmentsCollection, {
      ...appointment,
      userId: user.uid
    });

    // 3. Az új időpont ID-jának hozzáadása a felhasználó appointments tömbjéhez
    const userRef = doc(this.firestore, 'Users', user.uid);
    await updateDoc(userRef, {
      appointments: arrayUnion(appointmentRef.id)
    });
  }
}