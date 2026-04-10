# Claude Confluence Beautiful Pages

A Claude AI skill that creates visually stunning, professionally styled Confluence pages using ADF (Atlassian Document Format).

## The Problem

When Claude creates Confluence pages using markdown, you get plain grey table headers, no status lozenges, and no coloured panels. The pages look bland and unprofessional.

## The Solution

This skill teaches Claude to use ADF instead of markdown, which unlocks coloured table headers, status lozenges (coloured pills for statuses), info/warning/tip panels, and proper visual hierarchy. The difference is night and day.

### Before (Markdown)
- Grey table headers
- Plain text statuses
- No visual hierarchy
- Walls of text

### After (This Skill)
- Branded coloured table headers with white bold text
- Status lozenges (green/red/yellow/blue/purple pills)
- Info, warning, tip, and error panels
- Dividers between sections
- Professional, polished pages

## What's Included

```
claude-confluence-beautiful-pages/
├── SKILL.md                          # Main skill instructions
├── references/
│   ├── adf-building-blocks.md        # All ADF JSON snippets
│   ├── page-templates.md             # 4 ready-to-use page templates
│   └── gotchas.md                    # 22 hard-won lessons and pitfalls
├── scripts/
│   └── adf-helpers.js                # JavaScript helpers for building ADF
├── LICENSE                           # Apache License 2.0
├── README.md                         # This file
└── CONTRIBUTING.md                   # How to contribute
```

## Installation

### Claude Code

**Option 1 - Clone into your skills directory:**

```bash
git clone https://github.com/paragpandyareal/claude-confluence-beautiful-pages.git
cp -r claude-confluence-beautiful-pages ~/.claude/skills/confluence-beautiful-pages
```

**Option 2 - Use --add-dir:**

```bash
git clone https://github.com/paragpandyareal/claude-confluence-beautiful-pages.git
claude --add-dir /path/to/claude-confluence-beautiful-pages
```

Claude Code will automatically detect the skill and trigger it when you ask to create or update Confluence pages.

### Claude.ai (Web/Desktop)

1. Download this repository as a ZIP file (click the green "Code" button on GitHub, then "Download ZIP")
2. In Claude.ai, go to **Settings > Capabilities** and make sure "Code execution and file creation" is enabled
3. Go to **Customize > Skills**
4. Click the **"+"** button, then **"+ Create skill"**
5. Upload the ZIP file
6. Toggle the skill on

The skill will now activate automatically whenever you ask Claude to create or work with Confluence pages.

## Setup

Before using the skill, you'll need to provide Claude with your Confluence details. You can do this in a few ways:

**Option A - Tell Claude in the chat:**
> "My Confluence Cloud ID is `abc-123-def`, my space ID is `12345`, and I want table headers in `#2d5ca6` (blue)."

**Option B - Add to your CLAUDE.md (Claude Code):**
```markdown
## Confluence Details
- Cloud ID: abc-123-def
- Space ID: 12345
- Brand colour: #2d5ca6
```

**Option C - Add to your project instructions (Claude.ai):**
Add the same details to your project's custom instructions.

If you don't specify a brand colour, the skill defaults to `#5a7554` (olive/forest green).

## Usage Examples

Once installed, just ask Claude naturally:

- "Create a Confluence page with a project status table"
- "Make a requirements validation page for the new policy"
- "Build a hub page for our team space with navigation"
- "Update the existing page to add status lozenges"

Claude will automatically use ADF formatting with your brand colours, panels, status lozenges, and proper visual hierarchy.

## Requirements

- **Atlassian Rovo MCP connection** - Claude needs to be connected to your Confluence instance via the Atlassian Rovo MCP tools
- **Confluence Cloud** - This skill is designed for Confluence Cloud (not Server/Data Center)
- **Claude Pro, Max, Team, or Enterprise plan** - Skills require a paid Claude plan

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute this skill. Attribution is required. See the license for full terms.

## Credits

Created by [Parag Pandya](https://github.com/paragpandyareal).

Built from real-world experience creating professional Confluence pages for regulatory compliance, product management, and enterprise documentation.
