# Template 1: Security-Critical Code

**Use this template when implementing authentication, authorization, data validation, or any code handling sensitive information.**

---

## Quick Copy-Paste Template

```
I need to implement [DESCRIBE FUNCTIONALITY].

Security context:
- Trust boundaries: [WHO/WHAT CAN ACCESS THIS]
- Sensitive data involved: [PII, CREDENTIALS, FINANCIAL DATA, ETC]
- Compliance requirements: [SOC2, HIPAA, GDPR, ETC]

Before generating code, perform this self-reflection:

1. **Threat Model**: What are the attack vectors for this operation?
2. **Trust Boundaries**: What data crosses trust boundaries and how?
3. **Security Controls**: What validation, authentication, authorization is needed?
4. **Failure Modes**: What happens if validation fails, auth fails, or connection drops?
5. **Data Exposure**: What data should NEVER be in logs, errors, or responses?

Then implement with appropriate security controls in place.

After implementation, verify:
- [ ] All user input is validated
- [ ] No SQL injection, XSS, or command injection vectors exist
- [ ] Errors don't leak sensitive information
- [ ] Audit logging captures actor, action, resource, timestamp
- [ ] Minimal data exposure (only return what's necessary)
```

---

## When to Use This Template

### ✅ Use for:
- Authentication endpoints (login, logout, password reset)
- Authorization checks (access control, permissions)
- Data validation (user input, API parameters)
- PII handling (personal information, payment data)
- Security-sensitive operations (password changes, account deletion)

### ❌ Don't use for:
- Simple utility functions (string formatting, math)
- Read-only operations with no sensitive data
- Internal helper functions
- Configuration files

---

## Example Usage

### Scenario: Password Reset Endpoint

```
I need to implement password reset functionality.

Security context:
- Trust boundaries: Unauthenticated users can request reset, email system verifies identity
- Sensitive data involved: Email addresses, reset tokens, password hashes
- Compliance requirements: SOC2 (audit trail of password changes)

Before generating code, perform this self-reflection:

1. **Threat Model**: 
   - Account enumeration via email response timing
   - Token brute forcing
   - Email interception
   - Token reuse after password change

2. **Trust Boundaries**:
   - User-submitted email (untrusted) → System validates existence
   - Generated reset token (trusted, time-limited, single-use) → Email delivery
   - Token submission (untrusted) → Must validate token, expiry, usage count

3. **Security Controls**:
   - Rate limiting on reset requests (prevent enumeration and DoS)
   - Cryptographically secure token generation (32+ bytes entropy)
   - Time-limited tokens (15 minutes max)
   - Single-use tokens (invalidate after successful reset)
   - Constant-time email existence checks (prevent enumeration)

4. **Failure Modes**:
   - Invalid email: Generic success message (prevent enumeration)
   - Expired token: Clear error, allow new request
   - Email delivery failure: Log but show success to user
   - Multiple concurrent requests: Rate limit, audit log

5. **Data Exposure**:
   - Never log: passwords, tokens, password hashes
   - Never return: whether email exists in database
   - Error messages: Generic (no "user not found" vs "invalid token")

Then implement with appropriate security controls in place.
```

**What the AI Will Do:**
- Analyze each threat and propose mitigations
- Generate code with proper validation, rate limiting, audit logging
- Include constant-time comparisons to prevent timing attacks
- Implement secure token generation
- Create safe error messages

---

## Common Security Patterns

### Input Validation

**Python (Pydantic):**
```python
from pydantic import BaseModel, EmailStr, constr

class PasswordResetRequest(BaseModel):
    email: EmailStr
    
class PasswordResetSubmit(BaseModel):
    token: constr(min_length=32, max_length=128)
    new_password: constr(min_length=12)
```

**TypeScript (Zod):**
```typescript
import { z } from 'zod';

const resetRequestSchema = z.object({
  email: z.string().email()
});

const resetSubmitSchema = z.object({
  token: z.string().length(64),
  newPassword: z.string().min(12)
});
```

### Authentication Patterns

**Password Hashing:**
- ✅ Use: bcrypt, argon2, scrypt
- ❌ Never: MD5, SHA1, plain text

**Token Generation:**
- ✅ Use: `secrets.token_urlsafe(32)` (Python), `crypto.randomBytes(32)` (Node)
- ❌ Never: `Math.random()`, predictable sequences

**Session Management:**
- ✅ Use: HttpOnly cookies, secure flags, SameSite
- ❌ Never: localStorage for sensitive tokens

### Authorization Patterns

**Always check authorization AFTER authentication:**
```python
# ✅ Correct order
def update_user(user_id: str, data: dict, current_user: User):
    # 1. Authentication (already done by middleware)
    # 2. Authorization
    if not current_user.can_update(user_id):
        raise ForbiddenError()
    # 3. Operation
    return user_service.update(user_id, data)
```

