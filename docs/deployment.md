# Deployment Guide

**How to roll out AI Coding Prompt Templates across your team**

---

## 🎯 Deployment Options

### Option 1: GitHub (Recommended for Engineering Teams)

**Steps:**
1. Fork this repository to your organization
2. Customize templates in `templates/` and `domains/`
3. Add your team's specific examples to `examples/`
4. Share repo link in team chat
5. Add to onboarding checklist

**Advantages:**
- Version controlled
- Easy to reference in PRs
- Can be automated with CI/CD
- Fits existing engineering workflow

### Option 2: Internal Wiki (Confluence, Notion, etc.)

**Steps:**
1. Create "AI Coding Standards" page
2. Copy contents of `templates/` to wiki
3. Link from onboarding docs
4. Update with team learnings

**Advantages:**
- Central documentation hub
- Familiar interface
- Easy commenting/discussion

### Option 3: IDE Snippets

**Steps:**
1. Create snippets for each template
2. Share snippet files with team
3. Developers install locally

**Advantages:**
- Zero-friction access
- No context switching
- Fastest to use

**See examples:**
- [VS Code Snippets](../examples/vscode-snippets.json)
- [Cursor Snippets](../examples/cursor-snippets.json)

---

## 📊 Rollout Strategy

### Phase 1: Pilot (Week 1-2)

**Goal:** Prove value with early adopters

**Steps:**
1. Select 3-5 senior engineers as champions
2. Have them use templates on all PRs for 2 weeks
3. Track metrics:
   - Security issues caught pre-review
   - Review time reduction
   - Developer satisfaction

**Success criteria:**
- 30% reduction in security review comments
- Positive feedback from pilots
- At least 1 "saved us from a bug" story

### Phase 2: Team Rollout (Week 3-4)

**Goal:** Expand to full team

**Steps:**
1. Run 1-hour workshop (see below)
2. Add templates to PR checklist
3. Mention in code review if not used

**Workshop agenda:**
- 10 min: Problem statement (demo a before/after)
- 15 min: Live demo with real code
- 25 min: Hands-on practice
- 10 min: Q&A and sharing

**Success criteria:**
- 50% of PRs using templates
- Team understands when to use each template

### Phase 3: Adoption (Month 2)

**Goal:** Make templates habitual

**Steps:**
1. PR template includes template checklist
2. CI/CD suggests templates for security-sensitive code
3. Monthly sharing: "Template wins of the month"

**Success criteria:**
- 70%+ of PRs using templates
- Measurable impact on security/performance metrics

### Phase 4: Evolution (Month 3+)

**Goal:** Continuous improvement

**Steps:**
1. Collect team feedback monthly
2. Add domain-specific templates
3. Create organization-specific examples
4. Share learnings with broader community

**Success criteria:**
- Team contributes improvements back
- Templates evolve with team needs

---

## 🔧 Integration Options

### GitHub Actions

Auto-suggest templates on PRs:

```yaml
name: Suggest Templates
on:
  pull_request:
    types: [opened, edited]

jobs:
  suggest-template:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Check for security-sensitive changes
        run: |
          if git diff origin/main --name-only | grep -E '(auth|password|token|login)'; then
            if ! grep -q "Template" "${{ github.event.pull_request.body }}"; then
              gh pr comment ${{ github.event.pull_request.number }} \
                --body "⚠️ This PR touches security-sensitive code. Consider using [Template 1 (Security)](../templates/1-security-critical.md)"
            fi
          fi
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Pre-commit Hook

Remind developers locally:

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🤖 Checking for security-sensitive changes..."

if git diff --cached | grep -qE "(password|authenticate|token|secret)"; then
  echo ""
  echo "⚠️  Security-related changes detected!"
  echo "📋 Consider using Template 1 (Security)"
  echo "📖 See: templates/1-security-critical.md"
  echo ""
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
```

### PR Template

Add to `.github/pull_request_template.md`:

