# Code Review System

Automated accessibility and visual design reviews for Better Design.

## Overview

The review system analyzes code for:

### Accessibility (WCAG 2.1)
- **Critical:** Images without alt text, icon buttons without labels, forms without labels
- **Serious:** Missing focus states, keyboard handlers, touch targets under 44px
- **Moderate:** Skipped headings, positive tabIndex, incomplete ARIA

### Visual Design
- **Layout & Spacing:** Inconsistent spacing, overflow issues, z-index conflicts
- **Typography:** Mixed fonts, line-height issues, missing fallbacks
- **Color & Contrast:** Insufficient contrast (<4.5:1), missing hover/focus states
- **Components:** Missing button states, incomplete form states

## Setup

### 1. Ensure DATABASE_URL is set

```bash
# In packages/mcp/.env
DATABASE_URL=your_neon_db_url
```

### 2. Run migrations and seed review rules

```bash
# From project root
cd packages/mcp

# Setup database tables
bun run setup-db

# Seed review rules (loads review-rules.md into database)
bun run seed-principles
```

This will:
- Parse `docs/review-rules.md`
- Generate embeddings for each review rule section
- Store in `foundational_docs` table with prefix `review-`

### 3. Build the MCP server

```bash
bun run build
```

## Usage

### Via MCP Tool

The `get-review-rules` tool is available in your MCP server:

```typescript
// Example MCP tool usage
{
  "tool": "get-review-rules",
  "params": {
    "category": "all" // or "accessibility" or "visual-design"
  }
}
```

This returns comprehensive review rules that Claude Code can use to analyze your code.

**Parameters:**
- `category` (optional): "all" | "accessibility" | "visual-design" (defaults to "all")

**Returns:**

```markdown
# Code Review Results

**Score:** 45/100

Found 3 critical and 1 serious accessibility issues that need immediate attention.

---

## 🔴 CRITICAL (3 issues)

### [accessibility] Icon-only buttons missing aria-labels

**Line 1**

```tsx
<button><CloseIcon /></button>
```

**Problem:** Button has no accessible name for screen readers

**Fix:** Add aria-label="Close"

**WCAG:** 4.1.2 Name, Role, Value (Level A)

---

### [accessibility] Images without alt text

**Line 2**

```tsx
<img src="/hero.jpg" />
```

**Problem:** Screen readers cannot describe this image

**Fix:** Add alt="Description of hero image"

**WCAG:** 1.1.1 Non-text Content (Level A)

---

## 🟡 SERIOUS (1 issue)

### [visual-design] Contrast ratio below 4.5:1

**Line 3**

```tsx
<div className="text-gray-400">Important text</div>
```

**Problem:** Gray-400 on white background has insufficient contrast for readability

**Fix:** Use text-gray-700 or darker for important text

---
```

## Architecture

### Data Flow

```
1. User asks Claude Code to review code
   ↓
2. Claude Code calls get-review-rules MCP tool
   ↓
3. MCP server fetches rules from DB (semantic search)
   ↓
4. Rules returned to Claude Code as context
   ↓
5. Claude Code analyzes code against rules
   ↓
6. User receives review with severity, line numbers, fixes
```

**Key difference:** The MCP server just provides rules. Claude Code (already running) does the actual analysis. No extra API calls needed.

### Database Schema

```sql
-- foundational_docs table stores review rules
CREATE TABLE foundational_docs (
  id TEXT PRIMARY KEY,              -- e.g., "review-icon-only-buttons"
  title TEXT NOT NULL,              -- e.g., "Icon-only buttons missing aria-labels"
  content TEXT NOT NULL,            -- Full rule documentation
  embedding VECTOR(768),            -- For semantic search
  updated_at TIMESTAMP
);
```

### Review Rules Storage

Rules are loaded from `docs/review-rules.md`:

```
review-accessibility-wcag-2-1                      ← Accessibility overview
review-images-without-alt-text                     ← Specific rule
review-icon-only-buttons-missing-aria-labels       ← Specific rule
review-visual-design                               ← Visual design overview
review-inconsistent-spacing-values                 ← Specific rule
...
```

## Scoring System

Score starts at 100, deductions:
- **Critical issue:** -20 points
- **Serious issue:** -10 points
- **Moderate issue:** -5 points