**Principle of least privilege:**
```python
# ✅ Specific permissions
if user.has_permission('user.update'):
    # Allow update

# ❌ Overly broad
if user.is_admin:  # Admin might not need user.update
    # Allow update
```

---

## Threat Modeling Guide

### Common Attack Vectors

**Injection Attacks:**
- SQL injection: Use parameterized queries
- XSS: Sanitize output, use Content-Security-Policy
- Command injection: Never pass user input to shell
- Path traversal: Validate file paths strictly

**Authentication Attacks:**
- Brute force: Rate limiting, account lockout
- Credential stuffing: Monitor for breached passwords
- Session hijacking: Secure session management
- Password reset abuse: Rate limit, secure tokens

**Authorization Attacks:**
- Privilege escalation: Check permissions explicitly
- IDOR: Validate object ownership
- Forced browsing: Require auth on all protected resources
- Parameter tampering: Validate all inputs server-side

### Trust Boundary Analysis

**Identify what crosses boundaries:**
```
Internet → Application → Database
  ↓           ↓           ↓
Untrusted   Validate    Trusted
```

**Questions to ask:**
1. What data comes from untrusted sources?
2. How is it validated before use?
3. What could go wrong if validation is bypassed?
4. What privileges does this operation require?

---

## Verification Checklist

After AI generates code, verify:

### Input Validation
- [ ] All user input is validated (type, format, range)
- [ ] Validation uses allowlist, not denylist
- [ ] Validation errors are logged (for security monitoring)
- [ ] Invalid input returns appropriate 400-level status

### Injection Prevention
- [ ] SQL uses parameterized queries or ORM
- [ ] No string concatenation in database queries
- [ ] HTML output is escaped or uses template engine
- [ ] No direct shell command execution with user input

### Authentication
- [ ] Passwords are hashed (bcrypt/argon2)
- [ ] Tokens are cryptographically random
- [ ] Sessions have timeout and can be revoked
- [ ] Failed auth attempts are rate-limited

### Authorization
- [ ] Authorization checked after authentication
- [ ] User can only access their own resources
- [ ] Principle of least privilege applied
- [ ] Authorization failures are logged

### Data Exposure
- [ ] Sensitive data not in logs (passwords, tokens, SSNs)
- [ ] Errors don't leak system information
- [ ] Responses include only necessary data
- [ ] PII is encrypted at rest and in transit

### Audit Logging
- [ ] Security events are logged (login, logout, permission changes)
- [ ] Logs include: who, what, when, result
- [ ] Logs are tamper-proof
- [ ] Log retention meets compliance requirements

---

## Language-Specific Notes

### Python
**Key considerations:**
- Use Pydantic for validation
- Use parameterized queries with psycopg2/SQLAlchemy
- Hash passwords with bcrypt or argon2-cffi
- Use secrets module for token generation

### TypeScript/Node.js
**Key considerations:**
- Use Zod or Joi for validation
- Use parameterized queries with pg or Prisma
- Hash passwords with bcrypt
- Use crypto.randomBytes for token generation

### Go
**Key considerations:**
- Use validator package for struct validation
- Use sqlx or database/sql with placeholders
- Hash passwords with golang.org/x/crypto/bcrypt
- Use crypto/rand for token generation

### Rust
**Key considerations:**
- Use validator crate for validation
- Use sqlx with compile-time checked queries
- Hash passwords with argon2 crate
- Use rand crate with OsRng for token generation

---

## Domain-Specific Guidance

### FinTech (PCI-DSS)
Add to security context:
```
Compliance requirements: PCI-DSS Level 1
Additional concerns:
- Card data tokenization (never store full PAN)
- Strong cryptography (TLS 1.2+)
- Audit trail for all card data access
```

### HealthTech (HIPAA)
Add to security context:
```
Compliance requirements: HIPAA
Additional concerns:
- PHI encryption at rest and in transit
- Access controls with patient consent
- Audit trail with legal basis for access
```

### SaaS (Multi-tenant)
Add to security context:
```
Compliance requirements: SOC2 Type II
Additional concerns:
- Tenant isolation (all queries include tenant_id)
- Cross-tenant data leak prevention
- Per-tenant rate limiting
```

---

## Related Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Security Template Examples](../examples/python/security-example.py)
- [Quick Start Guide](../docs/quick-start.md)

---

## Contributing

Found a security pattern we should include? [Open an issue](https://github.com/yourusername/ai-coding-prompt-templates/issues) or [submit a PR](https://github.com/yourusername/ai-coding-prompt-templates/pulls).

---

**Ready to write more secure code? Try this template on your next authentication task.**
