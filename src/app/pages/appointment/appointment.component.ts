import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { Appointment } from '../../shared/models/appointment.model';

import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  notes: string = '';

  availableTimes: string[] = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00'
  ];

  saveAppointment(): void {
    if (this.selectedDate && this.selectedTime) {
      const appointmentDate = new Date(this.selectedDate);
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes);

      const newAppointment: Appointment = {
        id: Date.now(), // Egyedi azonosító generálása
        userId: 1, // Példa felhasználó azonosító
        deviceId: 1, // Példa eszköz azonosító
        appointmentDate: appointmentDate,
        notes: this.notes
      };

      console.log('Mentett időpont:', newAppointment);
      alert('Az időpont sikeresen mentve!');
    } else {
      alert('Kérlek, válassz egy dátumot és időpontot!');
    }
  }
}