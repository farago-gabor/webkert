import { Component } from '@angular/core';
import { Device } from '../../shared/models/device.model';
import { User } from '../../shared/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../../shared/services/device.service';


//
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Appointment } from '../../shared/models/appointment.model';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  /**
  users: User[] = [
  { id: "1", name: 'John Doe', email: 'john.doe@example.com', devices: [], appointments: [] },
  { id: "2", name: 'Jane Smith', email: 'jane.smith@example.com', devices: [], appointments: [] },
  { id: "3", name: 'Alice Johnson', email: 'alice.johnson@example.com', devices: [], appointments: [] }
];

  devices: Device[] = [
    { id: 1, userId: 1, type: 'laptop', brand: 'Dell', model: 'XPS 13', serialNumber: 'SN12345' },
    { id: 2, userId: 1, type: 'telefon', brand: 'Apple', model: 'iPhone 13', serialNumber: 'SN67890' },
    { id: 3, userId: 3, type: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S7', serialNumber: 'SN54321' }
  ];
 */
  // Az 1-es ID-jű felhasználó és az eszközei
  //user = this.users.find(u => u.id === "1")!;

  constructor(private userService: UserService, private deviceService: DeviceService) {}

  private subscription: Subscription | null = null;
  user: User | null = null;
  devices: Device[] = [];
  appointments: Appointment[] = [];

  //userDevices = this.devices.filter(d => d.userId === 1);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.devices = data.devices;
        this.appointments = data.appointments;
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
      }
    });
  }


  // Device hozzáadó form
  addDeviceForm = new FormGroup({
    type: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    serialNumber: new FormControl('', Validators.required)
  });
/*
  async onAddDevice() {
    if (this.addDeviceForm.valid) {
      const newDevice = this.addDeviceForm.value;
      // Itt hívd meg a UserService vagy DeviceService megfelelő metódusát az eszköz mentéséhez!
      // Például: await this.userService.addDeviceToUser(this.user.id, newDevice);
      this.addDeviceForm.reset();
    }
  }*/

   async onAddDevice() {
    if (this.addDeviceForm.valid) {
      const { type, brand, model, serialNumber } = this.addDeviceForm.value;
      try {
        await this.deviceService.addDevice({
          type: type as 'laptop' | 'pc' | 'telefon' | 'tablet' | 'egyéb',
          brand: brand!,
          model: model!,
          serialNumber: serialNumber!
        });
        this.addDeviceForm.reset();
        // Frissítsd a felhasználói adatokat és az eszközlistát
        this.loadUserProfile();
      } catch (error) {
        alert('Hiba az eszköz hozzáadásakor: ' + (error as any).message);
      }
    }
  }

  async onDeleteDevice(deviceId: string) {
    if (confirm('Biztosan törölni szeretnéd ezt az eszközt?')) {
      try {
        await this.deviceService.deleteDevice(deviceId);
        this.loadUserProfile(); // Frissítés törlés után
      } catch (error) {
        alert('Hiba az eszköz törlésekor: ' + (error as any).message);
      }
    }
  }
  

}