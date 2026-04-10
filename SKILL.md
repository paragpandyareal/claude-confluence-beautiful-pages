---
name: confluence-beautiful-pages
description: Create visually stunning, professionally styled Confluence pages using ADF (Atlassian Document Format). Use this skill whenever the user asks to create, update, or improve a Confluence page, write content for Confluence, build a Confluence template, or mentions Confluence pages in any way. Also trigger when the user wants tables with coloured headers, status lozenges, styled panels, or any rich formatting in Confluence. Even if the user just says "make a Confluence page" or "update my wiki", use this skill. Markdown cannot produce coloured headers or status lozenges in Confluence so this skill is essential for any page that needs to look good.
---

# Creating Beautiful Confluence Pages

This skill teaches Claude how to create visually appealing, professional Confluence pages using the Atlassian Rovo MCP tools. The key insight is that **markdown format cannot produce coloured table headers, status lozenges, or panels**. You MUST use **ADF (Atlassian Document Format)** for any page that needs to look good.

## Before You Start

Before creating any Confluence page, you need the following from the user. Ask for these if they haven't been provided:

1. **Cloud ID** - Their Confluence Cloud ID (found in the Atlassian admin or API). This is a UUID like `c9ffb61e-2b5c-427b-b182-d973512b4700`.
2. **Space ID** - The numeric ID of the Confluence space to create pages in.
3. **Parent Page ID** (optional) - If the page should be a child of an existing page.
4. **Brand Colour** (optional) - A hex colour for table headers. Defaults to `#5a7554` (olive/forest green) if not provided. The text on this background should always be white (`#ffffff`) and bold.

If the user has provided these details previously in the conversation or in their CLAUDE.md / project instructions, use those values without asking again.

## Golden Rules

1. **Always use `contentFormat: "adf"`** for beautiful pages. Markdown is only for quick drafts.
2. **Always set table header backgrounds** using the user's brand colour (or default `#5a7554`) on every `tableHeader` node.
3. **Always make header text white and bold** using marks: `[{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]`.
4. **Use panels liberally** to break up content and highlight important information.
5. **Use status lozenges** instead of plain text for statuses, responses, and categories.
6. **Use dividers (`{"type": "rule"}`)** between major sections to give the page breathing room.
7. **Never let a page be just walls of tables**. Break them up with headings, panels, and dividers.
8. **NEVER truncate content to fit one page.** If ADF exceeds ~25KB, split into parent + child pages. See "Handling Large Content" section below. Dropping content is worse than having multiple pages.

## Quick Reference - ADF Document Structure

Every ADF document follows this structure:

```json
{
  "version": 1,
  "type": "doc",
  "content": [
    // array of block-level nodes (panels, headings, tables, paragraphs, rules, etc.)
  ]
}
```

Pass this as the `body` parameter with `contentFormat: "adf"`.

## Essential Building Blocks

For the full ADF reference with all building blocks, JSON snippets, and examples, read `references/adf-building-blocks.md`.

The most critical building block is the **table header cell with brand colour**:

```json
{
  "type": "tableHeader",
  "attrs": {
    "background": "#5a7554"
  },
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Column Title",
          "marks": [
            { "type": "strong" },
            { "type": "textColor", "attrs": { "color": "#ffffff" } }
          ]
        }
      ]
    }
  ]
}
```

Replace `#5a7554` with the user's brand colour if they've provided one.

## All Available Building Blocks

For full JSON snippets and examples of every building block, read `references/adf-building-blocks.md`. Here is the complete list:

**Page structure:**
- `heading` - Section titles (levels 2-6, level 1 is the page title)
- `paragraph` - Regular text
- `rule` - Horizontal divider between sections
- `expand` - Collapsible section with a title (great for long pages)
- `layoutSection` + `layoutColumn` - Multi-column layouts (2 or 3 columns)

**Content blocks:**
- `table` - Tables with branded header rows
- `panel` - Coloured callout boxes (info, note, warning, error, tip, success)
- `bulletList` + `orderedList` - Lists with nesting support
- `codeBlock` - Syntax-highlighted code
- `blockquote` - Quoted text
- `mediaSingle` - Images

**Interactive elements:**
- `taskList` + `taskItem` - Checkable action items
- `decisionList` + `decisionItem` - Recorded decisions

**Inline elements** (go inside paragraphs):
- `text` - Plain or formatted text (bold, italic, underline, strikethrough, coloured, code, links)
- `status` - Coloured status lozenges
- `emoji` - Emoji icons
- `date` - Styled date pills
- `mention` - @-mentions of users
- `inlineCard` - Smart link previews (Jira issues, Confluence pages, URLs)
- `hardBreak` - Line break within a paragraph

## Panel Types

Use panels to highlight important information. Available types:

| panelType | Colour | Use for |
|-----------|--------|---------|
| `info` | Blue | Summary, overview, general information |
| `note` | Purple | Scope notes, context |
| `warning` | Yellow/Amber | Deadlines, things to watch out for |
| `error` | Red | Critical information, must-do items |
| `tip` | Green | Helpful hints, positive callouts |
| `success` | Green (lighter) | Confirmed items, achievements |

## When to Use What

Quick decision guide for choosing the right building block:

| You want to... | Use this |
|---|---|
| Break up a long page | `expand` (collapse sections) + `rule` (dividers) |
| Create a multi-column layout | `layoutSection` with `layoutColumn` |
| Show action items with checkboxes | `taskList` with `taskItem` |
| Record decisions | `decisionList` with `decisionItem` |
| Show a status or category | `status` lozenge (coloured pill) |
| Highlight important information | `panel` (info, warning, error, tip, success, note) |
| Show code or commands | `codeBlock` with language attribute |
| Link to a Jira issue or page | `inlineCard` with the URL |
| Create a list | `bulletList` or `orderedList` |
| Add a link to text | `link` mark on a text node |
| Show a formatted date | `date` lozenge (timestamp in milliseconds) |
| Mention a team member | `mention` with their account ID |
| Embed an image | `mediaSingle` with `media` child |

