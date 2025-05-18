import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { Appointment } from '../../shared/models/appointment.model';

import {MatCardModule} from '@angular/material/card';
import { AppointmentService } from '../../shared/services/appointment.service';

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

  services: string[] = [
    'Számítógép javítás',
    'Laptop javítás',
    'Mobiltelefon javítás',
    'Nyomtató javítás'
  ];
/*
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

      //console.log('Mentett időpont:', newAppointment);
      alert('Az időpont sikeresen mentve!');
    } else {
      alert('Kérlek, válassz egy dátumot és időpontot!');
    }
      
  }*/

  selectedService: string | null = null;

  constructor(private appointmentService: AppointmentService) {}

  async saveAppointment(): Promise<void> {
    if (this.selectedDate && this.selectedTime && this.selectedService) {
      const appointmentDate = new Date(this.selectedDate);
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes);

      try {
        await this.appointmentService.addAppointment({
          appointmentDate,
          service: this.selectedService
        });
        alert('Az időpont sikeresen mentve!');
        // Itt resetelheted a formot, ha szeretnéd
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedService = null;
        this.notes = '';
      } catch (error) {
        alert('Hiba az időpont mentésekor: ' + (error as any).message);
      }
    } else {
      alert('Kérlek, válassz egy dátumot, időpontot és szolgáltatást!');
    }
  }
}