Minimum score: 0

**Interpretation:**
- 90-100: Excellent
- 75-89: Good
- 60-74: Needs improvement
- 0-59: Poor

## Example Use Cases

### 1. Component Review

```tsx
// Review a new Button component
review-code({
  code: `
    export function Button({ children, ...props }) {
      return (
        <button className="bg-blue-500 text-white px-4 py-2" {...props}>
          {children}
        </button>
      );
    }
  `,
  context: "Reusable button component for design system"
})
```

**Likely findings:**
- Missing hover state
- Missing focus-visible state
- Missing disabled state
- No touch target consideration

### 2. Form Review

```tsx
// Review a login form
review-code({
  code: `
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  `,
  context: "User login form"
})
```

**Likely findings:**
- Inputs missing labels (critical)
- No error states
- Button missing disabled state for loading

### 3. Modal Review

```tsx
// Review a modal component
review-code({
  code: `
    <div className="fixed inset-0 bg-black/50">
      <div className="bg-white p-6">
        <h2>Confirm Action</h2>
        <p>Are you sure?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  `,
  context: "Confirmation modal"
})
```

**Likely findings:**
- Missing role="dialog"
- Missing aria-modal="true"
- No aria-labelledby/aria-describedby
- No focus trap
- No escape key handler

## Integration Options

### Option 1: MCP Server (Current)

Use via Claude desktop or other MCP clients:

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "better-design": {
      "command": "node",
      "args": ["/path/to/packages/mcp/dist/index.js"]
    }
  }
}
```

### Option 2: Web App UI

Add to `packages/web`:

```tsx
// app/review/page.tsx
export default function ReviewPage() {
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);

  const handleReview = async () => {
    const res = await fetch('/api/review', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
    setResults(await res.json());
  };

  return (
    <div>
      <textarea value={code} onChange={e => setCode(e.target.value)} />
      <button onClick={handleReview}>Review Code</button>
      {results && <ReviewResults data={results} />}
    </div>
  );
}
```

### Option 3: CLI Tool

```bash
# Add to packages/mcp/package.json scripts
"review": "bun run src/cli/review.ts"

# Usage
bun run review src/components/Button.tsx
```

## Performance

- **Database query:** ~50-100ms (vector search for rules)
- **Analysis:** Instant (Claude Code analyzes in same session)
- **Total:** <1 second per review

**Optimization tips:**
- Rules are cached after first retrieval
- No external API calls = fast and free
- Can review multiple files in one conversation

## Limitations

### Current Limitations

1. **No AST parsing** - Uses LLM pattern matching instead of proper parsing
2. **Line numbers** - Approximate, based on LLM interpretation
3. **False positives** - May flag library components with built-in a11y
4. **Manual invocation** - User must ask for review (not automatic)

### Future Improvements

1. **AST parsing** - Use TypeScript compiler API for accurate line numbers
2. **Rule caching** - Cache rules in memory to avoid DB queries
3. **Batch processing** - Review multiple files at once
4. **Custom rules** - Allow users to add project-specific rules
5. **Auto-fix** - Generate patches to automatically fix issues
6. **CI integration** - Run in GitHub Actions on PRs
7. **VS Code extension** - Real-time reviews as you type

## Maintenance

### Adding New Rules

1. Edit `docs/review-rules.md`
2. Add new section under appropriate category
3. Run `bun run seed-principles` to update database
4. Rules automatically available in next review

### Updating Existing Rules

Same process - seeding script uses `upsert` so it updates existing rules.

### Testing Changes

```bash
# Test the review tool
cd packages/mcp
bun run src/index.ts

# Then use MCP client to call review-code
```

## Support

For issues or questions:
- Check `docs/review-rules.md` for rule details
- Review database with `bun run db:studio`
- Check MCP logs for errors
- Verify ANTHROPIC_API_KEY is valid

## Next Steps

1. ✅ Review rules defined
2. ✅ Database seeding implemented
3. ✅ MCP tool created
4. 🔲 Test with real code
5. 🔲 Add to web app UI
6. 🔲 Create CLI tool
7. 🔲 Add CI integration
8. 🔲 Build VS Code extension