## Status Lozenges

Status lozenges are coloured pills. Use them instead of plain text for any status or category.

Available colours: `green`, `yellow`, `red`, `blue`, `purple`

Every status lozenge needs a unique `localId` and the `style` attribute must be an empty string `""`.

## Handling Large Content (CRITICAL)

**NEVER drop, truncate, or reduce content to fit the 30KB ADF limit.** If the content exceeds ~25KB of ADF, you MUST split it across multiple pages. Cutting content to fit one page defeats the purpose of the page.

**How to split large content into parent + child pages:**

1. **Create a parent hub page first.** This page contains:
   - An info panel with a summary of the full content
   - A summary table or overview section
   - Navigation pointers to the child pages (Confluence automatically shows child pages below the parent, so explicit links are optional)

2. **Create child pages for the detail.** Each child page:
   - Must be created with `parentId` set to the hub page's ID (returned from creating the hub page)
   - Should stay under 25KB of ADF (leave buffer below the 30KB limit)
   - Gets its own info panel at the top explaining what this section covers
   - Titles should make it clear which section this is (e.g., "Chapter 2 Part 1 - Requirements REQ-001 to REQ-010")

3. **Estimate ADF size before building.** Each requirement or data row with status lozenges, verbatim text, and a 6-row branded table is roughly 2.5-3KB of ADF. So a 25KB page fits roughly 8-10 detailed requirement tables. Plan your splits accordingly.

4. **ALL content must appear on one of the pages.** After creating all pages, verify that every item from the source data appears on exactly one child page. If the source has 64 items and your pages only show 8, you have a bug.

**Example split for 64 requirements across 4 chapters:**
- Hub page: summary, counts, coverage map
- Child page 1: Chapter 2 Part 1 (REQ-001 to REQ-008)
- Child page 2: Chapter 2 Part 2 (REQ-009 to REQ-016)
- ... and so on until all 64 requirements have a page

## Page Templates

For ready-to-use page templates (requirements validation, hub pages, reference pages, input/questions pages, meeting notes, runbooks, release notes, architecture docs, retrospectives), read `references/page-templates.md`.

## JavaScript Helpers

For large ADF documents, use the helper functions in `scripts/adf-helpers.js` to construct the JSON programmatically. These provide reusable functions for creating table headers, cells, rows, panels, headings, status lozenges, and more.

## API Calls

### Create a page
```
Tool: Atlassian Rovo:createConfluencePage
Parameters:
  cloudId: "[user's Cloud ID]"
  spaceId: "[user's Space ID]"
  parentId: "[parent page ID]"
  title: "Page Title"
  contentFormat: "adf"
  body: [ADF JSON string]
```

### Update a page
```
Tool: Atlassian Rovo:updateConfluencePage
Parameters:
  cloudId: "[user's Cloud ID]"
  pageId: "[page ID to update]"
  title: "Page Title"
  contentFormat: "adf"
  body: [ADF JSON string]
  versionMessage: "Description of changes"
```

### Get a page
```
Tool: Atlassian Rovo:getConfluencePage
Parameters:
  cloudId: "[user's Cloud ID]"
  pageId: "[page ID]"
  contentFormat: "adf" or "markdown"
```

## Gotchas and Hard-Won Lessons

These were all discovered through trial and error. Read `references/gotchas.md` before building any page. The most critical ones:

1. **Markdown CANNOT produce coloured table headers.** You MUST use `contentFormat: "adf"`.
2. **`paragraph` cannot be nested inside `paragraph`** in ADF. This causes content to silently disappear.
3. **Don't include `colspan`/`rowspan`** in tableHeader attrs unless you actually need them.
4. **Every status lozenge needs a unique `localId`** or it won't render.
5. **ADF payload limit is roughly 30KB practical.** Split into child pages if larger.
6. **When updating pages, ALL content must be re-sent.** The API replaces the entire body.
7. **Tables with 4+ columns need `layout: "wide"`** or they'll be cramped.
8. **Empty table cells need at least an empty paragraph node.**

For the full list of 31 gotchas covering ADF structure, payload size, tables, content, PDF handling, API quirks, and node type restrictions, read `references/gotchas.md`.

## Checklist Before Publishing

Before pushing any page to Confluence, verify:

- All table header rows have the brand colour background and white bold text
- Status lozenges have unique `localId` values and include `style: ""`
- Panels are used for callouts (not plain text)
- Dividers separate major sections
- Tables with 4+ columns use `layout: "wide"`
- No `paragraph` nested inside `paragraph`
- No unnecessary `colspan`/`rowspan` in table cell attrs
- ADF JSON is valid (no trailing commas, proper nesting)
- Page title is set via the `title` parameter, not as H1 in body
- Content is split into child pages if ADF exceeds ~25KB (NEVER truncate content to fit)
- Empty table cells have at least an empty paragraph node
- `isNumberColumnEnabled: false` is set on every table
- Expand sections have clear, descriptive titles
- Task lists and decision lists have unique `localId` values
- Code blocks use appropriate language attribute for syntax highlighting
- Column layout widths add up to 100

## After Publishing

After pushing any page, especially large ones:

- Fetch the page back with `getConfluencePage` and verify all content rendered
- Check that no sections were silently dropped (common with large ADF payloads)
- Verify status lozenges are rendering as coloured pills, not plain text
- Verify table headers have the brand colour background (not default grey)
- If content was lost, split the page into smaller child pages and re-push
