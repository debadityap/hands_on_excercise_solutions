import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Step 75: Mock login property state (Set true to allow, false to block)
  const isLoggedIn = true;

  if (isLoggedIn) {
    return true;
  } else {
    // If unauthorized, redirect back to home route automatically
    router.navigate(['/']);
    return false;
  }
};
