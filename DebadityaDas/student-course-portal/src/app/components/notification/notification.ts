import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [],
    template: `
    <div style="border: 1px solid blue; padding: 10px; margin: 10px 0;">
      <h5>🔔 Notification Alert Component</h5>
      <p><strong>Scoped Instance Token ID:</strong> {{ instanceToken }}</p>
    </div>
  `,
    // Step 67: Providing the service at the component level
    providers: [NotificationService]
})
export class NotificationComponent implements OnInit {
    instanceToken: string = '';

    /* 
      Step 67 Explanation Comment:
      Providing a service inside the @Component decorator creates a brand new, separate 
      instance of that service scoped strictly to this component instance and its children. 
      It completely bypasses the root singleton provider tree, which is useful when you need 
      isolated state per component (like independent wizard steps or multiple distinct forms).
    */
    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.instanceToken = this.notificationService.getServiceId();
    }
}
