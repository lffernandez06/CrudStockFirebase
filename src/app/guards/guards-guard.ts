import { inject } from '@angular/core';
import { Router, type CanActivateFn, type CanMatchFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  return productService.isAuthenticated().pipe(
    map(user => {
      return user
        ? true
        : router.createUrlTree(['/login']);
    })
  );
};
