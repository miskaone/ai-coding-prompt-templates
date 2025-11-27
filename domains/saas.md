# SaaS Template Customizations

Customized templates for Software-as-a-Service applications with multi-tenancy requirements.

## Custom Constitutional Principles

```
Generate code adhering to these SaaS principles:

**Security Principles:**
- Principle 1: All database queries include tenant_id filter (prevent cross-tenant data leaks)
- Principle 2: All file uploads include tenant_id in storage path (prevent cross-tenant access)
- Principle 3: All background jobs include tenant context (prevent cross-tenant processing)

**Quality Principles:**
- Principle 4: All API responses include rate limit headers (transparency for clients)
- Principle 5: All tenant-specific configurations are versioned (audit trail of changes)

**Compliance Principles:**
- Principle 6: Tenant data deletion is complete within 30 days of request (GDPR/CCPA)
- Principle 7: Cross-tenant aggregations anonymize data (prevent tenant identification)
```

## Common Requirements

- **Multi-tenancy**: Complete isolation between customers
- **Compliance**: SOC2, GDPR, CCPA, ISO 27001
- **Scalability**: Per-tenant rate limits, resource quotas
- **Security**: SSO, RBAC, API keys

## Example: Multi-Tenant API Endpoint

See [Template 3](../templates/3-integration-patterns.md) with these additions:
- Tenant context middleware
- Row-level security policies
- Per-tenant rate limiting
- Tenant isolation verification

