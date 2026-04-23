import { UUID } from 'crypto';

export interface Session {
    id: UUID;
    device: UUID;
    createdAt: string;
    ip: string;
    deviceType: 'Desktop' | 'Mobile' | 'Tablet' | 'unknown';
    deviceBrand: string;
    deviceModel: string;
    os: 'Linux' | 'macOS' | 'iOS' | 'Windows' | 'Android' | 'unknown';
    browser: string;
    country: string;
    region: string;
    city: string;
}