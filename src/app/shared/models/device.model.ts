export interface Device {
    id: number;
    userId: number; // A felhasználó azonosítója, akihez a készülék tartozik
    type: 'laptop' | 'pc' | 'telefon' | 'tablet' | 'egyéb'; // Készülék típusa
    brand: string; // Márka
    model: string; // Modell
    serialNumber: string; // Sorozatszám
  }