# Template 4: Constitutional AI Principles

**Use this template when creating custom safety principles for your team/organization to enforce consistent standards.**

---

## Quick Copy-Paste Template

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

---

## Domain-Specific Principle Sets

### Financial Services (PCI-DSS)

```
**Security Principles:**
- Never log, cache, or persist credit card numbers in full (only last 4 digits)
- All financial calculations must use Decimal type (never float)
- All monetary transactions require idempotency keys

**Quality Principles:**
- All monetary amounts include currency code (no implicit USD)
- All financial operations return Result types (no exceptions)

**Compliance Principles:**
- All state changes audited with before/after values
- All customer data access includes legal basis in audit log
```

### Healthcare (HIPAA)

```
**Security Principles:**
- All PHI encrypted at rest (AES-256) and in transit (TLS 1.3+)
- Access to PHI requires explicit patient consent
- All PHI access generates audit trail

**Quality Principles:**
- Patient identifiers never in logs or error messages
- All clinical data includes provenance

**Compliance Principles:**
- Data retention follows HIPAA guidelines (6 years minimum)
- Breach notification triggers within 60 days
```

### SaaS (Multi-Tenancy)

```
**Security Principles:**
- All database queries include tenant_id filter
- All file uploads include tenant_id in storage path
- All background jobs include tenant context

**Quality Principles:**
- All API responses include rate limit headers
- All tenant-specific configurations are versioned

**Compliance Principles:**
- Tenant data deletion complete within 30 days
- Cross-tenant aggregations anonymize data
```

---

## Related Resources

- [Domain Templates](../domains/)
- [Quick Start Guide](../docs/quick-start.md)