```markdown
## Description
[Describe your changes]

## AI-Assisted Development

If this PR includes AI-generated code:
- [ ] Used appropriate template (Security / Performance / Integration)
- [ ] Documented self-reflection findings
- [ ] Verified all checklist items from template

Template used: [Template Name](https://github.com/miskaone/ai-coding-prompt-templates/tree/master/templates)

Key reflection insights:
- [What did reflection reveal?]
- [What issues were caught?]
```

### Code Review Checklist

Add to your team's review guidelines:

```markdown
## Security Review
- [ ] If auth/validation code, was Template 1 used?
- [ ] Are threat model concerns addressed?
- [ ] Is input validation present?
- [ ] Are errors safe (no data leaks)?

## Performance Review
- [ ] If high-throughput code, was Template 2 used?
- [ ] Is algorithmic complexity acceptable?
- [ ] Are there obvious bottlenecks?

## Pattern Consistency
- [ ] Does this match our existing patterns?
- [ ] If integration work, was Template 3 used?
```

---

## 📚 Training Materials

### Self-Paced Learning

**Week 1: Security Basics**
- Read: [Template 1](../templates/1-security-critical.md)
- Practice: Use Template 1 on 3 PRs
- Share: What issues did reflection catch?

**Week 2: Performance Awareness**
- Read: [Template 2](../templates/2-performance-sensitive.md)
- Practice: Optimize 1 slow query using template
- Share: Before/after metrics

**Week 3: Pattern Matching**
- Read: [Template 3](../templates/3-integration-patterns.md)
- Practice: Add feature matching team patterns
- Share: How template helped maintain consistency

### Workshop Materials

**1-Hour Workshop Outline:**

**Introduction (10 minutes)**
- Problem: Show real examples of AI-generated vulnerabilities
- Solution: Demo template catching issues
- Benefits: Metrics from early adopters

**Live Demo (15 minutes)**
- Pick real task from backlog
- Show: Prompt without template (gets insecure code)
- Show: Same prompt with template (catches issues)
- Walk through reflection output

**Hands-On Practice (25 minutes)**
- Everyone picks a current task
- Use appropriate template
- Share what reflection revealed
- Compare approaches in small groups

**Wrap-Up (10 minutes)**
- Q&A
- Share "template wins" channel
- Add to PR checklist
- Schedule follow-up in 2 weeks

**Materials needed:**
- Projector for demo
- Everyone has AI assistant access
- Link to templates repo
- Shared doc for capturing questions

### Onboarding Checklist

Add to new hire onboarding:

```markdown
## Week 1: Development Setup
- [ ] Clone repos and install dependencies
- [ ] Review [AI Prompt Templates](https://github.com/miskaone/ai-coding-prompt-templates)
- [ ] Watch: 15-min video on template usage
- [ ] Read: [Quick Start Guide](../docs/quick-start.md)

## Week 2: First Contributions
- [ ] Complete tutorial: Use Template 1 on sample PR
- [ ] Shadow: Watch senior dev use Template 3
- [ ] Practice: Submit first real PR using templates
- [ ] Feedback: Share what was helpful/confusing
```

---

## 📊 Measuring Success

### Leading Indicators (Week 1-4)

Track these to gauge adoption:

**Usage Metrics:**
```
Week 1: ___ % of PRs using templates
Week 2: ___ % of PRs using templates
Week 3: ___ % of PRs using templates
Week 4: ___ % of PRs using templates
```

**Engagement Metrics:**
- Issues caught by self-reflection: ___
- Template mentions in code review: ___
- Questions in team chat about templates: ___

### Lagging Indicators (Month 2-3)

Track these to measure impact:

**Code Quality:**
- Security issues in code review: __% change
- Performance regressions: __% change
- Style consistency violations: __% change

**Developer Productivity:**
- Average PR review time: __% change
- Rounds of revision per PR: __% change
- Time to first merged PR (new hires): __% change

**Developer Satisfaction:**
Survey questions (1-5 scale):
- "AI tools help me write better code"
- "Templates improve my code reviews"
- "I feel confident using AI for production code"

### Sample Metrics Dashboard

