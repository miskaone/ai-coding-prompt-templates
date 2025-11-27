# Quick Start Guide: AI Coding Prompt Templates

**Get started with self-reflection prompting in 5 minutes**

---

## 🚀 Immediate Action Steps

### Step 1: Choose Your Template (30 seconds)

**Ask yourself:**
- Am I working with sensitive data or authentication? → **Template 1 (Security)**
- Is performance critical to this task? → **Template 2 (Performance)**
- Am I adding to existing code? → **Template 3 (Integration)**
- Does my team need consistent standards? → **Template 4 (Constitutional)**

**80% of developers use Template 1 for their first try.** Start there if unsure.

---

### Step 2: Fill in the Blanks (2 minutes)

Open `AI-Coding-Prompt-Templates.md` and find your template.

**Replace bracketed sections:**
- `[DESCRIBE FUNCTIONALITY]` → "user authentication endpoint"
- `[WHO/WHAT CAN ACCESS THIS]` → "authenticated users only"
- `[PII, CREDENTIALS, ETC]` → "email, password hash"

**Copy the entire completed prompt** (including the template structure).

---

### Step 3: Run It (30 seconds)

Paste into your AI coding assistant:
- Claude (claude.ai)
- GitHub Copilot Chat
- Cursor AI
- ChatGPT

**Hit enter and wait** for the self-reflection output.

---

### Step 4: Review the Reflection (1 minute)

The AI will output:
1. **Analysis** of security/performance/integration concerns
2. **Code implementation** addressing those concerns
3. **Verification notes** explaining what was considered

**Read the analysis first**, then look at the code.

---

### Step 5: Iterate if Needed (1 minute)

If the reflection reveals something you forgot:

```
Thank you for that analysis. I realized I also need to handle:
- [Additional requirement]
- [Edge case you discovered]

Please revise the implementation considering these points.
```

---

## 📋 Your First Template: Security-Critical Code

**Copy this exactly, then customize the bracketed parts:**

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

## 💡 Real Example: Login Endpoint

**What you fill in:**

```
I need to implement a login endpoint that accepts email/password and returns a JWT token.

Security context:
- Trust boundaries: Unauthenticated public internet users
- Sensitive data involved: Email addresses, password hashes, JWT tokens
- Compliance requirements: SOC2 Type II (need audit trail)

Before generating code, perform this self-reflection:

1. **Threat Model**: What are the attack vectors for this operation?
2. **Trust Boundaries**: What data crosses trust boundaries and how?
3. **Security Controls**: What validation, authentication, authorization is needed?
4. **Failure Modes**: What happens if validation fails, auth fails, or connection drops?
5. **Data Exposure**: What data should NEVER be in logs, errors, or responses?

Then implement with appropriate security controls in place.
```

**What you get back:**

The AI will provide:
1. Analysis of credential stuffing, brute force, timing attacks
2. Code with rate limiting, constant-time password comparison, secure token generation
3. Error handling that doesn't reveal whether email exists
4. Audit logging for security monitoring
5. Verification checklist completion notes

---

## 🎯 Success Metrics

**You're using templates effectively when:**

✅ **Code reviews take 30-50% less time** (fewer security/performance issues found)  
✅ **You catch issues before pushing** (reflection reveals problems early)  
✅ **Team consistency improves** (everyone uses same security patterns)  
✅ **Onboarding is faster** (new devs use templates to learn patterns)

---

## 🔧 Troubleshooting

### "The AI's reflection seems shallow"

**Fix:** Add more context to the bracketed sections. Be specific:
- ❌ "User data"
- ✅ "Email, phone, address (PII under GDPR), payment method tokens"

### "The AI missed an important security concern"

**Fix:** Explicitly mention it in the prompt:
```
Additionally, consider:
- [Your specific concern]
- [Edge case you're worried about]
```

### "The code doesn't match our existing patterns"

**Fix:** Switch to Template 3 (Integration) and paste a real example from your codebase.

### "Template 2 (Performance) didn't optimize enough"

**Fix:** Add actual numbers:
- ❌ "Make it fast"
- ✅ "Target: p95 < 100ms, currently at 800ms, 50K requests/min peak"

---

## 📚 What to Read Next

