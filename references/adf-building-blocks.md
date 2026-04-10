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
12. [Complete ADF Document Structure](#12-complete-adf-document-structure)

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

## 12. Complete ADF Document Structure

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

### Block-level vs Inline nodes

Understanding this distinction prevents silent failures:

**Block-level nodes** (go directly in the document `content` array or inside other block containers):
- `panel`, `table`, `heading`, `rule`, `paragraph`, `blockquote`, `bulletList`, `orderedList`

**Inline nodes** (must go inside `paragraph`):
- `text`, `status` (lozenges), `hardBreak`, `emoji`, `inlineCard`

Mixing these up causes silent failures where content just disappears.
