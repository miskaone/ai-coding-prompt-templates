# Template Selection Guide

**Which template should I use? Answer 3 questions to find out.**

---

## Quick Decision Tree

```
START HERE
│
├─ Does this code handle sensitive data or authentication?
│  └─ YES → Template 1: Security-Critical Code
│  └─ NO → Continue...
│
├─ Is performance critical? (sub-second response times, high throughput)
│  └─ YES → Template 2: Performance-Sensitive Code  
│  └─ NO → Continue...
│
├─ Am I adding to existing code that has established patterns?
│  └─ YES → Template 3: Integration with Existing Systems
│  └─ NO → Continue...
│
└─ Do I need to establish standards for my team?
   └─ YES → Template 4: Constitutional AI Principles
   └─ NO → Start with Template 1 (when in doubt)
```

---

## Template Comparison Matrix

| Scenario | Template | Time to Fill | Best For | Avoid If |
|----------|----------|--------------|----------|----------|
| Login endpoint | 1 (Security) | 2-3 min | Authentication, authorization, data validation | Simple utility functions |
| Payment processing | 1 + 4 | 5 min | Financial transactions, PII handling | Read-only operations |
| Slow dashboard query | 2 (Performance) | 3-4 min | Optimization, caching, high throughput | Already fast enough (<100ms) |
| Adding CRUD endpoint | 3 (Integration) | 2 min | Matching existing patterns | Greenfield projects |
| New microservice | 3 + 4 | 5-6 min | Establishing consistency | Prototype/proof-of-concept |
| Onboarding new devs | 4 (Constitutional) | 10 min (one-time) | Team standards, consistency | Solo projects |

---

## By Role

### Backend Developer
- **Most used:** Template 1 (60%), Template 3 (30%), Template 2 (10%)
- **Start with:** Template 1 for any API endpoint
- **Pro tip:** Combine Template 1 + 3 for auth endpoints in existing services

### Frontend Developer
- **Most used:** Template 3 (50%), Template 1 (40%), Template 2 (10%)
- **Start with:** Template 3 (matching UI component patterns)
- **Pro tip:** Use Template 1 for form validation and auth flows

### Full Stack Developer
- **Most used:** Template 1 (40%), Template 3 (40%), Template 2 (20%)
- **Start with:** Template 1 for backend, Template 3 for frontend
- **Pro tip:** Create project-specific Template 4 for consistency

### DevOps/Platform Engineer
- **Most used:** Template 2 (50%), Template 1 (40%), Template 4 (10%)
- **Start with:** Template 2 for performance-critical infrastructure
- **Pro tip:** Template 1 for CI/CD security (secret management, auth)

### Security Engineer
- **Most used:** Template 1 (80%), Template 4 (20%)
- **Start with:** Always Template 1
- **Pro tip:** Use Template 4 to codify security standards for the team

---

## By Technology Stack

### Python/Django/Flask
- **Primary:** Template 1 (Pydantic validation)
- **Secondary:** Template 3 (match Django patterns)
- **Key focus:** SQL injection, XSS, CSRF

### TypeScript/Node/Express
- **Primary:** Template 1 (Zod validation)
- **Secondary:** Template 2 (async/await performance)
- **Key focus:** Input validation, async patterns

### Go
- **Primary:** Template 2 (concurrency patterns)
- **Secondary:** Template 1 (input validation)
- **Key focus:** Error handling, goroutine management

### Java/Spring
- **Primary:** Template 3 (Spring patterns)
- **Secondary:** Template 1 (security annotations)
- **Key focus:** Dependency injection, transaction management

### Rust
- **Primary:** Template 2 (performance)
- **Secondary:** Template 1 (unsafe block justification)
- **Key focus:** Ownership, Result types

---

## By Project Phase

### Early Stage (Prototype/MVP)
- **Use:** Template 1 only (focus on security basics)
- **Skip:** Templates 3, 4 (no patterns to match yet)
- **Reason:** Move fast but stay secure

### Growth Stage (Scaling Up)
- **Use:** Template 1 + 2 (security + performance)
- **Start:** Template 4 (document emerging patterns)
- **Reason:** Prevent technical debt

### Mature Stage (Established Product)
- **Use:** Template 3 primarily (maintain consistency)
- **Use:** Template 1 for new features
- **Reason:** Consistency is critical at scale

### Enterprise Stage (Large Organization)
- **Use:** Template 4 as foundation
- **Use:** All templates reference constitutional principles
- **Reason:** Standardization across teams

---

## Red Flags: When NOT to Use Templates

### Don't Use Templates For:

