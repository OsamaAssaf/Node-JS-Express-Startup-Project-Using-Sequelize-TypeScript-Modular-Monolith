# Role-Based Authorization Guide

This document explains how to use the role-based authorization system implemented in this Express.js application.

## Overview

The application supports two user roles:

- **ADMIN**: Full access to all features
- **USER**: Limited access to certain features

## Middleware Functions

### 1. `authenticate`

Verifies JWT token and attaches user to request object.

```typescript
import { authenticate } from '../middlewares/auth.middleware';

router.get('/protected', authenticate, controller);
```

### 2. `authorize(...roles)`

Checks if the authenticated user has one of the specified roles.

```typescript
import { authorize } from '../middlewares/auth.middleware';

// Only ADMIN users can access
router.get('/admin-only', authenticate, authorize('ADMIN'), controller);

// Both ADMIN and USER can access
router.get('/both-roles', authenticate, authorize('ADMIN', 'USER'), controller);
```

### 3. Convenience Middleware

Pre-configured middleware for common use cases:

```typescript
import { requireAdmin, requireUser, requireAuth } from '../middlewares/auth.middleware';

// Require authentication only
router.get('/auth-only', requireAuth, controller);

// Require ADMIN role (includes authentication)
router.get('/admin-only', requireAdmin, controller);

// Require USER role (includes authentication)
router.get('/user-only', requireUser, controller);
```

## Usage Examples

### Route Protection

```typescript
// Public route - no authentication required
router.get('/public', publicController);

// Authenticated route - any logged-in user
router.get('/authenticated', requireAuth, authenticatedController);

// Admin-only route
router.get('/admin', requireAdmin, adminController);

// Multiple roles allowed
router.post('/create', authorize('ADMIN', 'USER'), createController);
```

### Controller Access to User Information

In your controllers, you can access the authenticated user:

```typescript
export function myController(req: Request, res: Response) {
  // User is guaranteed to exist due to authentication middleware
  const user = req.user;

  console.log('User ID:', user.id);
  console.log('User Role:', user.role);
  console.log('User Email:', user.email);

  // Role-based logic
  if (user.role === 'ADMIN') {
    // Admin-specific logic
  } else {
    // User-specific logic
  }
}
```

## Current Route Configuration

### Demo Routes

- `GET /api/demo/` - Public access
- `GET /api/demo/admin` - ADMIN only

### User Routes

- `GET /api/users/` - ADMIN only (list all users)
- `POST /api/users/` - ADMIN and USER (create user)

### Post Routes

- `GET /api/posts/` - Authenticated users only
- `POST /api/posts/` - ADMIN and USER (create posts)

### Auth Routes

- All auth routes remain public (login, register, etc.)

## Error Responses

When authorization fails, the system returns:

```json
{
  "status": "failed",
  "message": "Forbidden: Insufficient permissions",
  "data": null
}
```

With HTTP status code `403 Forbidden`.

## Security Notes

1. **Role Validation**: The system validates roles against the database on each request
2. **Token Verification**: JWT tokens are verified and user data is fetched from database
3. **Password Security**: Passwords are excluded from user responses
4. **Role Inheritance**: ADMIN users can perform all USER actions

## Testing

To test role-based access:

1. **Create an admin user**:

   ```bash
   POST /api/users
   {
     "email": "admin@example.com",
     "password": "password123",
     "name": "Admin User",
     "role": "ADMIN"
   }
   ```

2. **Create a regular user**:

   ```bash
   POST /api/users
   {
     "email": "user@example.com",
     "password": "password123",
     "name": "Regular User"
   }
   ```

3. **Test access with different tokens**:
   - Use admin token to access `/api/demo/admin` - should work
   - Use user token to access `/api/demo/admin` - should return 403
   - Use admin token to access `/api/users/` - should work
   - Use user token to access `/api/users/` - should return 403
