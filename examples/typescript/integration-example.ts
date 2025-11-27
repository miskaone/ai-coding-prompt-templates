# Integration Pattern Example (TypeScript)

## Scenario
Adding a new user preferences update endpoint to an existing Express API that has established patterns.

## Current Pattern in Codebase

```typescript
// Existing pattern: GET /api/users/:userId
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    canAccess: (resourceId: string) => boolean;
  };
}

export async function getUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Input validation with Zod
    const { userId } = z.object({
      userId: z.string().uuid()
    }).parse(req.params);

    // Authorization check
    if (!req.user.canAccess(userId)) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        code: 'FORBIDDEN' 
      });
      return;
    }

    // Audit logging
    await auditLog.record({
      action: 'user.read',
      actor: req.user.id,
      resource: userId,
      timestamp: new Date()
    });

    // Service call
    const user = await userService.findById(userId);
    
    // Error handling
    if (!user) {
      res.status(404).json({ 
        error: 'User not found',
        code: 'NOT_FOUND' 
      });
      return;
    }

    // Response with safe data
    res.json(user.toSafeResponse());
  } catch (error) {
    next(error);  // Centralized error handling
  }
}
```

## Template Usage

```
Current pattern in our codebase:

[ABOVE CODE PASTED]

New requirement: Add PUT /api/users/:userId/preferences endpoint to update user notification preferences

Before implementing, analyze the existing pattern:

1. **Security Controls**: 
   - Zod validation for input
   - req.user.canAccess() for authorization
   - auditLog.record() for all operations
   - toSafeResponse() for filtered output

2. **Error Handling**: 
   - Try-catch with next(error) for centralized handling
   - Explicit status codes (403, 404)
   - Structured error responses with 'error' and 'code' fields

3. **Logging/Observability**:
   - Audit log for every data access operation
   - Includes actor (who), action (what), resource (which), timestamp (when)

4. **Data Handling**:
   - toSafeResponse() indicates PII filtering
   - No sensitive data in logs or error messages
   - UUID validation suggests GDPR/data residency awareness

5. **Testing Approach**:
   - Can mock AuthenticatedRequest with user object
   - Can assert on response status and body structure
   - Can verify auditLog.record calls

Then implement maintaining consistency with these patterns.
```

## AI Output

```typescript
// New endpoint: PUT /api/users/:userId/preferences
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Maintain same interface as existing pattern
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    canAccess: (resourceId: string) => boolean;
  };
}

// Input validation schema following Zod pattern
const updatePreferencesSchema = z.object({
  // URL params
  userId: z.string().uuid(),
  
  // Body
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean()
  }).optional(),
  
  privacy: z.object({
    profileVisibility: z.enum(['public', 'private', 'contacts']),
    showActivity: z.boolean()
  }).optional(),
  
  // At least one category must be provided
}).refine(
  (data) => data.notifications || data.privacy,
  { message: 'At least one preference category must be provided' }
);

/**
 * Update user notification and privacy preferences.
 * 
 * Follows established patterns:
 * - Zod validation for type safety
 * - Authorization before operation
 * - Comprehensive audit logging
 * - Centralized error handling
 * - Safe response filtering
 */
export async function updateUserPreferences(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Input validation with Zod (matching existing pattern)
    const validatedData = updatePreferencesSchema.parse({
      userId: req.params.userId,
      ...req.body
    });
    
    const { userId, notifications, privacy } = validatedData;

    // Authorization check (same pattern as getUser)
    if (!req.user.canAccess(userId)) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        code: 'FORBIDDEN' 
      });
      return;
    }

    // Audit logging BEFORE operation (matching existing pattern)
    await auditLog.record({
      action: 'user.preferences.update',
      actor: req.user.id,
      resource: userId,
      timestamp: new Date(),
      // Include what changed (but not sensitive data)
      metadata: {
        categories: [
          notifications ? 'notifications' : null,
          privacy ? 'privacy' : null
        ].filter(Boolean)
      }
    });

    // Service call (matching existing service pattern)
    const user = await userService.findById(userId);
    
    // Error handling (same pattern as getUser)
    if (!user) {
      res.status(404).json({ 
        error: 'User not found',
        code: 'NOT_FOUND' 
      });
      return;
    }

    // Update preferences
    const updatedUser = await userService.updatePreferences(
      userId,
      {
        notifications,
        privacy
      }
    );

    // Audit logging AFTER successful operation
    await auditLog.record({
      action: 'user.preferences.updated',
      actor: req.user.id,
      resource: userId,
      timestamp: new Date()
    });

    // Response with safe data (matching existing pattern)
    res.json(updatedUser.toSafeResponse());
    
  } catch (error) {
    // Centralized error handling (same pattern as getUser)
    next(error);
  }
}

// Optional: Validation middleware for consistent error handling
export const validateUserPreferences = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updatePreferencesSchema.parse({
      userId: req.params.userId,
      ...req.body
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Invalid request data',
        code: 'VALIDATION_ERROR',
        details: error.errors
      });
    } else {
      next(error);
    }
  }
};

// Router registration (following existing pattern)
// In routes/users.ts:
import express from 'express';
import { requireAuth } from '../middleware/auth';
import { getUser, updateUserPreferences } from '../controllers/users';

const router = express.Router();

// Existing route
router.get('/users/:userId', requireAuth, getUser);

// New route following same pattern
router.put('/users/:userId/preferences', requireAuth, updateUserPreferences);

export default router;
```

