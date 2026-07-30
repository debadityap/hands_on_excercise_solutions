import { Injectable } from '@angular/core';

@Injectable() // Note: No { providedIn: 'root' } here! This allows per-component scoping.
export class NotificationService {
    private instanceId = Math.random().toString(36).substring(7);

    getServiceId(): string {
        return `NotificationService-Instance-${this.instanceId}`;
    }
}
