# Template 3: Integration with Existing Systems

**Use this template when adding features to existing codebases where consistency with established patterns is critical.**

---

## Quick Copy-Paste Template

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

---

## When to Use This Template

### ✅ Use for:
- Adding endpoints to existing API
- New features in established services
- Extending existing modules
- Working with team conventions

### ❌ Don't use for:
- Greenfield projects
- Prototypes
- Temporary scripts
- Utility functions with no dependencies

---

## Related Resources

- [Integration Examples](../examples/typescript/integration-example.ts)
- [Quick Start Guide](../docs/quick-start.md)

