# Contributing to AI Coding Prompt Templates

Thank you for your interest in contributing! This project thrives on community input.

## 🎯 Ways to Contribute

### 1. Report Bugs or Issues
Found a problem with a template? [Open an issue](https://github.com/yourusername/ai-coding-prompt-templates/issues/new?template=bug_report.md)

### 2. Suggest Improvements
Have an idea to make templates better? [Open a feature request](https://github.com/yourusername/ai-coding-prompt-templates/issues/new?template=feature_request.md)

### 3. Add Language Examples
Know a language we don't cover? Add examples to `examples/[language]/`

### 4. Create Domain-Specific Templates
Work in healthcare, legal, gaming? Add domain templates to `domains/`

### 5. Share Success Stories
Template caught a bug? Share in [Discussions](https://github.com/yourusername/ai-coding-prompt-templates/discussions)

---

## 📝 Contribution Guidelines

### Adding Language Examples

**Directory structure:**
```
examples/
└── your-language/
    ├── README.md (language-specific notes)
    ├── security-example.ext
    ├── performance-example.ext
    └── integration-example.ext
```

**Example format:**
```
# Security Template Example (Python)

## Scenario
Implementing password reset endpoint

## Template Usage
[Show how you filled in the template]

## AI Output
[Show the generated code]

## What Reflection Caught
- Missing rate limiting
- Token not cryptographically random
- Email enumeration vulnerability
```

### Adding Domain Templates

**Location:** `domains/your-domain.md`

**Required sections:**
1. Domain Overview
2. Key Compliance Requirements (HIPAA, PCI-DSS, etc.)
3. Security Principles specific to domain
4. Common Pitfalls
5. Example Template Customization

**Example:** See [domains/fintech.md](domains/fintech.md)

### Improving Existing Templates

**Before submitting:**
1. Test the template with at least 2 AI assistants (Claude, Copilot, Cursor, ChatGPT)
2. Document what improved (with before/after if possible)
3. Explain why the change helps

---

## 🔧 Pull Request Process

### 1. Fork the Repository

Click "Fork" in the top right of this repo.

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming:**
- `feature/add-ruby-examples` - New features
- `fix/typo-in-security-template` - Bug fixes
- `docs/improve-quick-start` - Documentation

### 3. Make Your Changes

**Code style:**
- Use clear, descriptive language
- Keep examples practical and realistic
- Include comments explaining non-obvious choices

**Markdown style:**
- Use ATX-style headers (`#` not underlines)
- Code blocks must specify language
- Keep line length reasonable (120 chars max)

### 4. Test Your Changes

**For template changes:**
- Test with at least one AI assistant
- Verify the reflection output is meaningful
- Ensure code generated is actually better

**For documentation:**
- Check all links work
- Verify code blocks render correctly
- Run a spell checker

### 5. Commit Your Changes

**Commit message format:**
```
type(scope): brief description

Longer explanation if needed.

Fixes #issue-number
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(examples): add Ruby security examples

Added three examples showing security template usage in Ruby on Rails.
Includes authentication, input validation, and SQL injection prevention.

Closes #42
```

```
docs(quick-start): fix broken link to security template

The link was pointing to old file structure. Updated to new location.
```

### 6. Push and Submit PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub with:
- Clear title describing the change
- Description of what changed and why
- Reference any related issues

---

## 🎨 Style Guide

### Markdown

```markdown
# Top-level header (only one per file)

Brief intro paragraph.

## Section header

Content here.

### Subsection

More specific content.

**Bold for emphasis**, *italic for terms*.

- Bullet points for lists
- Not too nested (max 2 levels)

Code blocks always have language:
​```python
def example():
    pass
​```
```

### Code Examples

**Good:**
```python
# Clear, realistic scenario
def authenticate_user(email: str, password: str) -> Result[User, AuthError]:
    """Authenticate user with email and password.
    
    Returns:
        Ok(User) if authentication succeeds
        Err(AuthError) if authentication fails
    """
    # Input validation
    if not is_valid_email(email):
        return Err(AuthError.INVALID_EMAIL)
    
    # Rest of implementation...
```

**Avoid:**
```python
# Too abstract, not helpful
def do_thing(x, y):
    return process(x) + y
```

### Template Writing

**Clarity:**
- Use bracketed placeholders: `[YOUR SPECIFIC CONTEXT]`
- Provide examples of what to fill in
- Explain why each reflection question matters

**Completeness:**
- Cover the happy path and error cases
- Include verification checklists
- Show before/after if demonstrating improvement

---

## 🧪 Testing Guidelines

### For Template Changes

1. **Test with real scenarios** - Use actual tasks you'd assign AI
2. **Try multiple AI assistants** - Claude, Copilot, Cursor, ChatGPT
3. **Compare outputs** - Does reflection actually improve code?
4. **Document results** - Show what reflection caught

### For Documentation

1. **Follow your own instructions** - Can you complete the task?
2. **Get feedback** - Ask a colleague to try it
3. **Check links** - All internal and external links work
4. **Verify code blocks** - Syntax highlighting works, code runs

---

## 📋 Review Process

### What We Look For

**✅ Good PRs:**
- Clear purpose and benefit
- Well-tested changes
- Clean commit history
- Updated relevant documentation
- Follows existing style

**❌ PRs needing work:**
- No description of changes
- Breaks existing functionality
- Inconsistent with project style
- Missing documentation updates

### Timeline

- **Initial review:** Within 3-5 days
- **Follow-up:** Within 2 days of updates
- **Merge:** When approved and CI passes

---

## 🤝 Community Guidelines

### Be Respectful

- Welcome newcomers warmly
- Assume good intentions
- Give constructive feedback
- Celebrate contributions

### Be Helpful

- Answer questions when you can
- Share knowledge freely
- Point people to relevant resources
- Help debug issues together

### Be Professional

- Keep discussions on-topic
- No harassment or discrimination
- Respect disagreements
- Focus on ideas, not people

---

## ❓ Questions?

- **General questions:** [Discussions](https://github.com/yourusername/ai-coding-prompt-templates/discussions)
- **Bug reports:** [Issues](https://github.com/yourusername/ai-coding-prompt-templates/issues)
- **Direct contact:** [LinkedIn](https://linkedin.com/in/mike-mackintosh)

---

## 🏆 Recognition

Contributors are recognized in:
- GitHub contributors graph
- Release notes for significant contributions
- README "Contributors" section (coming soon)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making AI-assisted coding more secure! 🔒**
