import { Component } from '@angular/core';
import { Device } from '../../shared/models/device.model';
import { User } from '../../shared/models/user.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', passwordHash: 'hash1' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', passwordHash: 'hash2' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', passwordHash: 'hash3' }
  ];

  devices: Device[] = [
    { id: 1, userId: 1, type: 'laptop', brand: 'Dell', model: 'XPS 13', serialNumber: 'SN12345' },
    { id: 2, userId: 1, type: 'telefon', brand: 'Apple', model: 'iPhone 13', serialNumber: 'SN67890' },
    { id: 3, userId: 3, type: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S7', serialNumber: 'SN54321' }
  ];

  // Az 1-es ID-jű felhasználó és az eszközei
  user = this.users.find(u => u.id === 1)!;
  userDevices = this.devices.filter(d => d.userId === 1);


}