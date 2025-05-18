export interface User {
    id: string;
    name: string;
    email: string;
    //passwordHash: string;
    devices: string[]; // Eszközök azonosítói
    appointments: string[]; // Időpontok azonosítói
}