## What Pattern Analysis Caught

The template forced analysis of existing patterns, catching:

1. **Consistent Authorization Pattern**
   - Uses same `req.user.canAccess()` check
   - Same 403 error response format
   - Checked BEFORE any operation (security first)

2. **Zod Validation Everywhere**
   - Existing code uses Zod for type-safe validation
   - New endpoint follows same pattern
   - Includes URL params in validation (not just body)
   - Custom refinement for business logic

3. **Comprehensive Audit Logging**
   - Logs both before and after operation
   - Includes actor, action, resource, timestamp
   - Metadata for context (what categories changed)
   - Matches existing audit log structure

4. **Error Handling Strategy**
   - Try-catch with next(error) delegation
   - Explicit status codes (403, 404, 400)
   - Structured error responses
   - Centralized error handling middleware

5. **Response Filtering**
   - Uses `toSafeResponse()` method
   - Ensures no PII leaks
   - Consistent response structure
   - Matches existing endpoints

## Integration Verification Checklist

- [x] Follows same authentication/authorization pattern
- [x] Uses same validation library (Zod)
- [x] Uses same error handling approach (try-catch → next)
- [x] Includes same audit logging structure
- [x] Matches data handling requirements (toSafeResponse)
- [x] Uses same TypeScript interfaces
- [x] Can be tested using existing test infrastructure
- [x] Response structure matches existing endpoints
- [x] HTTP status codes consistent with existing API
- [x] Middleware pattern matches existing routes

## Testing (Following Existing Pattern)

```typescript
// test/controllers/users.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateUserPreferences } from '../../src/controllers/users';
import { userService } from '../../src/services/users';
import { auditLog } from '../../src/services/audit';

// Mock following existing test patterns
vi.mock('../../src/services/users');
vi.mock('../../src/services/audit');

describe('updateUserPreferences', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    // Setup mocks matching existing test structure
    mockReq = {
      params: { userId: 'user-123' },
      body: {
        notifications: { email: true, push: false, sms: false }
      },
      user: {
        id: 'user-123',
        canAccess: vi.fn().mockReturnValue(true)
      }
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    mockNext = vi.fn();

    // Reset mocks
    vi.clearAllMocks();
  });

  it('should update preferences when authorized', async () => {
    // Arrange
    const mockUser = {
      id: 'user-123',
      toSafeResponse: vi.fn().mockReturnValue({ id: 'user-123' })
    };
    
    vi.mocked(userService.findById).mockResolvedValue(mockUser);
    vi.mocked(userService.updatePreferences).mockResolvedValue(mockUser);
    vi.mocked(auditLog.record).mockResolvedValue(undefined);

    // Act
    await updateUserPreferences(mockReq, mockRes, mockNext);

    // Assert - following existing assertion patterns
    expect(mockReq.user.canAccess).toHaveBeenCalledWith('user-123');
    expect(auditLog.record).toHaveBeenCalledTimes(2);
    expect(userService.updatePreferences).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalled();
  });

  it('should return 403 when not authorized', async () => {
    // Arrange
    mockReq.user.canAccess.mockReturnValue(false);

    // Act
    await updateUserPreferences(mockReq, mockRes, mockNext);

    // Assert - matching existing error response pattern
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Insufficient permissions',
      code: 'FORBIDDEN'
    });
    expect(userService.updatePreferences).not.toHaveBeenCalled();
  });

  it('should return 404 when user not found', async () => {
    // Arrange
    vi.mocked(userService.findById).mockResolvedValue(null);

    // Act
    await updateUserPreferences(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'User not found',
      code: 'NOT_FOUND'
    });
  });

  it('should handle validation errors', async () => {
    // Arrange - invalid UUID
    mockReq.params.userId = 'invalid-uuid';

    // Act & Assert
    await expect(
      updateUserPreferences(mockReq, mockRes, mockNext)
    ).rejects.toThrow();  // Caught by error middleware
  });
});
```

## Code Review Comments Avoided

Without template (typical new endpoint issues):
- "Why aren't you using Zod like the rest of our endpoints?"
- "Missing authorization check"
- "Audit logging doesn't match our format"
- "Error responses should include code field"
- "Use toSafeResponse() for consistency"
- "Follow our try-catch → next pattern"

With template:
- "Looks good! Matches our patterns perfectly."
- Merged on first review

## Time Saved

Without template: 
- 6+ code review comments addressing inconsistencies
- 2-3 revision rounds
- 45+ minutes of review time

With template:
- 0 pattern-related comments
- Approved on first review
- 10 minutes of review time

**Time saved: ~35 minutes + prevented technical debt**

## Pattern Maintenance

This example also demonstrates how Template 3 helps with:

1. **Onboarding new developers**
   - New devs can use template to match team patterns
   - Reduces "doesn't match our style" comments
   - Faster time to first merged PR

2. **Maintaining consistency**
   - All endpoints follow same patterns
   - Easier to reason about codebase
   - Reduces cognitive load

3. **Pattern evolution**
   - When patterns change, update template
   - All new code follows updated pattern
   - Gradual migration of old code

4. **Documentation**
   - Template serves as executable documentation
   - Shows actual patterns, not theoretical
   - Self-updating as codebase evolves
