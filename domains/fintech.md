# FinTech Template Customizations

Customized templates for financial technology applications requiring PCI-DSS compliance.

## Custom Constitutional Principles

```
Generate code adhering to these FinTech principles:

**Security Principles:**
- Principle 1: Never log, cache, or persist credit card numbers in full (only last 4 digits)
- Principle 2: All financial calculations must use Decimal type (never float due to precision)
- Principle 3: All monetary transactions require idempotency keys to prevent duplicate charges

**Quality Principles:**
- Principle 4: All monetary amounts include currency code (no implicit USD assumptions)
- Principle 5: All financial operations return Result types (no exceptions for business logic failures)

**Compliance Principles:**
- Principle 6: All state changes are audited with before/after values for compliance review
- Principle 7: All customer data access includes legal basis in audit log (consent, contract, legitimate interest)
```

## Common Requirements

- **PCI-DSS Level**: 1, 2, 3, or 4
- **Regulatory**: SEC, FINRA, FinCEN, state banking regulations
- **Data Sensitivity**: Card data, bank accounts, SSNs, transaction history

## Example: Payment Processing

See [Template 1](../templates/1-security-critical.md) with these additions:
- Tokenization service integration
- Strong cryptography (TLS 1.2+)
- Secure key management
- Network segmentation

