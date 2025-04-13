export interface Appointment {
    id: number; // Egyedi azonosító
    userId: number; // Felhasználó azonosítója
    deviceId: number; // Eszköz azonosítója
    appointmentDate: Date; // Időpont dátuma és ideje
    notes?: string; // Opcionális hibaleírás
}