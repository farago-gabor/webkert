import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../../../shared/models/device.model';

@Component({
  selector: 'app-device-list',
  imports: [],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  @Input() devices: Device[] = []; // Az eszközök listáját a szülő adja át
  @Output() deviceSelected = new EventEmitter<Device>(); // Esemény, amikor egy eszközt kiválasztanak

  selectDevice(device: Device): void {
    this.deviceSelected.emit(device); // Esemény kibocsátása a szülő komponens felé
  }
}
