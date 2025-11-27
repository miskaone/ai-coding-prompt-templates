# HealthTech Template Customizations

Customized templates for healthcare applications requiring HIPAA compliance.

## Custom Constitutional Principles

```
Generate code adhering to these HealthTech principles:

**Security Principles:**
- Principle 1: All PHI must be encrypted at rest (AES-256) and in transit (TLS 1.3+)
- Principle 2: Access to PHI requires explicit patient consent or treatment relationship
- Principle 3: All PHI access generates audit trail with user, purpose, timestamp, data accessed

**Quality Principles:**
- Principle 4: Patient identifiers must never appear in logs or error messages
- Principle 5: All clinical data includes provenance (source, timestamp, responsible party)

**Compliance Principles:**
- Principle 6: Data retention follows HIPAA guidelines (6 years minimum)
- Principle 7: Breach notification logic triggers within 60 days for unauthorized PHI access
```

## Common Requirements

- **HIPAA**: Business Associate Agreements, Privacy Rule, Security Rule
- **State Laws**: HITECH, state breach notification laws
- **Data Types**: PHI, medical records, prescriptions, diagnoses

## Example: Patient Records Access

See [Template 1](../templates/1-security-critical.md) with these additions:
- Minimum necessary standard
- Patient consent verification
- Emergency access protocols
- Audit logging requirements

