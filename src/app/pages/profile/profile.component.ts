import { Component } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

export interface Device {
  id: number;
  userId: number; // A felhasználó azonosítója, akihez a készülék tartozik
  type: 'laptop' | 'pc' | 'telefon' | 'tablet' | 'egyéb'; // Készülék típusa
  brand: string; // Márka
  model: string; // Modell
  serialNumber: string; // Sorozatszám
}

@Component({
  selector: 'app-profile',
  imports: [],
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
    { id: 2, userId: 2, type: 'telefon', brand: 'Apple', model: 'iPhone 13', serialNumber: 'SN67890' },
    { id: 3, userId: 3, type: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S7', serialNumber: 'SN54321' }
  ];
}