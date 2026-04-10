# ADF Building Blocks Reference

This file contains all the JSON snippets you need to build beautiful Confluence pages using ADF (Atlassian Document Format).

## Table of Contents

1. [Table Header Cell (with brand colour)](#1-table-header-cell)
2. [Regular Table Cell](#2-regular-table-cell)
3. [Table Row](#3-table-row)
4. [Complete Table](#4-complete-table)
5. [Panels](#5-panels)
6. [Status Lozenges](#6-status-lozenges)
7. [Headings](#7-headings)
8. [Horizontal Rule (Divider)](#8-horizontal-rule)
9. [Text Formatting](#9-text-formatting)
10. [Paragraph](#10-paragraph)
11. [Blockquote](#11-blockquote)
12. [Expand / Collapse](#12-expand--collapse)
13. [Bullet List](#13-bullet-list)
14. [Ordered List](#14-ordered-list)
15. [Hyperlinks](#15-hyperlinks)
16. [Code Block](#16-code-block)
17. [Column Layouts](#17-column-layouts)
18. [Task List](#18-task-list)
19. [Decision List](#19-decision-list)
20. [Table Cell Background Colours](#20-table-cell-background-colours)
21. [Hard Break](#21-hard-break)
22. [Additional Text Marks](#22-additional-text-marks)
23. [Emoji](#23-emoji)
24. [Inline Cards (Smart Links)](#24-inline-cards-smart-links)
25. [Date Lozenge](#25-date-lozenge)
26. [Mentions](#26-mentions)
27. [Media / Images](#27-media--images)
28. [Complete ADF Document Structure](#28-complete-adf-document-structure)

---

## 1. Table Header Cell

This is the most important building block. Every table header cell must look like this:

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

Replace `#5a7554` with the user's brand colour. Do NOT include `colspan` or `rowspan` in attrs unless you specifically need them.

---

## 2. Regular Table Cell

```json
{
  "type": "tableCell",
  "attrs": {},
  "content": [
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Cell content" }
      ]
    }
  ]
}
```

---

## 3. Table Row

```json
{
  "type": "tableRow",
  "content": [
    // ... tableHeader or tableCell nodes
  ]
}
```

---

## 4. Complete Table

```json
{
  "type": "table",
  "attrs": {
    "isNumberColumnEnabled": false,
    "layout": "wide"
  },
  "content": [
    // ... tableRow nodes (first row should have tableHeader cells)
  ]
}
```

Layout options: `"default"`, `"wide"`, `"full-width"`. Use `"wide"` for tables with 4+ columns.

Always set `isNumberColumnEnabled: false` explicitly or Confluence may add an automatic row number column.

---

## 5. Panels

Panels are coloured callout boxes for highlighting important information.

```json
{
  "type": "panel",
  "attrs": {
    "panelType": "info"
  },
  "content": [
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Title: ", "marks": [{"type": "strong"}] },
        { "type": "text", "text": "Description text here" }
      ]
    }
  ]
}
```

Panel types and when to use them:

- `info` (Blue) - Summary, overview, general information, "how to use" instructions
- `note` (Purple) - Scope notes, "what this does not cover", context
- `warning` (Yellow/Amber) - Distribution notices, deadlines, things to watch out for
- `error` (Red) - Critical information, important constraints, "must do" items
- `tip` (Green) - Helpful hints, questions sections, positive callouts
- `success` (Green lighter) - Key new features, confirmed items, achievements

---

## 6. Status Lozenges

Status lozenges are coloured pills that stand out visually. Use them instead of plain text for any status, category, or response option.

```json
{
  "type": "status",
  "attrs": {
    "text": "CONFIRMED",
    "color": "green",
    "localId": "unique-id-here",
    "style": ""
  }
}
```

Available colours: `green`, `yellow`, `red`, `blue`, `purple`

Common uses:
- Response options: `CONFIRMED` (green), `NOT CORRECT` (red), `MISSING` (yellow)
- Types: `NEW` (green), `AMENDED` (blue), `DELETED` (red)
- Dates/deadlines: `1 JULY 2026` (green for confirmed), `TBD` (yellow for pending)
- Statuses: `IN PROGRESS` (blue), `COMPLETE` (green), `BLOCKED` (red)

Every status lozenge needs a unique `localId`. Use a short random string or a meaningful prefix like `"a01g"` (item A-01, green status). Never reuse the same localId on the same page.

The `style` attribute must be an empty string `""`, not omitted.

---

## 7. Headings

```json
{
  "type": "heading",
  "attrs": { "level": 2 },
  "content": [
    { "type": "text", "text": "Section Title" }
  ]
}
```

Use level 2 for main sections, level 3 for subsections. Level 1 is the page title (set via the `title` parameter, not in the body).

---

## 8. Horizontal Rule (Divider)

```json
{ "type": "rule" }
```

Use between major sections to give visual breathing room.

---

## 9. Text Formatting

**Bold:**
```json
{ "type": "text", "text": "Bold text", "marks": [{"type": "strong"}] }
```

**Italic:**
```json
{ "type": "text", "text": "Italic text", "marks": [{"type": "em"}] }
```

**Coloured text (e.g. grey for secondary info):**
```json
{ "type": "text", "text": "Grey text", "marks": [{"type": "textColor", "attrs": {"color": "#6b778c"}}] }
```

**Multiple marks (e.g. bold + white):**
```json
{
  "type": "text",
  "text": "Bold white text",
  "marks": [
    {"type": "strong"},
    {"type": "textColor", "attrs": {"color": "#ffffff"}}
  ]
}
```

---

## 10. Paragraph

```json
{
  "type": "paragraph",
  "content": [
    { "type": "text", "text": "Regular paragraph text" }
  ]
}
```

---

## 11. Blockquote

```json
{
  "type": "blockquote",
  "content": [
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Quoted text" }
      ]
    }
  ]
}
```

---

## 12. Expand / Collapse

Collapsible sections for long pages. The title shows when collapsed, and clicking expands to reveal the content inside.

```json
{
  "type": "expand",
  "attrs": { "title": "Click to expand details" },
  "content": [
    { "type": "paragraph", "content": [{ "type": "text", "text": "Hidden content here" }] }
  ]
}
```

Content inside an expand can include paragraphs, tables, lists, panels, code blocks, and most other block-level nodes.

---

## 13. Bullet List

```json
{
  "type": "bulletList",
  "content": [
    {
      "type": "listItem",
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "First item" }] }
      ]
    },
    {
      "type": "listItem",
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Second item" }] }
      ]
    }
  ]
}
```

**Nested list example:**

```json
{
  "type": "bulletList",
  "content": [
    {
      "type": "listItem",
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Parent item" }] },
        {
          "type": "bulletList",
          "content": [
            {
              "type": "listItem",
              "content": [
                { "type": "paragraph", "content": [{ "type": "text", "text": "Nested child item" }] }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Nesting works by putting another list inside a `listItem`, after the paragraph. You cannot directly nest `bulletList` inside `bulletList`.

---

## 14. Ordered List

```json
{
  "type": "orderedList",
  "attrs": { "order": 1 },
  "content": [
    {
      "type": "listItem",
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Step one" }] }
      ]
    },
    {
      "type": "listItem",
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Step two" }] }
      ]
    }
  ]
}
```

The `order` attribute sets the starting number. Nesting works the same way as bullet lists.

---

## 15. Hyperlinks

Links use a `link` mark on text nodes:

```json
{
  "type": "text",
  "text": "Click here",
  "marks": [{ "type": "link", "attrs": { "href": "https://example.com" } }]
}
```

Links can be combined with other marks like bold:

```json
{
  "type": "text",
  "text": "Bold link",
  "marks": [
    { "type": "strong" },
    { "type": "link", "attrs": { "href": "https://example.com" } }
  ]
}
```

Links go inside a paragraph's content array, just like regular text.

---

## 16. Code Block

```json
{
  "type": "codeBlock",
  "attrs": { "language": "python" },
  "content": [
    { "type": "text", "text": "def hello():\n    print('world')" }
  ]
}
```

Common language values: `python`, `javascript`, `java`, `bash`, `sql`, `json`, `xml`, `yaml`, `csharp`, `go`, `ruby`, `php`. Use `""` or omit the language attribute for plain text.

**Inline code** uses a mark on a text node inside a paragraph:

```json
{
  "type": "text",
  "text": "configFile",
  "marks": [{ "type": "code" }]
}
```

---

## 17. Column Layouts

**Two-column 50/50:**

```json
{
  "type": "layoutSection",
  "content": [
    {
      "type": "layoutColumn",
      "attrs": { "width": 50 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Left column" }] }
      ]
    },
    {
      "type": "layoutColumn",
      "attrs": { "width": 50 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Right column" }] }
      ]
    }
  ]
}
```

**Two-column 67/33 (sidebar layout):**

```json
{
  "type": "layoutSection",
  "content": [
    {
      "type": "layoutColumn",
      "attrs": { "width": 66.66 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Main content" }] }
      ]
    },
    {
      "type": "layoutColumn",
      "attrs": { "width": 33.33 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Sidebar" }] }
      ]
    }
  ]
}
```

**Three-column equal:**

```json
{
  "type": "layoutSection",
  "content": [
    {
      "type": "layoutColumn",
      "attrs": { "width": 33.33 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Column 1" }] }
      ]
    },
    {
      "type": "layoutColumn",
      "attrs": { "width": 33.33 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Column 2" }] }
      ]
    },
    {
      "type": "layoutColumn",
      "attrs": { "width": 33.33 },
      "content": [
        { "type": "paragraph", "content": [{ "type": "text", "text": "Column 3" }] }
      ]
    }
  ]
}
```

Column widths must add up to 100. Confluence Cloud supports 2-column and 3-column layouts.

---

## 18. Task List

```json
{
  "type": "taskList",
  "attrs": { "localId": "tasklist-1" },
  "content": [
    {
      "type": "taskItem",
      "attrs": { "localId": "task-1", "state": "TODO" },
      "content": [{ "type": "text", "text": "Review the document" }]
    },
    {
      "type": "taskItem",
      "attrs": { "localId": "task-2", "state": "DONE" },
      "content": [{ "type": "text", "text": "Send the invite" }]
    }
  ]
}
```

State values: `TODO` (unchecked) or `DONE` (checked). Every task list and task item needs a unique `localId`.

---

## 19. Decision List

```json
{
  "type": "decisionList",
  "attrs": { "localId": "declist-1" },
  "content": [
    {
      "type": "decisionItem",
      "attrs": { "localId": "dec-1", "state": "DECIDED" },
      "content": [{ "type": "text", "text": "We will use approach B for the migration" }]
    }
  ]
}
```

Like task lists, every decision list and item needs a unique `localId`.

---

## 20. Table Cell Background Colours

Regular table cells can have a background colour for alternating rows or highlighting:

```json
{
  "type": "tableCell",
  "attrs": { "background": "#f4f5f7" },
  "content": [
    { "type": "paragraph", "content": [{ "type": "text", "text": "Shaded row" }] }
  ]
}
```

Common background colours: `#f4f5f7` (light grey), `#e3fcef` (light green), `#fffae6` (light yellow), `#ffebe6` (light red).

---

## 21. Hard Break

Line break within a cell or paragraph:

```json
{ "type": "hardBreak" }
```

Use inside a paragraph's content array between text nodes:

```json
{
  "type": "paragraph",
  "content": [
    { "type": "text", "text": "Line one" },
    { "type": "hardBreak" },
    { "type": "text", "text": "Line two" }
  ]
}
```

---

## 22. Additional Text Marks

**Underline:**
```json
{ "type": "text", "text": "Underlined", "marks": [{ "type": "underline" }] }
```

**Strikethrough:**
```json
{ "type": "text", "text": "Removed", "marks": [{ "type": "strike" }] }
```

**Subscript:**
```json
{ "type": "text", "text": "2", "marks": [{ "type": "subsup", "attrs": { "type": "sub" } }] }
```

**Superscript:**
```json
{ "type": "text", "text": "2", "marks": [{ "type": "subsup", "attrs": { "type": "sup" } }] }
```

All marks can be combined. For example, bold + underline:
```json
{ "type": "text", "text": "Important", "marks": [{ "type": "strong" }, { "type": "underline" }] }
```

---

## 23. Emoji

```json
{
  "type": "emoji",
  "attrs": { "shortName": ":white_check_mark:", "id": "2705", "text": "✅" }
}
```

Common useful emoji: `:warning:` (⚠️), `:white_check_mark:` (✅), `:x:` (❌), `:information_source:` (ℹ️), `:rocket:` (🚀), `:calendar:` (📅). The `text` field is the fallback if the emoji doesn't render.

Emoji goes inside a paragraph's content array (it's an inline node).

---

## 24. Inline Cards (Smart Links)

```json
{
  "type": "inlineCard",
  "attrs": { "url": "https://your-instance.atlassian.net/browse/PROJ-123" }
}
```

Smart links render as rich previews of Jira issues, Confluence pages, and supported external URLs. The user's Confluence permissions affect whether the preview renders or falls back to a plain link.

Inline cards go inside a paragraph's content array.

---

## 25. Date Lozenge

```json
{
  "type": "date",
  "attrs": { "timestamp": "1719792000000" }
}
```

Timestamp is in milliseconds (Unix epoch multiplied by 1000), not seconds. Renders as a styled date pill. Goes inside a paragraph's content array.

---

## 26. Mentions

```json
{
  "type": "mention",
  "attrs": { "id": "user-account-id", "text": "@User Name", "accessLevel": "" }
}
```

The `id` is the Atlassian account ID of the user to mention. Goes inside a paragraph's content array.

---

## 27. Media / Images

```json
{
  "type": "mediaSingle",
  "attrs": { "layout": "center" },
  "content": [
    {
      "type": "media",
      "attrs": {
        "type": "external",
        "url": "https://example.com/image.png"
      }
    }
  ]
}
```

Layout options: `"center"`, `"wide"`, `"full-width"`, `"wrap-left"`, `"wrap-right"`.

Note: Most Confluence images are uploaded attachments, not external URLs. External media only works when the image URL is publicly accessible or on a domain Confluence trusts. For uploaded attachments, use `"type": "file"` with the attachment's `id` and `collection` instead.

---

## 28. Complete ADF Document Structure

Every ADF document follows this structure:

```json
{
  "version": 1,
  "type": "doc",
  "content": [
    // array of block-level nodes
  ]
}
```

Pass this as the `body` parameter with `contentFormat: "adf"`.

### Block-level vs Inline nodes

Understanding this distinction prevents silent failures:

**Block-level nodes** (go directly in the document `content` array or inside other block containers):
- `panel`, `table`, `heading`, `rule`, `paragraph`, `blockquote`, `bulletList`, `orderedList`, `codeBlock`, `expand`, `layoutSection`, `mediaSingle`, `taskList`, `decisionList`

**Inline nodes** (must go inside `paragraph` or `taskItem`/`decisionItem`):
- `text`, `status` (lozenges), `hardBreak`, `emoji`, `inlineCard`, `date`, `mention`

Mixing these up causes silent failures where content just disappears.