1. **[Full Template Library](AI-Coding-Prompt-Templates.md)** - All 4 templates with examples
2. **[Medium Article](https://generativeai.pub/thinking-in-prompts-the-self-reflection-framework-for-production-grade-ai-code-89166e82f765)** - Complete framework and theory
3. **Practice:** Use Template 1 on your next PR today

---

## 🤝 Getting Help

**Questions?** Connect on [LinkedIn](https://linkedin.com/in/mike-mackintosh) and share what you're building.

**Enterprise deployment?** [FlowEvolve](https://flowevolve.com) provides team-wide prompt governance and AgentForge for secure AI agent testing.

---

## ⚡ Power User Tips

### Tip 1: Create Project-Specific Templates

Copy Template 4 (Constitutional) and fill in your project's specific principles:

```
Our Project Principles:
- Principle 1: All database queries use our QueryBuilder (no raw SQL)
- Principle 2: All user-facing strings support i18n (use t() function)
- Principle 3: All API endpoints return standardized error format
```

Save this as `project-prompt-template.md` and use it for consistency.

### Tip 2: Combine Templates

For complex tasks, use multiple templates in one prompt:

```
I need to implement [functionality].

SECURITY CONTEXT (Template 1):
[Security details]

PERFORMANCE REQUIREMENTS (Template 2):
[Performance details]

Perform combined analysis considering both security and performance tradeoffs.
```

### Tip 3: Build a Snippets Library

In your code editor (VS Code, Cursor, etc.), create snippets:
- `sec-prompt` → Expands to Template 1
- `perf-prompt` → Expands to Template 2
- `int-prompt` → Expands to Template 3

### Tip 4: Track Your Wins

Keep a log of issues caught by reflection:
```
Date: 2024-11-26
Template: Security (Template 1)
Issue Caught: SQL injection in search query
Time Saved: 2 hours (would've caught in code review)
```

After a month, you'll have data proving ROI.

### Tip 5: Share Team Learnings

When reflection catches something important, document it:

```
TIL: Template 1 revealed we need rate limiting on password reset
Added to team wiki: "Always include rate limiting reflection question for auth endpoints"
```

---

## 🎓 Learning Path

### Week 1: Security Basics
- Use Template 1 on every PR
- Focus on input validation and error handling
- Goal: Catch 3+ security issues before code review

### Week 2: Performance Awareness
- Use Template 2 on 2-3 slow queries/endpoints
- Practice Big O analysis
- Goal: Improve 1 metric by 2x

### Week 3: Pattern Consistency
- Use Template 3 when adding to existing code
- Document your team's patterns
- Goal: Zero "doesn't match our style" review comments

### Week 4: Team Standards
- Create team-specific Template 4
- Run workshop: "How we use AI safely"
- Goal: 50%+ team adoption

---

## 📊 Before/After Example

### Before (No Template)

**Prompt:** "Write a function to save user data to database"

**Result:**
```python
def save_user(data):
    db.execute(f"INSERT INTO users VALUES ('{data['name']}', '{data['email']}')")
```

**Issues:**
- SQL injection vulnerability
- No input validation
- No error handling
- No audit logging

**Code Review:** 6 comments, 2 rounds of revision, 45 minutes

### After (With Template 1)

**Prompt:** [Security template with proper context filled in]

**Result:**
```python
def save_user(data: dict) -> Result[User, Error]:
    # Input validation
    schema = {'name': str, 'email': EmailStr, ...}
    validated = validate(data, schema)
    
    # Parameterized query (SQL injection safe)
    try:
        user = db.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            (validated['name'], validated['email'])
        )
        
        # Audit logging
        audit_log.record(action='user.create', data=user.id)
        
        return Ok(user)
    except IntegrityError:
        return Err(ValidationError('Email already exists'))
```

**Issues:** 0

**Code Review:** 1 comment ("looks good!"), merged immediately, 5 minutes

---

## ✅ Checklist: Am I Ready?

Before closing this guide:

- [ ] I've downloaded `AI-Coding-Prompt-Templates.md`
- [ ] I've read Template 1 (Security)
- [ ] I understand the bracketed sections are what I customize
- [ ] I know which AI assistant I'll use (Claude, Copilot, Cursor, ChatGPT)
- [ ] I have a task in mind to try this on today

**If all checked:** You're ready! Go use Template 1 on your next security-critical code.

**If not all checked:** Re-read the "🚀 Immediate Action Steps" section above.

---

**Remember:** These templates make AI better at helping you write secure, performant, consistent code. But YOU are still the engineer making decisions. Use the reflection output as input to your judgment, not as blind truth.

**Now go build something secure! 🔒**