❌ **Trivial code** (simple getters/setters)  
❌ **Exploratory prototypes** (you're still learning the problem)  
❌ **Non-production scripts** (one-off data migrations)  
❌ **Generated code** (scaffolds, boilerplate)  
❌ **Documentation updates** (no code logic changes)

### Use Your Judgment:

⚠️ **If template takes longer than writing code:** Skip it  
⚠️ **If you know the answer already:** Trust your expertise  
⚠️ **If deadline is critical:** Use lighter version (just security checklist)  
⚠️ **If code is temporary:** Basic security only

---

## Combining Templates

### Common Combinations:

**Security + Performance (Auth at scale)**
```
Use: Template 1 + Template 2
When: Login endpoints for high-traffic apps
Focus: Rate limiting, constant-time operations, caching
```

**Security + Integration (Adding auth to existing service)**
```
Use: Template 1 + Template 3
When: Adding auth to service that has existing patterns
Focus: Match middleware patterns, maintain error handling
```

**Integration + Constitutional (New service in existing system)**
```
Use: Template 3 + Template 4
When: Building new microservice in mature architecture
Focus: Match org patterns, enforce team standards
```

**All Templates (Mission-Critical Feature)**
```
Use: Template 1 + 2 + 3 + 4
When: Payment processing in existing high-traffic platform
Focus: Security, performance, consistency, compliance
Time: 10-15 minutes to fill properly
```

---

## Template Evolution by Experience Level

### Junior Developer (0-2 years)
- **Start:** Template 1 (learn security thinking)
- **Goal:** Catch basic vulnerabilities before review
- **Success:** Fewer security-related review comments

### Mid-Level Developer (2-5 years)
- **Start:** Template 1 + 3 (security + patterns)
- **Goal:** Match team standards, catch edge cases
- **Success:** PRs approved faster, cleaner code

### Senior Developer (5+ years)
- **Start:** All templates as appropriate
- **Goal:** Set examples for team, prevent subtle bugs
- **Success:** Become template champion, teach others

### Staff/Principal Engineer
- **Start:** Template 4 (codify standards)
- **Goal:** Scale best practices across organization
- **Success:** Reduced variance, faster onboarding

---

## Situational Guide

### "I'm stuck on a security bug"
→ Use Template 1, focus on Threat Model section

### "Code review says this is too slow"
→ Use Template 2, add actual performance numbers

### "My code doesn't match the team's style"
→ Use Template 3, paste example from similar code

### "New team member keeps making same mistakes"
→ Create Template 4 with your team's rules

### "I'm not sure if I need a template"
→ Default to Template 1 (security never hurts)

---

## Template Selection Checklist

Before starting to code, ask yourself:

**Security Questions:**
- [ ] Does this handle user input?
- [ ] Does this access sensitive data?
- [ ] Does this authenticate or authorize?
- [ ] Could this be attacked?

**If YES to any → Use Template 1**

**Performance Questions:**
- [ ] Does this run frequently (>100/sec)?
- [ ] Does this process large data?
- [ ] Is latency critical (<1 sec)?
- [ ] Could this cause bottlenecks?

**If YES to any → Use Template 2**

**Integration Questions:**
- [ ] Is there similar code in the codebase?
- [ ] Am I following established patterns?
- [ ] Will this be reviewed against style guide?
- [ ] Does this integrate with existing services?

**If YES to any → Use Template 3**

**Standards Questions:**
- [ ] Is this a repeating pattern?
- [ ] Should others follow this example?
- [ ] Are there compliance requirements?
- [ ] Is consistency critical?

**If YES to any → Use Template 4**

---

## Quick Reference by Language

### Python
```
Most common: Template 1 (security)
Key pattern: Pydantic for validation
Watch for: SQL injection, pickle security
```

### JavaScript/TypeScript
```
Most common: Template 3 (patterns)
Key pattern: Zod/Joi for validation
Watch for: XSS, prototype pollution
```

### Go
```
Most common: Template 2 (performance)
Key pattern: Context propagation
Watch for: Goroutine leaks, error handling
```

### Java
```
Most common: Template 3 (Spring patterns)
Key pattern: Annotations, dependency injection
Watch for: XML injection, deserialization
```

### Rust
```
Most common: Template 2 (performance)
Key pattern: Result types, ownership
Watch for: Unsafe blocks, panics
```

---

## Success Metrics by Template

### Template 1 (Security)
**Measure:**
- Security issues caught pre-review (should increase)
- Security issues found in review (should decrease)
- Time spent on security reviews (should decrease)

**Target:** 50% reduction in security review comments within 4 weeks

### Template 2 (Performance)
**Measure:**
- Latency improvements (p95/p99)
- Throughput improvements
- Performance regressions (should decrease)

**Target:** 30% improvement in targeted metrics within 2 weeks

### Template 3 (Integration)
**Measure:**
- "Doesn't match our style" comments (should decrease)
- Time to first PR approval (should decrease)
- Code consistency scores (should increase)

**Target:** 60% reduction in style comments within 2 weeks

### Template 4 (Constitutional)
**Measure:**
- Cross-team consistency
- Onboarding time for new developers
- Standards violations in code review

**Target:** 50% faster onboarding within 2 months

---

## Final Decision Tree (Simplified)

```
Is it security-critical? → Template 1
Is it performance-critical? → Template 2
Is it integration work? → Template 3
Is it standard-setting? → Template 4

When in doubt? → Template 1 (security first)
```

---

## Get Help Choosing

**Still unsure?**
- Post your scenario on [LinkedIn](https://linkedin.com/in/mike-mackintosh) with #ThinkingInPrompts
- Check the full guide: `AI-Coding-Prompt-Templates.md`
- Start with `Quick-Start-Guide.md` for hands-on tutorial

**For enterprise template selection:**
- Contact [FlowEvolve](https://flowevolve.com) for custom template development
- AgentForge provides team-wide prompt governance

---

**Remember:** Using any template is better than using none. Start somewhere and iterate!