```
Month 1 Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Adoption
  Template usage:              64% of PRs
  Security template:           42% of PRs
  Performance template:        12% of PRs
  Integration template:        10% of PRs

Quality Impact
  Security issues (pre-review): ↑ 18 caught
  Security issues (in review):  ↓ 35% (-14)
  Performance regressions:      ↓ 60% (-3)
  
Productivity Impact
  Avg review time:              23min (↓ 28%)
  Revision rounds:              1.6 (↓ 20%)
  New hire first PR:            4.2 days (↓ 48%)

Developer Satisfaction
  "AI helps me code better":    4.3/5 (↑ 1.1)
  "Templates improve reviews":  4.1/5 (new)
  "Confident using AI":         3.8/5 (↑ 0.9)
```

---

## 🎓 Best Practices

### Do's ✅

**For Managers:**
- Lead by example (use templates yourself)
- Celebrate wins publicly ("Template caught this!")
- Make metrics visible (dashboard in team space)
- Iterate based on feedback

**For Engineers:**
- Start with Template 1 (security is universal)
- Share learnings in team chat
- Improve templates (submit PRs)
- Help new team members

**For Teams:**
- Run retrospectives on template usage
- Create domain-specific examples
- Document "gotchas" as you find them
- Contribute improvements upstream

### Don'ts ❌

**Don't:**
- Mandate 100% usage immediately (gradual adoption works better)
- Use templates for trivial code (wastes time)
- Ignore feedback ("template is too long" = valid concern)
- Make it punitive ("didn't use template = bad")

**Instead:**
- Start with 50% adoption goal
- Guide on when templates add value
- Adjust templates based on feedback
- Make it educational, not enforcement

---

## 🔄 Continuous Improvement

### Monthly Review

Schedule 30-minute monthly check-in:

**Agenda:**
1. Review metrics (5 min)
2. Share wins (10 min)
3. Discuss challenges (10 min)
4. Prioritize improvements (5 min)

**Questions to ask:**
- What's working well?
- Where do people get stuck?
- What templates are missing?
- What examples would help?

### Template Evolution

**When to update a template:**
- Team discovers new vulnerability pattern
- Compliance requirements change
- New technology adopted
- Recurring issues in code review

**How to update:**
1. Propose change in issue/discussion
2. Test with 2-3 developers
3. Update template
4. Announce change in team chat
5. Update training materials

### Community Contribution

**Share your improvements:**
1. Open PR on upstream repo
2. Include before/after metrics
3. Explain context (industry, team size)
4. Help others learn from your experience

---

## ❓ Common Questions

### "How do we handle resistance?"

**Typical concerns:**
- "This slows me down"
- "I already know security"
- "AI isn't trustworthy"

**Responses:**
- Show data: 2 min template saves 20 min review time
- Acknowledge expertise: Templates catch edge cases experts miss
- Reframe: Templates make AI more trustworthy, not less

### "What about different AI assistants?"

Templates work with:
- Claude (claude.ai, Claude Code)
- GitHub Copilot Chat
- Cursor AI
- ChatGPT

Reflection quality may vary, but all benefit from structured prompts.

### "Should we require templates in CI?"

**Recommendation:** No, not initially.

**Better approach:**
- Suggest templates in CI comments
- Track usage without blocking
- Make voluntary for first 3 months
- Enforce only if adoption stalls

### "How do we customize for our domain?"

See [domains/](../domains/) for examples:
- Start with closest existing domain template
- Add your specific compliance requirements
- Include examples from your codebase
- Have team review before rollout

---

## 📞 Get Help

**Questions about deployment?**
- Open an issue: [GitHub Issues](https://github.com/miskaone/ai-coding-prompt-templates/issues)
- Discuss with community: [GitHub Discussions](https://github.com/miskaone/ai-coding-prompt-templates/discussions)
- Connect: [LinkedIn](https://linkedin.com/in/michael-a-lydick)

**Enterprise support:**
- Custom deployment planning
- Workshop facilitation
- CI/CD integration
- Team training

**Contact:** [FlowEvolve](https://flowevolve.com)

---

**Ready to deploy? Start with the [Quick Start Guide](quick-start.md) →**
