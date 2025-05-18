export interface Device {
    id: string;
    type: 'laptop' | 'pc' | 'telefon' | 'tablet' | 'egyéb'; // Készülék típusa
    brand: string; // Márka
    model: string; // Modell
    serialNumber: string; // Sorozatszám
}