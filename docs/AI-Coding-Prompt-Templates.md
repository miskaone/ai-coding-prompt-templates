# AI Coding Prompt Templates

**Self-Reflection Framework for Production-Grade Code**

Based on "Thinking in Prompts: The Self-Reflection Framework for Production-Grade AI Code"  
By Mike Mackintosh | [FlowEvolve](https://flowevolve.com) | [LinkedIn](https://linkedin.com/in/mike-mackintosh)

---

## Table of Contents

- [How to Use These Templates](#how-to-use-these-templates)
- [Template 1: Security-Critical Code](#template-1-security-critical-code)
- [Template 2: Performance-Sensitive Code](#template-2-performance-sensitive-code)
- [Template 3: Integration with Existing Systems](#template-3-integration-with-existing-systems)
- [Template 4: Constitutional AI Principles](#template-4-constitutional-ai-principles)
- [Customization Guide](#customization-guide)
- [Quick Reference Cards](#quick-reference-cards)
- [Resources](#resources)

---

## How to Use These Templates

1. **Select the appropriate template** based on your task type
2. **Fill in the bracketed sections** with your specific requirements
3. **Copy the complete prompt** to your AI coding assistant (Claude, Copilot, Cursor, etc.)
4. **Review the self-reflection output** before implementing code
5. **Iterate** if the reflection reveals gaps or concerns

**Pro tip:** Keep this document bookmarked. Most developers use Template 1 (Security) 60% of the time, Template 3 (Integration) 30%, and Template 2 (Performance) 10%.

---

## Template 1: Security-Critical Code

**Use this when:** Implementing authentication, authorization, data validation, or any code handling sensitive information.

### The Template

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

### Example Usage

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

### Common Security Patterns to Include

**Input Validation:**
```
- Use Zod/Joi schemas for TypeScript/JavaScript
- Use Pydantic for Python
- Never trust client-side validation alone
- Whitelist allowed values, don't blacklist dangerous ones
```

**Authentication Patterns:**
```
- Always use bcrypt/argon2 for password hashing (never MD5/SHA)
- Session tokens: 32+ bytes, cryptographically random
- JWT: Sign with RS256/ES256, never HS256 with shared secret
- API keys: Prefix for identification, hash before storage
```

**Authorization Patterns:**
```
- Check authorization after authentication, before operation
- Use principle of least privilege
- Fail closed (deny by default)
- Log all authorization failures for security monitoring
```

---

## Template 2: Performance-Sensitive Code

**Use this when:** Optimizing queries, implementing caching, building high-throughput systems, or addressing performance bottlenecks.

### The Template

```
I need to implement [DESCRIBE FUNCTIONALITY].

Performance requirements:
- Target latency: [P50/P95/P99 TARGETS]
- Expected throughput: [REQUESTS/SECOND, QUERIES/SECOND]
- Data volume: [NUMBER OF RECORDS, DATA SIZE]
- Concurrency: [SIMULTANEOUS USERS/OPERATIONS]

Before generating code, analyze:

1. **Algorithmic Complexity**: What's the time/space complexity of this approach?
2. **Memory Characteristics**: What's the memory footprint? Any allocation hotspots?
3. **Bottlenecks**: What are the likely performance bottlenecks?
4. **Scalability**: How does this perform at 10x, 100x current data volume?
5. **Tradeoffs**: What am I optimizing for (read vs write, latency vs throughput)?

Then implement with performance considerations addressed.

After implementation, explain:
- Chosen approach and why
- Performance characteristics (Big O notation)
- Scaling limits and mitigation strategies
- Monitoring/observability needs
```

### Example Usage

```
I need to implement real-time analytics aggregation for a dashboard showing user activity metrics.

Performance requirements:
- Target latency: p95 < 200ms for dashboard load
- Expected throughput: 5,000 queries/second during peak hours
- Data volume: 100M events per day, 30-day retention window
- Concurrency: 500 simultaneous dashboard users

Before generating code, analyze:

1. **Algorithmic Complexity**:
   - Naive approach: O(n) scan of 3B events = unacceptable
   - Pre-aggregation: O(1) lookup from materialized views = target
   - Memory: ~100MB for 30-day aggregated data in cache

2. **Memory Characteristics**:
   - Redis cache: 100MB for hot aggregations (last 24h)
   - Cold aggregations: Query from Postgres materialized views
   - Connection pooling: Max 50 DB connections, 100 Redis connections

3. **Bottlenecks**:
   - Database: Materialized view refresh (can lag 1-5 minutes)
   - Cache: Thundering herd on cache miss for popular metrics
   - Network: Cross-region latency if cache miss

4. **Scalability**:
   - 10x traffic: Current Redis cluster handles it
   - 100x traffic: Need horizontal sharding by tenant ID
   - Storage: Materialize views consume 50GB, grows linearly

5. **Tradeoffs**:
   - Optimizing for: Read latency over write latency
   - Accepting: 1-5 minute staleness for cold aggregations
   - Trading: Storage space (materialized views) for query speed

Then implement with performance considerations addressed.
```

### Performance Optimization Patterns

**Caching Strategies:**
```
- Cache-aside: Application checks cache, falls back to DB
- Write-through: Application writes to cache and DB simultaneously
- TTL: Set based on data freshness requirements (seconds to hours)
- Invalidation: Explicit on writes vs. time-based expiry
```

**Database Optimization:**
```
- Indexes: Create on WHERE, JOIN, ORDER BY columns
- Materialized views: Pre-compute expensive aggregations
- Connection pooling: Reuse connections, limit max pool size
- Query optimization: Use EXPLAIN ANALYZE, avoid N+1 queries
```

**Async Processing:**
```
- Job queues: Offload non-critical work (emails, analytics)
- Batching: Group writes to reduce round trips
- Streaming: Process large datasets incrementally
```

---

## Template 3: Integration with Existing Systems

**Use this when:** Adding features to existing codebases where consistency with established patterns is critical.

### The Template

```
Current pattern in our codebase:

[PASTE REPRESENTATIVE EXAMPLE CODE - 20-50 LINES]

New requirement: [DESCRIBE WHAT YOU NEED TO BUILD]

Before implementing, analyze the existing pattern:

1. **Security Controls**: What auth, validation, audit logging exists in the example?
2. **Error Handling**: What's the error handling strategy? (exceptions, Result types, etc.)
3. **Logging/Observability**: What gets logged? What metrics are tracked?
4. **Data Handling**: Are there PII handling requirements? Encryption? Data residency?
5. **Testing Approach**: What's the testing pattern? (unit, integration, mocks)

Then implement the new functionality maintaining consistency with these patterns.

After implementation, verify:
- [ ] Follows same authentication/authorization pattern
- [ ] Uses same error handling approach
- [ ] Includes same logging/metrics
- [ ] Matches data handling requirements
- [ ] Can be tested using existing test infrastructure
```

### Example Usage (TypeScript/Express)

```
Current pattern in our codebase:

```typescript
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
    const { userId } = z.object({
      userId: z.string().uuid()
    }).parse(req.params);

    if (!req.user.canAccess(userId)) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        code: 'FORBIDDEN' 
      });
      return;
    }

    await auditLog.record({
      action: 'user.read',
      actor: req.user.id,
      resource: userId,
      timestamp: new Date()
    });

    const user = await userService.findById(userId);
    
    if (!user) {
      res.status(404).json({ 
        error: 'User not found',
        code: 'NOT_FOUND' 
      });
      return;
    }

    res.json(user.toSafeResponse());
  } catch (error) {
    next(error);
  }
}
```

New requirement: Implement endpoint for bulk user export (CSV download) with filtering by account status and creation date.

Before implementing, analyze the existing pattern:

1. **Security Controls**:
   - Zod schema validation for input parameters
   - Authorization check via req.user.canAccess()
   - Audit logging with action, actor, resource, timestamp
   - Safe response via toSafeResponse() method

2. **Error Handling**:
   - Try-catch with next(error) for centralized error handling
   - Explicit status codes (403, 404) for known error cases
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

Implementation notes:
- Use Zod for query parameter validation (status, startDate, endDate)
- Authorization check should verify canAccess() for bulk operations
- Audit log should include count of exported users
- Stream CSV response (don't load all users in memory)
- toSafeResponse() on each user before CSV serialization
- Rate limit bulk exports (they're expensive)

Then implement maintaining consistency with these patterns.
```

### Pattern Recognition Checklist

**Authentication/Authorization:**
- [ ] Same middleware/decorator pattern?
- [ ] Same permission checking mechanism?
- [ ] Same session/token validation?

**Validation:**
- [ ] Same validation library (Zod, Joi, Pydantic)?
- [ ] Same error response format?
- [ ] Same required vs optional field handling?

**Data Access:**
- [ ] Same ORM/query builder?
- [ ] Same transaction handling?
- [ ] Same connection pooling approach?

**Observability:**
- [ ] Same logging library/format?
- [ ] Same metrics collection (StatsD, Prometheus)?
- [ ] Same tracing instrumentation?

---

## Template 4: Constitutional AI Principles

**Use this when:** Creating custom safety principles for your team/organization to enforce consistent standards.

### The Template

```
Generate [LANGUAGE] code adhering to these principles:

**Security Principles:**
- Principle 1: [YOUR SECURITY REQUIREMENT]
- Principle 2: [YOUR SECURITY REQUIREMENT]
- Principle 3: [YOUR SECURITY REQUIREMENT]

**Quality Principles:**
- Principle 4: [YOUR QUALITY REQUIREMENT]
- Principle 5: [YOUR QUALITY REQUIREMENT]

**Compliance Principles:**
- Principle 6: [YOUR COMPLIANCE REQUIREMENT]
- Principle 7: [YOUR COMPLIANCE REQUIREMENT]

After generating code, perform a constitutional review:
1. Does the code satisfy each principle?
2. Are there any principle violations?
3. What additional safeguards could strengthen compliance?

Then revise the code to ensure full compliance.
```

### Example Usage (Financial Services)

```
Generate Python code adhering to these principles:

**Security Principles:**
- Principle 1: Never log, cache, or persist credit card numbers in full (only last 4 digits)
- Principle 2: All financial calculations must use Decimal type (never float due to precision loss)
- Principle 3: All monetary transactions require idempotency keys to prevent duplicate charges

**Quality Principles:**
- Principle 4: All monetary amounts include currency code (no implicit USD assumptions)
- Principle 5: All financial operations return Result types (no exceptions for business logic failures)

**Compliance Principles:**
- Principle 6: All state changes are audited with before/after values for compliance review
- Principle 7: All customer data access includes legal basis in audit log (consent, contract, legitimate interest)

After generating code, perform a constitutional review:
1. Does the code satisfy each principle?
2. Are there any principle violations?
3. What additional safeguards could strengthen compliance?

Then revise the code to ensure full compliance.
```

### Domain-Specific Principle Sets

**Healthcare (HIPAA):**
```
Security:
- Principle 1: All PHI must be encrypted at rest (AES-256) and in transit (TLS 1.3+)
- Principle 2: Access to PHI requires explicit patient consent or treatment relationship
- Principle 3: All PHI access generates audit trail with user, purpose, timestamp, data accessed

Quality:
- Principle 4: Patient identifiers must never appear in logs or error messages
- Principle 5: All clinical data includes provenance (source, timestamp, responsible party)

Compliance:
- Principle 6: Data retention follows HIPAA guidelines (6 years minimum)
- Principle 7: Breach notification logic triggers within 60 days for unauthorized PHI access
```

**SaaS (Multi-Tenancy):**
```
Security:
- Principle 1: All database queries include tenant_id filter (prevent cross-tenant data leaks)
- Principle 2: All file uploads include tenant_id in storage path (prevent cross-tenant access)
- Principle 3: All background jobs include tenant context (prevent cross-tenant processing)

Quality:
- Principle 4: All API responses include rate limit headers (transparency for clients)
- Principle 5: All tenant-specific configurations are versioned (audit trail of changes)

Compliance:
- Principle 6: Tenant data deletion is complete within 30 days of request (GDPR/CCPA)
- Principle 7: Cross-tenant aggregations anonymize data (prevent tenant identification)
```

**E-Commerce (PCI-DSS):**
```
Security:
- Principle 1: Card data never stored in application database (use tokenization service)
- Principle 2: All payment API calls include timeout and retry logic with idempotency
- Principle 3: All payment-related logs exclude full card numbers, CVV, PIN

Quality:
- Principle 4: All payment operations include correlation ID for transaction tracing
- Principle 5: All payment failures include categorized error codes (decline, fraud, technical)

Compliance:
- Principle 6: All payment data transmission uses TLS 1.2+ with strong cipher suites
- Principle 7: All payment-related access is logged with timestamp, user, action, result
```

---

## Customization Guide

### For Your Team

1. **Fork this template** to your team's documentation system
2. **Add organization-specific principles** in Template 4
3. **Include references** to internal security wiki, style guides, architecture docs
4. **Add real examples** from your codebase to Template 3
5. **Document common pitfalls** that your team encounters frequently
6. **Create team-specific templates** for recurring patterns (API endpoints, data pipelines, etc.)

### For Different Languages

**Python:**
- Emphasize: Type hints, context managers, proper exception handling
- Validation: Pydantic schemas
- Async: asyncio patterns, proper event loop management
- Testing: pytest fixtures, mocking with unittest.mock

**TypeScript:**
- Emphasize: Strict typing, Zod validation, proper async/await
- Error handling: Result types or typed exceptions
- Testing: Jest with ts-jest, type-safe mocks
- Patterns: Dependency injection, repository pattern

**Go:**
- Emphasize: Error handling (multiple return values), context propagation
- Validation: Custom validator functions
- Concurrency: Proper goroutine and channel usage
- Testing: Table-driven tests, testify assertions

**Rust:**
- Emphasize: Ownership rules, Result types, proper error propagation
- Validation: Custom From/Into traits
- Safety: Justification for any unsafe blocks
- Testing: Unit tests with #[cfg(test)], property-based testing with proptest

### For Different Domains

**FinTech:**
- Add: PCI-DSS requirements, monetary precision (Decimal types), audit trails
- Security: Transaction idempotency, fraud detection integration
- Compliance: Regulatory reporting, data retention policies

**HealthTech:**
- Add: HIPAA requirements, PHI handling, consent management
- Security: Encryption at rest/transit, access controls, audit logging
- Compliance: Breach notification, patient rights (access, deletion, correction)

**Enterprise SaaS:**
- Add: Multi-tenancy patterns, SSO integration, RBAC
- Security: Tenant isolation, data residency, API rate limiting
- Compliance: GDPR/CCPA data handling, SOC2 controls

**IoT/Embedded:**
- Add: Power consumption considerations, offline-first patterns
- Security: Secure boot, firmware signing, over-the-air updates
- Performance: Memory constraints, real-time requirements

---

## Quick Reference Cards

### When to Use Which Template?

| Scenario | Template | Key Focus |
|----------|----------|-----------|
| Login/auth endpoints | Template 1 | Security controls, input validation |
| Payment processing | Template 1 + 4 | Security + financial compliance |
| Slow dashboard queries | Template 2 | Performance optimization, caching |
| Adding CRUD endpoint | Template 3 | Pattern consistency |
| New service in existing stack | Template 3 | Integration patterns |
| Building team standards | Template 4 | Constitutional principles |

### Security Checklist (Template 1)

**Always Ask:**
- [ ] What can an attacker control in this code?
- [ ] What happens if this validation fails?
- [ ] Can this leak sensitive data in errors/logs?
- [ ] Is there proper authorization (not just authentication)?
- [ ] Is this audited for compliance review?

**Never Allow:**
- ❌ SQL string concatenation
- ❌ Logging passwords, tokens, or PII
- ❌ Generic error messages that reveal system internals
- ❌ Missing rate limiting on authentication endpoints
- ❌ Client-side only validation

### Performance Checklist (Template 2)

**Always Measure:**
- [ ] Time complexity (Big O)
- [ ] Space complexity (memory usage)
- [ ] Database query count (watch for N+1)
- [ ] Cache hit ratio
- [ ] P95/P99 latency (not just average)

**Common Pitfalls:**
- ⚠️ Premature optimization (profile first!)
- ⚠️ Caching without invalidation strategy
- ⚠️ Ignoring connection pool limits
- ⚠️ Loading entire datasets into memory
- ⚠️ Synchronous I/O in hot paths

### Integration Checklist (Template 3)

**Pattern Matching:**
- [ ] Same validation library and approach
- [ ] Same error handling mechanism
- [ ] Same logging format and verbosity
- [ ] Same testing patterns and mocks
- [ ] Same dependency injection style

**Red Flags:**
- 🚩 Mixing error handling strategies (exceptions vs Results)
- 🚩 Inconsistent naming conventions
- 🚩 Different validation approaches in same service
- 🚩 Mixed logging formats
- 🚩 Duplicated utility functions

---

## Advanced Usage Patterns

### Combining Templates

**Example: High-Security, High-Performance Endpoint**

Use Template 1 (Security) + Template 2 (Performance) together:

```
I need to implement real-time fraud detection scoring for payment transactions.

SECURITY CONTEXT (Template 1):
- Trust boundaries: Untrusted payment data from client → Fraud model → Payment processor
- Sensitive data: Card tokens, transaction amounts, customer behavior patterns
- Compliance: PCI-DSS Level 1, SOC2 Type II

PERFORMANCE REQUIREMENTS (Template 2):
- Target latency: p95 < 50ms (inline with payment flow)
- Expected throughput: 10,000 transactions/second peak
- Data volume: 1M transactions/day, 90-day retention
- Concurrency: Real-time scoring, no queuing acceptable

Before generating code, perform combined reflection:

1. Security + Performance Tradeoff Analysis:
   - Can't cache fraud scores (stale data = security risk)
   - Must validate input synchronously (performance cost)
   - Audit logging must be async (can't block transaction)

2. Architecture Implications:
   - In-memory ML model (no DB latency)
   - Connection pooling for audit log writes
   - Circuit breaker for fraud model failures
   - Fallback: Allow transaction but flag for review

[Continue with detailed analysis...]
```

### Iterative Refinement Pattern

When initial reflection reveals gaps, iterate:

```
[First attempt using Template 1]

After reviewing the self-reflection output, I realize I missed:
- Token refresh mechanism for long-lived sessions
- Rate limiting per user AND per IP
- Geographic anomaly detection

Refined prompt with additional security context:
[Include new requirements and re-run reflection]
```

### Team Review Integration

Use templates to structure code review feedback:

```
Code Review Checklist (Generated from Template 1):

Security Reflection Performed: ✅ / ❌
- [ ] Threat model documented in PR description
- [ ] All 5 reflection questions answered
- [ ] Verification checklist completed

If ❌, reviewer should request:
"Please run this code through Template 1 (Security) and document 
the threat model and verification steps in the PR description."
```

---

## Resources

### Research Foundation

- **[Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)** (Wei et al.) - 20-40% error reduction through step-by-step reasoning
- **[Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366)** (Shinn et al.) - Self-critique improves code quality
- **[Meta-Policy Reflexion](https://arxiv.org/abs/2410.06096)** - Reusable reflective memory across episodes (40% fewer tokens)
- **[Constitutional AI](https://www.anthropic.com/index/constitutional-ai-harmlessness-from-ai-feedback)** (Anthropic) - Safety principles enforcement

### Related Articles

- **[Full Article: "Thinking in Prompts"](https://generativeai.pub/thinking-in-prompts-the-self-reflection-framework-for-production-grade-ai-code-89166e82f765)** - Complete framework with examples and theory
- **[OWASP AI Security Guidelines](https://owasp.org/www-project-ai-security-and-privacy-guide/)** - Security best practices for AI systems
- **[Prompt Engineering Guide](https://www.promptingguide.ai/)** - Comprehensive prompt techniques

### Tools & Platforms

- **[FlowEvolve](https://flowevolve.com)** - AI Agent Security Platform for enterprises
- **[AgentForge](https://flowevolve.com)** - Secure AI agent testing in sandbox environments

### Connect

- **[LinkedIn](https://linkedin.com/in/mike-mackintosh)** - Join the conversation, share your experiences
- **Coming Soon:** "Thinking in Agents" series on multi-agent orchestration patterns

---

## Version History

- **v1.0** (November 2024) - Initial release
  - 4 core templates
  - Domain-specific examples
  - Customization guide
  - Quick reference cards

---

## Feedback & Contributions

**Found a pattern that works well?** Share it in the [LinkedIn discussion](YOUR_LINKEDIN_POST_LINK).

**Building enterprise prompt libraries?** Check out [AgentForge](https://flowevolve.com) for team-wide prompt governance and reusable reflective memory.

**Suggestions for improvement?** This is a living document. Connect on LinkedIn with your feedback.

---

## License

This template library is based on the article "Thinking in Prompts: The Self-Reflection Framework for Production-Grade AI Code" by Mike Mackintosh.

Free to use and adapt for your team. Attribution appreciated but not required.

For enterprise licensing or custom template development, contact: [FlowEvolve](https://flowevolve.com)
